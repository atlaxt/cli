import prompts from 'prompts';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { banner } from './ui.js';

const TOOLS = [
  {
    title: 'to-favicon',
    description: 'Generate favicons from an image',
    command: 'npx @atlaxt/to-favicon',
  },
];

export async function interactiveTools() {
  banner();

  const onCancel = () => {
    console.log();
    process.exit(0);
  };

  const { tool } = await prompts(
    {
      type: 'select',
      name: 'tool',
      message: 'Select a tool',
      choices: TOOLS.map((t) => ({
        title: chalk.yellow(t.title),
        value: t,
        description: chalk.gray(t.description),
      })),
    },
    { onCancel }
  );

  console.log();
  console.log(
    '  ' + chalk.gray('running ') + chalk.cyan(tool.command) + chalk.gray('...')
  );
  console.log();

  execSync(tool.command, { stdio: 'inherit' });
}
