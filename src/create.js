import chalk from 'chalk';
import ora from 'ora';
import degit from 'degit';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { banner, done } from './ui.js';

export async function create({ repo, stack }, projectName) {
  const targetPath = resolve(process.cwd(), projectName);
  if (existsSync(targetPath)) {
    banner();
    console.log(
      '  ' + chalk.red('✗') + ' ' + chalk.bold(projectName) + ' already exists'
    );
    console.log();
    process.exit(1);
  }

  banner();

  const spinner = ora({
    text:
      chalk.gray('downloading ') +
      chalk.yellow(stack) +
      chalk.gray(' → ') +
      chalk.green(projectName),
    color: 'cyan',
    spinner: 'dots',
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
    spinner.fail(chalk.red('Failed to create project'));
    console.log('\n  ' + chalk.gray(err.message));
    console.log();
    process.exit(1);
  }
}
