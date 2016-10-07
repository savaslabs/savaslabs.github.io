# Styles directory

## SMACSS

Our SCSS directory structure is based on [SMACSS](https://smacss.com/). For the
most part, you should be adding styles to the `scss/components` directory.

## Critical CSS

Components should be as modular as possible and, for page styles, should be
separated by region so that above-the-fold styles can easily be picked out as
entire SCSS partials. These partials are included in `critical.scss`, which is
inlined in the `<head>` element (see `_includes/head.html`, where `critical.css`
is included in `<style>` tags). All SCSS partials are included in `main.scss`,
which is loaded asynchronously in the `<head>` and, as a backup, loaded in full
in a `<noscript>` tag in `_includes/scripts.html`.

See https://gomakethings.com/inlining-critical-css-for-better-web-performance/
for a good explanation of why I chose this strategy.