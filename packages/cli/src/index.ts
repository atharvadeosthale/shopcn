import { Command } from "commander";
import { loginCommand, addCommand, helpCommand } from "./commands";
import { title } from "./utils/display";

const program = new Command();

program
  .name("shopcn")
  .description("CLI for managing shopcn component registries")
  .version("0.0.1", "-v, --version", "Display version number")
  .addCommand(loginCommand)
  .addCommand(addCommand)
  .addCommand(helpCommand);

program.on("command:*", () => {
  console.error(`\nUnknown command: ${program.args.join(" ")}`);
  console.log("\nRun 'shopcn help' for available commands");
  process.exit(1);
});

if (process.argv.length === 2) {
  title("📦 Shopcn CLI");
  console.log("Run 'shopcn help' for available commands\n");
} else {
  program.parse(process.argv);
}