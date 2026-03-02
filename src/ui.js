import chalk from 'chalk';
import { TEMPLATES } from './config.js';

export function banner() {
  console.log('  ' + chalk.bold.white('atlaxt'));
  console.log('  ' + chalk.gray('─'.repeat(28)));
  console.log();
}

export function help() {
  banner();

  console.log('  ' + chalk.bold('Usage'));
  console.log(
    '    ' +
      chalk.cyan('atlaxt') +
      ' ' +
      chalk.yellow('<template>') +
      ' ' +
      chalk.cyan('<variant>') +
      ' ' +
      chalk.green('<project-name>')
  );
  console.log(
    '    ' + chalk.cyan('atlaxt templates') + chalk.gray('  interactive mode')
  );
  console.log();

  console.log('  ' + chalk.bold('Templates'));
  for (const [name, { variants }] of Object.entries(TEMPLATES)) {
    for (const [variant, { stack }] of Object.entries(variants)) {
      console.log(
        '    ' +
          chalk.yellow(name) +
          ' ' +
          chalk.cyan(variant.padEnd(8)) +
          chalk.gray(stack)
      );
    }
  }
  console.log();

  console.log('  ' + chalk.bold('Examples'));
  console.log('    ' + chalk.gray('atlaxt titan vue my-app'));
  console.log('    ' + chalk.gray('atlaxt titan nuxt my-site'));
  console.log('    ' + chalk.gray('atlaxt templates'));
  console.log();
}

export function done(projectName, stack) {
  console.log();
  console.log(
    '  ' +
      chalk.green('✓') +
      ' ' +
      chalk.bold.white(projectName) +
      chalk.gray(' created  ') +
      chalk.gray('[') +
      chalk.cyan(stack) +
      chalk.gray(']')
  );
  console.log();
  console.log('  ' + chalk.bold('Next steps'));
  console.log('    ' + chalk.cyan('cd ') + projectName);
  console.log('    ' + chalk.cyan('npm install'));
  console.log('    ' + chalk.cyan('npm run dev'));
  console.log();
}
