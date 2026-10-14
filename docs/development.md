# Local development

## Start with Flox

Install [Flox](https://flox.dev), clone the repository, and run:

```sh
flox activate
bun install --frozen-lockfile
bun run dev
```

The committed Flox manifest and lock select Bun, Node, Git, and actionlint for
macOS and Linux on Intel and ARM. Activation installs the repository’s Git hooks.
Use `flox services start site` or `flox services start studio` to run managed
services; `flox services stop site studio` stops them. Studio requires the
[CMS configuration](cms.md).

## Commands

| Command                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `bun run dev`          | Hot-reloading website at localhost:4398              |
| `bun run studio`       | Sanity editor at localhost:3333                      |
| `bun run build`        | Generate the public website in dist/                 |
| `bun run studio:build` | Compile the editor into dist/studio/                 |
| `bun run preview`      | Serve the built website                              |
| `bun run format`       | Format code and Markdown                             |
| `bun run check`        | Formatting, Markdown, Mermaid, links, budgets, types |
| `bun run verify`       | Complete CI and pre-commit checks                    |

Before the first complete verification, install the browser once:

```sh
bunx playwright install chromium
bun run verify
```

Linux CI adds `--with-deps`. Pre-commit runs the same `scripts/check.sh` as CI via
Flox, including website and Studio builds, workflow lint, browser journeys,
responsive checks, and automated accessibility scans. Failed checks block the
commit. Nothing auto-stages or rewrites your changes.

## Keep the project lean

`scripts/budgets.json` enforces a total of 8,150 authored lines, a default 250-line
file limit, and 15 files per directory. Page CSS allows 650 lines; navigation/footer CSS allows 300, editorial/form CSS 400. The expanded budget covers session
routes, brand resources, the detailed form, and distinct portfolio, sessions, and
studio layouts, and the accessible gallery viewer with its photo credits and tests.
Layouts, inquiry guidance, and the visual credit directory use shared components
and focused stylesheets.
Counts include Markdown, configuration, tests, and scripts with supported source
extensions, including untracked files. Generated locks, dependencies, binaries,
and Flox-generated state are excluded. Formatting runs first, so compacting code
cannot bypass the budget. Prefer removing duplication before raising limits.

## Troubleshooting

If a frozen install fails, intentionally update dependencies with `bun install`,
review `bun.lock`, and commit both manifest and lock. If Flox cannot resolve an
updated package, keep the previous working lock and inspect `flox edit` output.
For content failures, check the dataset, required copy, unique slugs, image assets,
and alt text. The build never silently falls back from configured CMS mode.

The development server at port 4398 updates automatically when source files
change. Use `flox services start site` and keep the Flox activation open.

## Built-site preview

Run `bun run build`, then `flox services start preview` inside an active Flox
shell to serve the built website at `http://127.0.0.1:4399`. Keep that activation
open while previewing: Flox stops services when the last activation exits. Use
`flox services status` to check it and `flox services stop preview` to stop it.
