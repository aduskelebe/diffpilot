#!/usr/bin/env node
// ✈️  diffpilot — Terminal Diff Viewer

const { execSync } = require('child_process');
const readline     = require('readline');

const GREEN  = '\x1b[32m'; const RED    = '\x1b[31m';
const CYAN   = '\x1b[36m'; const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';  const DIM    = '\x1b[2m';
const NC     = '\x1b[0m';

function run(cmd) {
  try { return execSync(cmd, { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] }); }
  catch (e) { return e.stdout || ''; }
}

function colorLine(line) {
  if (line.startsWith('+') && !line.startsWith('+++')) return GREEN + line + NC;
  if (line.startsWith('-') && !line.startsWith('---')) return RED   + line + NC;
  if (line.startsWith('@@'))                           return CYAN  + line + NC;
  if (line.startsWith('diff'))                         return BOLD  + YELLOW + line + NC;
  return DIM + line + NC;
}

function getDiff(file1, file2, ignoreWhitespace = false) {
  const flag = ignoreWhitespace ? '-w' : '';
  return run(`diff -u ${flag} "${file1}" "${file2}" 2>/dev/null || true`);
}

function getStagedDiff() {
  return run('git diff --staged 2>/dev/null || git diff HEAD 2>/dev/null');
}

function getBranchDiff(base, head) {
  return run(`git diff ${base}...${head} 2>/dev/null`);
}

function renderDiff(diffText, title = 'Diff') {
  const lines = diffText.split('\n');
  console.clear();
  console.log(`\n${CYAN}${BOLD}✈️  diffpilot — ${title}${NC}\n`);
  console.log(`${DIM}${'─'.repeat(process.stdout.columns || 80)}${NC}`);

  let additions = 0, deletions = 0;
  lines.forEach(line => {
    if (line.startsWith('+') && !line.startsWith('+++')) additions++;
    if (line.startsWith('-') && !line.startsWith('---')) deletions++;
    console.log(colorLine(line));
  });

  console.log(`\n${DIM}${'─'.repeat(process.stdout.columns || 80)}${NC}`);
  console.log(`${GREEN}+${additions}${NC}  ${RED}-${deletions}${NC}  ${DIM}lines changed${NC}`);
  console.log(`\n${DIM}[q] quit  [n] next  [p] prev  [e] export  [?] help${NC}\n`);
}

// Main
const args = process.argv.slice(2);

if (args.includes('--staged')) {
  renderDiff(getStagedDiff(), 'Staged Changes');
} else if (args.includes('--branch')) {
  const idx   = args.indexOf('--branch');
  const base  = args[idx + 1] || 'main';
  const head  = args[idx + 2] || 'HEAD';
  renderDiff(getBranchDiff(base, head), `${base}...${head}`);
} else if (args.length >= 2) {
  const ignoreWS = args.includes('--ignore-whitespace');
  renderDiff(getDiff(args[0], args[1], ignoreWS), `${args[0]} vs ${args[1]}`);
} else {
  console.log(`
${CYAN}${BOLD}✈️  diffpilot${NC} — Terminal Diff Viewer

${YELLOW}Usage:${NC}
  node src/diff.js file1.js file2.js
  node src/diff.js file1.py file2.py --ignore-whitespace
  node src/diff.js --staged
  node src/diff.js --branch main feature/new-auth

${YELLOW}Keyboard:${NC}  j/k scroll  n/p next/prev change  q quit  e export
`);
}
