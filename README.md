# Build2Learn

## 🚀 Project Structure

Inside of the Astro project, we have the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content
│   │   ├── blog
│   │   │   ├── first-post.md
│   │   │   └── using-mdx.mdx
│   │   └── project
│   │       ├── project-1.md
│   │       ├── project-2.md
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── content.config.ts
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents for `blog` and `projects`.

Any static assets, like images, can be placed in the `public/` directory.

## 🛠️ Setup Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🧹 Code Quality & Linting

This project uses automated code quality tools that run on every commit:

### Development Commands

| Command                 | Action                                |
| :---------------------- | :------------------------------------ |
| `pnpm run lint`         | Check for linting errors              |
| `pnpm run lint:fix`     | Fix auto-fixable linting errors       |
| `pnpm run format`       | Format all files with Prettier        |
| `pnpm run format:check` | Check if files are properly formatted |

### Automatic Setup

After running `pnpm install`, Git hooks are automatically configured via Husky:

- **Pre-commit**: Automatically lints and formats only staged files
- **Commit-msg**: Validates commit messages follow [conventional commit format](https://conventionalcommits.org/)

### Commit Message Format

Use conventional commit format for your commit messages:

```
type(scope): description

Examples:
feat: add user authentication
fix: resolve sitemap URL issue
docs: update README
style: format code with prettier
refactor: reorganize components
chore: update dependencies
```

### IDE Setup (Recommended)

For the best development experience, configure your editor:

**VS Code:**

1. Install extensions:
   - ESLint
   - Prettier - Code formatter
   - Astro
2. Enable "Format on Save" in settings
3. Set Prettier as default formatter

**Other IDEs:**

- Enable ESLint and Prettier plugins
- Configure format on save
- Set up Astro language support if available
