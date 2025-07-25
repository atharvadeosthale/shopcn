import chalk from "chalk";
import ora from "ora";

export const log = {
  info: (message: string) => console.log(chalk.blue("ℹ"), message),
  success: (message: string) => console.log(chalk.green("✓"), message),
  error: (message: string) => console.log(chalk.red("✖"), message),
  warning: (message: string) => console.log(chalk.yellow("⚠"), message),
};

export const spinner = ora;

export const title = (text: string) => {
  console.log();
  console.log(chalk.bold(text));
  console.log();
};

export const box = (text: string) => {
  const lines = text.split("\n");
  const maxLength = Math.max(...lines.map(line => line.length));
  const border = "─".repeat(maxLength + 2);
  
  console.log(`┌${border}┐`);
  lines.forEach(line => {
    const padding = " ".repeat(maxLength - line.length);
    console.log(`│ ${line}${padding} │`);
  });
  console.log(`└${border}┘`);
};