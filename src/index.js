#!/usr/bin/env node

import chalk from "chalk";
import prompts from "prompts";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { banner } from "./ui.js";
import { interactiveTemplates } from "./templates.js";
import { interactiveTools } from "./tools.js";

const { version } = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../package.json"), "utf8"),
);

const args = process.argv.slice(2);
const [firstArg] = args;

const sign = `
              ↗↑     ↑
            ↗↑↑↑    ↑↗
           ↑↑↑↑   ↑↑↑
          ↑↑ ↑   ↑↑↑↑
        ↗↑  ↑↑  ↑↑↑↑
       ↑↑↑↑↑↑↑↑↗↑ ↑↑
 ↗↑↑↑↑↑↑   ↑↑↗↑↑ ↑↑↑↑↑↑↑
     ↑↑    ↑↑    ↑↗
    ↑↗        ↑↗↑↑
             ↑↑↑↑
           ↗↑  ↑↗
          ↑↑  ↗↑
          ↑  ↑↑
         ↑↑ ↗↑
         ↗↑↑↑
`;

async function main() {
  if (firstArg === "templates") {
    await interactiveTemplates();
    return;
  }

  if (firstArg === "tools") {
    await interactiveTools();
    return;
  }

  if (firstArg && firstArg !== "--help" && firstArg !== "-h") {
    banner();
    console.log(
      "  " + chalk.red("✗") + "  unknown command " + chalk.bold(firstArg),
    );
    console.log();
    process.exit(1);
  }

  console.log(chalk.white(sign));
  console.log(
    "  " + chalk.bold.white("atlaxt") +
    "  " + chalk.dim("·") + "  " + chalk.dim(`v${version}`),
  );
  console.log();

  const onCancel = () => {
    console.log();
    process.exit(0);
  };

  const { mode } = await prompts(
    {
      type: "select",
      name: "mode",
      message: chalk.white("what do you want to do?"),
      choices: [
        {
          title: chalk.white("templates") + "   " + chalk.dim("scaffold a new project"),
          value: "templates",
        },
        {
          title: chalk.white("tools") + "       " + chalk.dim("run a standalone tool"),
          value: "tools",
        },
      ],
    },
    { onCancel },
  );

  console.log();

  if (mode === "templates") {
    await interactiveTemplates({ skipBanner: true });
  } else if (mode === "tools") {
    await interactiveTools({ skipBanner: true });
  }
}

main();
