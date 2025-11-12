# Contributing to VodTinker Portfolio

First off, thank you for considering contributing to VodTinker Portfolio! It's people like you that make this project such a great tool for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
  - [Git Commit Messages](#git-commit-messages)
  - [TypeScript Style Guide](#typescript-style-guide)
  - [React/Astro Guidelines](#reactastro-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [danielfonov71@vodtinker.dev](mailto:danielfonov71@vodtinker.dev).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**How Do I Submit A Good Bug Report?**

Bugs are tracked as [GitHub issues](https://github.com/VodTinker/VodTinker-Webpage/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
- **Include your environment details:**
  - OS (Windows, macOS, Linux)
  - Browser and version
  - Node.js version
  - npm/yarn/bun version

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/VodTinker/VodTinker-Webpage/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps** or provide mockups/wireframes.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most users.
- **List some other projects where this enhancement exists** (if applicable).

### Pull Requests

The process described here has several goals:

- Maintain code quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. **Fork the repository** and create your branch from `main`.
2. **Follow all instructions** in the template
3. **Follow the [style guidelines](#style-guidelines)**
4. **Write clear, descriptive commit messages**
5. **Include screenshots** in your pull request whenever possible.
6. **End all files with a newline**
7. **Test your changes** thoroughly

## Development Setup

### Prerequisites

- Node.js 18+ or Bun (recommended)
- npm/yarn/pnpm/bun
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/VodTinker-Webpage.git
   cd VodTinker-Webpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys (optional for development)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/bug-fix
   ```

### Project Structure

```
src/
├── components/     # React components
├── contexts/       # React contexts (e.g., LanguageContext)
├── layouts/        # Astro layouts
├── pages/          # Astro pages (routing)
├── utils/          # Utility functions
└── index.css       # Global styles
```

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐛 `:bug:` when fixing a bug
  - ✨ `:sparkles:` when adding a new feature
  - 📝 `:memo:` when writing docs
  - 🚀 `:rocket:` when improving performance
  - ♻️ `:recycle:` when refactoring code
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies

**Example:**
```
✨ Add multilingual support for Spanish

- Implement i18next for translations
- Add LanguageContext for state management
- Create translation files for EN/ES
- Update components to use translations

Closes #123
```

### TypeScript Style Guide

- Use TypeScript for all new files
- Define types/interfaces for component props
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

**Example:**
```typescript
/**
 * Formats a date string to a localized format
 * @param date - The date string to format
 * @param locale - The locale to use (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(date: string, locale: string = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale);
}
```

### React/Astro Guidelines

#### React Components

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Export components as named exports
- Use Tailwind CSS for styling

**Example:**
```typescript
import { type FC } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

#### Astro Components

- Use `.astro` extension for Astro components
- Keep logic in the frontmatter section
- Use client directives appropriately (`client:load`, `client:visible`, etc.)

### CSS/Tailwind Guidelines

- Prefer Tailwind utility classes over custom CSS
- Use CSS modules or scoped styles for component-specific styles
- Follow mobile-first approach
- Use CSS variables for theme values

### Code Formatting

We use Biome for code formatting and linting:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

Please run these commands before committing your changes.

## Testing

Before submitting a pull request:

1. **Test in multiple browsers** (Chrome, Firefox, Safari)
2. **Test on mobile devices** or use responsive mode
3. **Test with different themes** (light/dark)
4. **Test with different languages** (English/Spanish)
5. **Verify no console errors**
6. **Check for accessibility issues**

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Update the README.md** if you're adding features that need explanation
3. **Follow the pull request template**
4. **Link related issues** in the PR description
5. **Request review** from maintainers
6. **Address review comments** promptly
7. **Keep your PR focused** - one feature/fix per PR

### Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe the tests you ran and how to reproduce them

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on multiple browsers
- [ ] I have tested responsive design
```

## Community

- Follow [@VodTinker](https://github.com/VodTinker) on GitHub
- Join discussions in [Issues](https://github.com/VodTinker/VodTinker-Webpage/issues)
- Share your experience using the project

## Recognition

Contributors will be recognized in:
- The project's README.md
- Release notes
- GitHub's contributor page

## Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Check existing documentation

---

Thank you for contributing to VodTinker Portfolio! 🎉
