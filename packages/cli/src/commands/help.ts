import { Command } from "commander";
import chalk from "chalk";
import { box, title } from "../utils/display";

const commands = [
  {
    name: "login",
    description: "Authenticate with your shopcn server",
    usage: "shopcn login",
  },
  {
    name: "add",
    description: "Create a draft from your registry JSON file",
    usage: "shopcn add <registry.json>",
  },
  {
    name: "help",
    description: "Show this help message",
    usage: "shopcn help",
  },
];

export const helpCommand = new Command("help")
  .description("Show available commands and usage")
  .action(() => {
    title("📦 Shopcn CLI - Component Registry Manager");
    
    console.log(chalk.dim("Manage your shadcn components with ease\n"));
    
    console.log(chalk.bold("Usage:"));
    console.log("  shopcn <command> [options]\n");
    
    console.log(chalk.bold("Available Commands:"));
    
    commands.forEach(cmd => {
      console.log(
        `  ${chalk.cyan(cmd.name.padEnd(10))} ${chalk.dim(cmd.description)}`
      );
    });
    
    console.log();
    console.log(chalk.bold("Examples:"));
    console.log(chalk.dim("  # Authenticate with your server"));
    console.log("  $ shopcn login\n");
    console.log(chalk.dim("  # Add a component registry"));
    console.log("  $ shopcn add ./registry.json\n");
    
    console.log(chalk.dim("For more information, visit: https://shopcn.dev"));
  });