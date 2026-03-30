import chalk from "chalk";
import ora from "ora";
import degit from "degit";
import { existsSync } from "fs";
import { resolve } from "path";
import { banner, done } from "./ui.js";

export async function create({ repo, stack }, projectName) {
  const targetPath = resolve(process.cwd(), projectName);

  if (existsSync(targetPath)) {
    banner();
    console.log(
      "  " + chalk.red("✗") + "  " + chalk.bold(projectName) + chalk.dim(" already exists"),
    );
    console.log();
    process.exit(1);
  }

  banner();

  const spinner = ora({
    text:
      chalk.dim("cloning ") +
      chalk.cyan(stack) +
      chalk.dim(" → ") +
      chalk.white(projectName),
    color: "white",
    spinner: "line",
  }).start();

  try {
    const emitter = degit(repo, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(projectName);

    spinner.stop();
    done(projectName, stack);
  } catch (err) {
    spinner.fail(chalk.red("failed to create project"));
    console.log("  " + chalk.dim(err.message));
    console.log();
    process.exit(1);
  }
}
