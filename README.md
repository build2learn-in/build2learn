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

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
