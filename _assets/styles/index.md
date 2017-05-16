# Introduction

Welcome to the [Savas Labs](http://savaslabs.com) front end style guide!

## About this style guide

This style guide is built using [Hologram](http://github.com/trulia/hologram) and uses YAML and HTML in SCSS comments to construct the documentation. Configuration can be found in `hologram_config.yml` and styleguide assets such as header and footer markup are located in the `styleguide_assets` directory. The styleguide is built using the `hologram` command, which is incorporated into our gulp `build` and `serve` tasks.

To see all the code for this style guide and our website, check out our [GitHub Repository](https://github.com/savaslabs/savaslabs.github.io).

## Writing styles for savaslabs.com

### Directory structure

Our SCSS directory is based on the following hierarchy:

- 00: Libraries
- 01: Base styles (importing libraries, setting variables, CSS reset)
- 02: Colors
- 03: Typography
- 04: Components
- 05: Regions
- 06: Pages

Components are discrete site elements that can be dropped into any region or page. Each component should live in its own file, with the name of the file matching the name of the component in the style guide. For child components, name the file `_parent--child.scss`, e.g. `_buttons--submit.scss`.

Regions are repeated areas that use several components, like the header and footer.

The pages directory will hold layout styles on the page level.

### Adding components to the style guide

To add a component to the style guide, create a new `.scss` file named after the component and add the file to `main.scss`. Add comments to the SCSS file to generate the component in the style guide:

```css

​/*doc
​---
​title: Links
​name: links
​category: Typography
​---
​```html_example
​<a href="#">This is a link</a>
​<p>This is an <a href="#">inline link</a></p>
​```
​*/
```

You can also generate a tabular format using `html_example_table`:

```css

​/*doc
​---
​title: Headings
​name: headings
​category: Typography
​---
​```html_example_table
​<h1>This is a heading</h1>
​
​<h2>This is a heading</h2>
​
​<h3>This is a heading</h3>
​
​<h4>This is a heading</h4>
​
​<h5>This is a heading</h5>
​```
​*/

```

[See Hologram's documentation](https://github.com/trulia/hologram#documenting-your-styles-and-components) for more information.

### Critical CSS

Components should be as modular as possible and, for page-specific styles, should be separated by region so that above-the-fold styles can easily be picked out as entire SCSS partials. These partials are included in each layout's `critical*.scss`, which is inlined in the `<head>` element (see `_includes/head.html`, where `critical*.css` is included in `<style>` tags). All SCSS partials are included in `main.scss`, which is loaded asynchronously in the `<head>` and, as a backup, loaded in full in a `<noscript>` tag in `_includes/scripts.html`.

See [this article from Go Make Things](https://gomakethings.com/inlining-critical-css-for-better-web-performance/) for a good explanation of why we chose this strategy.

## Styling the style guide

Styles specific to the style guide are housed in `_assets/styles/scss/styleguide` and imported into the `_assets/styles/styleguide.scss` file. The resulting CSS, compiled by gulp, will be included in the style guide.

## Acknowledgements

This documentation is generated using [Hologram](http://github.com/trulia/hologram) and contains some markup and styles adapted from the [Acme boilerplate](https://github.com/mattrothenberg/styleguide-boilerplate).