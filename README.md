# Pilgrimage Homeschool

Static Astro site for the Pilgrimage Homeschool Science Olympiad team.

## Development

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

The site uses Astro's static output and generates the finished site in `dist/`.

## Content

Page content lives in `src/content/pages/`. Each page is a Markdown file with
only its metadata in YAML frontmatter:

```yaml
---
title: About
description: Learn more about the team.
---
```

The body of each page is HTML. This keeps the content structure editable in
PagesCMS while allowing the site to provide reusable styling classes such as
`page-section`, `card-grid`, and `content-card`.

Page titles automatically receive the `| Pilgrimage Homeschool` suffix in
`BaseLayout.astro`.

Site-wide navigation and footer content are stored in
`src/content/site.yaml`.

## PagesCMS

PagesCMS is configured in `.pages.yml`. It provides:

- HTML rich-text editing for page bodies
- Editable page titles and descriptions
- Editable header navigation and footer links
- Image uploads through the `images` media source

Images are stored under `public/assets/` and referenced on the site through
`/assets/...` URLs. Existing page images are in `public/assets/images/`, and
the homepage hero image is in `public/assets/homepage/`.

## Styles

- `src/styles/base.css` — global reset and element defaults
- `src/styles/variables.css` — color variables
- `src/styles/page.css` — shared page and section layout
- `src/styles/components.css` — reusable HTML content components
- `src/styles/home.css` — homepage-specific styles
- `src/styles/header.css` — header and navigation
- `src/styles/footer.css` — footer
