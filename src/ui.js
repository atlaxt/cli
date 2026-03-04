import chalk from 'chalk';

export function banner() {
  console.log('  ' + chalk.bold.white('atlaxt'));
  console.log('  ' + chalk.gray('─'.repeat(28)));
  console.log();
}

export function help() {
  banner();

  console.log('  ' + chalk.bold('Commands'));
  console.log(
    '    ' + chalk.cyan('atlaxt templates') + chalk.gray('  create a project')
  );
  console.log(
    '    ' + chalk.cyan('atlaxt tools') + chalk.gray('      run a tool')
  );
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
