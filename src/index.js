#!/usr/bin/env node

import chalk from 'chalk';
import { help, banner } from './ui.js';
import { interactiveTemplates } from './templates.js';
import { interactiveTools } from './tools.js';

const args = process.argv.slice(2);
const [firstArg] = args;

async function main() {
  if (!firstArg || firstArg === '--help' || firstArg === '-h') {
    help();
    process.exit(firstArg ? 0 : 1);
  }

  if (firstArg === 'templates') {
    await interactiveTemplates();
    return;
  }

  if (firstArg === 'tools') {
    await interactiveTools();
    return;
  }

  banner();
  console.log(
    '  ' + chalk.red('✗') + ' Unknown command: ' + chalk.bold(firstArg)
  );
  console.log(
    '  ' + chalk.gray('Run ') + chalk.cyan('atlaxt templates') + chalk.gray(' to create a project')
  );
  console.log();
  process.exit(1);
}

main();
