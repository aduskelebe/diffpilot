# ✈️ diffpilot

> A side-by-side file diff viewer that runs in the terminal with syntax highlighting.

[![CI](https://img.shields.io/github/actions/workflow/status/yourusername/diffpilot/ci.yml?style=for-the-badge)](https://github.com/yourusername/diffpilot/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)
[![Codespace Ready](https://img.shields.io/badge/Codespace-Ready-green?style=for-the-badge&logo=github)](https://codespaces.new/yourusername/diffpilot)

---

## 🚀 What is diffpilot?

`diffpilot` is a terminal-native diff viewer that shows file differences side-by-side with syntax highlighting, line numbers, and intelligent change grouping. No browser, no GUI — just a fast, keyboard-driven diff experience.

```bash
# Compare two files
diffpilot file1.js file2.js

# Compare git staged changes
diffpilot --staged

# Compare two branches
diffpilot --branch main feature/new-auth

# Compare with ignore whitespace
diffpilot file1.py file2.py --ignore-whitespace
```

---

## ✨ Features

- 🎨 Syntax highlighting for 50+ languages
- ↔️ True side-by-side split view
- 🔢 Line numbers with change markers
- ⌨️ Keyboard navigation (j/k/n/p/q)
- 🚫 Whitespace-aware diffing
- 📋 Copy diff to clipboard
- 🌲 Git-native integration
- 💾 Export diff as HTML or Markdown

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `j / k` | Scroll down / up |
| `n / p` | Next / previous change |
| `q` | Quit |
| `c` | Copy current hunk |
| `e` | Export diff |
| `?` | Help |

---

## 🏆 GitHub Achievement Scripts

```bash
bash scripts/setup.sh
bash scripts/unlock-all.sh                      # Interactive menu
bash scripts/quickdraw.sh                       # ⚡ Quickdraw
bash scripts/yolo.sh                            # 🤠 YOLO
bash scripts/publicist.sh                       # 📢 Publicist
bash scripts/pull-shark.sh 2                    # 🦈 Bronze tier
bash scripts/pair-extraordinaire.sh "N" "e@m"   # 🤝 Pair Extraordinaire
node src/achievement-tracker.js                 # 📊 Track progress
```

---

## 🤝 Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)
