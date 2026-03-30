import prompts from "prompts";
import chalk from "chalk";
import { getStarter } from "./config.js";
import { banner } from "./ui.js";
import { create } from "./create.js";

export async function interactiveTemplates({ skipBanner = false } = {}) {
  if (!skipBanner) banner();

  const onCancel = () => {
    console.log();
    process.exit(0);
  };

  const { framework } = await prompts(
    {
      type: "select",
      name: "framework",
      message: chalk.white("framework"),
      choices: [
        { title: chalk.white("Vue") + "   " + chalk.dim("progressive web framework"), value: "vue" },
        { title: chalk.white("Nuxt") + "  " + chalk.dim("full-stack Vue framework"), value: "nuxt" },
      ],
    },
    { onCancel },
  );

  const { ui } = await prompts(
    {
      type: "select",
      name: "ui",
      message: chalk.white("UI library"),
      choices: [
        { title: chalk.white("PrimeVue") + "  " + chalk.dim("rich component library"), value: "primevue" },
        { title: chalk.white("NuxtUI") + "    " + chalk.dim("tailwind-based components"), value: "nuxtui" },
      ],
    },
    { onCancel },
  );

  const { projectName } = await prompts(
    {
      type: "text",
      name: "projectName",
      message: chalk.white("project name"),
      validate: (value) =>
        value.trim().length > 0 ? true : chalk.red("project name is required"),
    },
    { onCancel },
  );

  console.log();

  const starter = getStarter(framework, ui);
  await create(starter, projectName.trim());
}
