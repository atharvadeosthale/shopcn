import { Command } from "commander";
import inquirer from "inquirer";
import open from "open";
import { createTRPCClient } from "../trpc";
import { clearConfig, setConfig } from "../config";
import { log, spinner, title } from "../utils/display";

export const loginCommand = new Command("login")
  .description("Authenticate with your shopcn server")
  .action(async () => {
    title("🔐 Shopcn CLI Authentication");

    const { serverUrl } = await inquirer.prompt<{ serverUrl: string }>([
      {
        type: "input",
        name: "serverUrl",
        message: "Enter your server URL:",
        default: "http://localhost:8080",
        validate: (input) => {
          try {
            new URL(input);
            return true;
          } catch {
            return "Please enter a valid URL";
          }
        },
      },
    ]);

    const cleanUrl = serverUrl.replace(/\/$/, "");
    setConfig({ serverUrl: cleanUrl });

    const spin = spinner("Fetching authentication URL...").start();

    try {
      const trpc = createTRPCClient();
      const authUrl = await trpc.cli.getCliAuthUrl.query();

      spin.succeed("Authentication URL fetched");

      log.info(`Opening browser to: ${authUrl}`);
      await open(authUrl);

      console.log();
      log.info(
        "Complete authentication in your browser and generate an API key"
      );
      console.log();

      const { apiKey } = await inquirer.prompt<{ apiKey: string }>([
        {
          type: "input",
          name: "apiKey",
          message: "Paste your API key:",
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return "API key is required";
            }
            return true;
          },
        },
      ]);

      setConfig({ apiKey: apiKey.trim() });

      const validateSpin = spinner("Validating API key...").start();

      try {
        const authenticatedTrpc = createTRPCClient();
        await authenticatedTrpc.cli.validateApiKey.query();

        validateSpin.succeed("Authentication successful!");
        log.success(`Connected to ${cleanUrl}`);
      } catch (error) {
        validateSpin.fail("Invalid API key");
        clearConfig();
        process.exit(1);
      }
    } catch (error: any) {
      spin.fail("Failed to connect to server");
      log.error(error.message || "Unknown error occurred");
      clearConfig();
      process.exit(1);
    }
  });
