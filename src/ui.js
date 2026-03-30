import chalk from "chalk";

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function gradientLine(line, from, to, t) {
  const r = lerp(from[0], to[0], t);
  const g = lerp(from[1], to[1], t);
  const b = lerp(from[2], to[2], t);
  return chalk.rgb(r, g, b)(line);
}

const SIGN_LINES = [
  "              ↗↑     ↑      ",
  "            ↗↑↑↑    ↑↗      ",
  "           ↑↑↑↑   ↑↑↑       ",
  "          ↑↑ ↑   ↑↑↑↑       ",
  "        ↗↑  ↑↑  ↑↑↑↑        ",
  "       ↑↑↑↑↑↑↑↑↗↑ ↑↑        ",
  " ↗↑↑↑↑↑↑   ↑↑↗↑↑ ↑↑↑↑↑↑↑   ",
  "     ↑↑    ↑↑    ↑↗         ",
  "    ↑↗        ↑↗↑↑          ",
  "             ↑↑↑↑           ",
  "           ↗↑  ↑↗           ",
  "          ↑↑  ↗↑            ",
  "          ↑  ↑↑             ",
  "         ↑↑ ↗↑              ",
  "         ↗↑↑↑               ",
];

export function printSign() {
  const from = [0, 212, 255];   // electric cyan
  const to   = [168, 85, 247];  // violet
  console.log();
  SIGN_LINES.forEach((line, i) => {
    const t = i / (SIGN_LINES.length - 1);
    console.log(gradientLine(line, from, to, t));
  });
}

export function banner() {
  console.log();
  console.log(
    "  " +
    chalk.rgb(0, 212, 255).bold("atlaxt") +
    "  " +
    chalk.dim("─".repeat(30)),
  );
  console.log();
}

export function done(projectName, stack) {
  console.log();
  console.log(chalk.dim("  ╭───────────────────────────────╮"));
  console.log(chalk.dim("  │") + "                                 " + chalk.dim("│"));
  console.log(chalk.dim("  │") + "  " + chalk.rgb(0,212,255)("✓") + "  " + chalk.bold.white(projectName) + " ".repeat(Math.max(1, 27 - projectName.length)) + chalk.dim("│"));
  console.log(chalk.dim("  │") + "     " + chalk.dim(stack) + " ".repeat(Math.max(1, 27 - stack.length)) + chalk.dim("│"));
  console.log(chalk.dim("  │") + "                                 " + chalk.dim("│"));
  console.log(chalk.dim("  ╰───────────────────────────────╯"));
  console.log();
  console.log("  " + chalk.dim("next steps"));
  console.log();
  console.log("  " + chalk.rgb(168,85,247)("▸") + "  " + chalk.cyan("cd") + " " + chalk.white(projectName));
  console.log("  " + chalk.rgb(168,85,247)("▸") + "  " + chalk.cyan("npm install"));
  console.log("  " + chalk.rgb(168,85,247)("▸") + "  " + chalk.cyan("npm run dev"));
  console.log();
}
