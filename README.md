# Alder House

[![ci](https://github.com/smeltery/alder-house/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/alder-house/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/alder-house)](https://github.com/smeltery/alder-house/releases)
[![Astro](https://img.shields.io/badge/Astro-static-BC52EE?logo=astro)](https://astro.build)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)](https://www.sanity.io)
[![Bun](https://img.shields.io/badge/Bun-1.3.11-black?logo=bun)](https://bun.sh)
[![Flox](https://img.shields.io/badge/Flox-reproducible-99D88C)](https://flox.dev)
[![Vercel](https://img.shields.io/badge/Vercel-static-black?logo=vercel)](docs/vercel.md)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)

An editorial photography website for a fictional studio. Explore portraits, families,
personal brands, and celebrations, and a demo inquiry flow through an original ivory
and olive design, with six planning tools and keyboard search. Astro generates the
site; Sanity manages portfolio stories and
studio copy. No booking, payment, or inquiry data is collected.

```sh
flox activate
bun install --frozen-lockfile
bun run dev
```

Open `http://127.0.0.1:4398`. The site starts with fictional content; connect a
separate Sanity project using the [CMS guide](docs/cms.md). Flox installs the
pre-commit hook automatically. Run `bun run verify` for the same checks as CI.

See [docs/](docs/README.md) for the visitor guide, CMS publishing workflow,
development, Vercel hosting, architecture, release operations, and image credits.

Code is distributed under the [license](LICENSE). Third-party photographs retain
their [separate terms](docs/assets.md).
