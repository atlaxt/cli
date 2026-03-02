#!/usr/bin/env node

import chalk from 'chalk';
import { TEMPLATES, TEMPLATE_NAMES, getVariants } from './config.js';
import { help, banner } from './ui.js';
import { create } from './create.js';
import { interactiveTemplates } from './templates.js';

const args = process.argv.slice(2);
const [firstArg, secondArg, thirdArg] = args;

async function main() {
  if (!firstArg || firstArg === '--help' || firstArg === '-h') {
    help();
    process.exit(firstArg ? 0 : 1);
  }

  if (firstArg === 'templates') {
    await interactiveTemplates();
    return;
  }

  if (!TEMPLATES[firstArg]) {
    banner();
    console.log(
      '  ' + chalk.red('✗') + ' Unknown template: ' + chalk.bold(firstArg)
    );
    console.log(
      '  ' +
        chalk.gray('Available: ') +
        TEMPLATE_NAMES.map((t) => chalk.yellow(t)).join(chalk.gray(', '))
    );
    console.log(
      '  ' + chalk.gray('Run ') + chalk.cyan('atlaxt --help') + chalk.gray(' for usage info')
    );
    console.log();
    process.exit(1);
  }

  const variants = getVariants(firstArg);
  if (!secondArg || !variants.includes(secondArg)) {
    banner();
    console.log(
      '  ' + chalk.red('✗') +
      (!secondArg ? ' Variant is required' : ' Unknown variant: ' + chalk.bold(secondArg))
    );
    console.log(
      '  ' +
        chalk.gray('Available: ') +
        variants.map((v) => chalk.cyan(v)).join(chalk.gray(', '))
    );
    console.log();
    process.exit(1);
  }

  if (!thirdArg) {
    banner();
    console.log('  ' + chalk.red('✗') + ' Project name is required');
    console.log(
      '  ' +
        chalk.gray('Example: ') +
        chalk.cyan('atlaxt ') +
        chalk.yellow(firstArg) +
        ' ' +
        chalk.cyan(secondArg) +
        ' ' +
        chalk.green('my-project')
    );
    console.log();
    process.exit(1);
  }

  await create(firstArg, secondArg, thirdArg);
}

main();
