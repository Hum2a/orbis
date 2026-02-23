# Contributing to Orbis

Thank you for your interest in contributing! 🌍

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](#)
2. If not, open a new issue using the [Bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Include steps to reproduce, expected vs actual behavior, and your environment

### Suggesting Features

1. Open an issue using the [Feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
2. Describe the feature and why it would be useful
3. Consider opening a discussion first for larger changes

### Pull Requests

1. Create a [feature branch](https://github.com/github/docs/blob/main/CONTRIBUTING.md#pull-request-process) from `main`
2. Make your changes
3. Ensure the project builds: `npm run build`
4. Run the dev server if relevant: `npm run dev` and `npm run dev:worker`
5. Submit a PR with a clear description of what changed and why
6. Link any related issues

## Development Setup

```bash
npm install
npm run dev:worker   # Terminal 1
npm run dev          # Terminal 2
```

## Code Style

- Use TypeScript
- Follow existing patterns in the codebase
- Keep commits focused and atomic

## Questions?

Open a [Discussion](https://github.com/YOUR_USERNAME/orbis/discussions) or an issue.
