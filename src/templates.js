import prompts from 'prompts';
import chalk from 'chalk';
import { getStarter } from './config.js';
import { banner } from './ui.js';
import { create } from './create.js';

export async function interactiveTemplates() {
  banner();

  const onCancel = () => {
    console.log();
    process.exit(0);
  };

  const { framework } = await prompts(
    {
      type: 'select',
      name: 'framework',
      message: 'Select a framework',
      choices: [
        { title: chalk.green('Vue'), value: 'vue' },
        { title: chalk.green('Nuxt'), value: 'nuxt' },
      ],
    },
    { onCancel }
  );

  const { ui } = await prompts(
    {
      type: 'select',
      name: 'ui',
      message: 'Select a UI library',
      choices: [
        { title: chalk.cyan('PrimeVue'), value: 'primevue' },
        { title: chalk.cyan('NuxtUI'), value: 'nuxtui' },
      ],
    },
    { onCancel }
  );

  const { projectName } = await prompts(
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name',
      validate: (value) =>
        value.trim().length > 0 ? true : 'Project name is required',
    },
    { onCancel }
  );

  const starter = getStarter(framework, ui);
  await create(starter, projectName.trim());
}
