import prompts from 'prompts';
import chalk from 'chalk';
import { TEMPLATES, TEMPLATE_NAMES, getVariants } from './config.js';
import { banner } from './ui.js';
import { create } from './create.js';

export async function interactiveTemplates() {
  banner();

  const onCancel = () => {
    console.log();
    process.exit(0);
  };

  const { templateName } = await prompts(
    {
      type: 'select',
      name: 'templateName',
      message: 'Select a template',
      choices: TEMPLATE_NAMES.map((name) => ({
        title: chalk.yellow(name),
        value: name,
      })),
    },
    { onCancel }
  );

  const { variant } = await prompts(
    {
      type: 'select',
      name: 'variant',
      message: 'Select a variant',
      choices: getVariants(templateName).map((v) => ({
        title: chalk.cyan(v),
        value: v,
        description: TEMPLATES[templateName].variants[v].stack,
      })),
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

  await create(templateName, variant, projectName.trim());
}
