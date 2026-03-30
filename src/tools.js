import prompts from "prompts";
import chalk from "chalk";
import { execSync } from "child_process";
import { banner } from "./ui.js";

const TOOLS = [
  {
    title: "to-favicon",
    description: "generate favicons from an image",
    command: "npx @atlaxt/to-favicon",
  },
  {
    title: "to-public",
    description: "publish your package.json as an always up-to-date json file",
    command: "npx @atlaxt/to-public",
  },
];

export async function interactiveTools({ skipBanner = false } = {}) {
  if (!skipBanner) banner();

  const onCancel = () => {
    console.log();
    process.exit(0);
  };

  const { tool } = await prompts(
    {
      type: "select",
      name: "tool",
      message: chalk.white("select a tool"),
      choices: TOOLS.map((t) => ({
        title: chalk.white(t.title) + "  " + chalk.dim(t.description),
        value: t,
      })),
    },
    { onCancel },
  );

  console.log();
  console.log(
    "  " + chalk.dim("running") + "  " + chalk.cyan(tool.command),
  );
  console.log();

  execSync(tool.command, { stdio: "inherit" });
}
