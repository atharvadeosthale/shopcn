import { Command } from "commander";
import { readFileSync } from "fs";
import { resolve } from "path";
import open from "open";
import { createTRPCClient } from "../trpc";
import { isAuthenticated, clearConfig, getConfig } from "../config";
import { log, spinner } from "../utils/display";

export const addCommand = new Command("add")
  .description("Create a draft from your registry JSON file")
  .argument("<file>", "Path to your registry.json file")
  .action(async (file: string) => {
    if (!isAuthenticated()) {
      log.error("You are not authenticated. Please run 'shopcn login' first.");
      process.exit(1);
    }

    const spin = spinner("Reading registry file...").start();

    try {
      const filePath = resolve(process.cwd(), file);
      const fileContent = readFileSync(filePath, "utf-8");
      
      try {
        JSON.parse(fileContent);
      } catch {
        spin.fail("Invalid JSON file");
        log.error("The provided file contains invalid JSON");
        process.exit(1);
      }

      spin.text = "Creating draft...";

      const trpc = createTRPCClient();
      const result = await trpc.cli.createDraft.mutate({
        json: fileContent,
      });

      spin.succeed(`Draft created successfully!`);
      log.success(`Draft ID: ${result.id}`);
      log.info(`Opening browser to: ${result.url}`);
      
      await open(result.url);
      
      console.log();
      log.success("You can now continue editing your draft in the browser");
    } catch (error: any) {
      spin.fail("Failed to create draft");
      
      if (error.code === "ENOENT") {
        log.error(`File not found: ${file}`);
      } else if (
        error.message?.includes("UNAUTHORIZED") || 
        error.message?.includes("FORBIDDEN") ||
        error.message?.includes("401") ||
        error.message?.includes("403") ||
        error.message?.includes("Rate limit") ||
        error.message?.includes("Internal Server Error") ||
        error.code === "UNAUTHORIZED"
      ) {
        clearConfig();
        log.error("Authentication failed. Please run 'shopcn login' again.");
      } else if (error.message?.includes("Unexpected token")) {
        clearConfig();
        log.error("Server returned an invalid response. Your API key may be invalid or rate limited.");
        log.error("Please run 'shopcn login' again.");
      } else {
        log.error(error.message || "Unknown error occurred");
      }
      
      process.exit(1);
    }
  });