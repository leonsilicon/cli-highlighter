# cli-highlighter

This package is a fork of [felixfbecker's amazing cli-highlight package](https://github.com/felixfbecker/cli-highlight).

> Syntax highlighting in your terminal

[![npm](https://img.shields.io/npm/v/cli-highlighter.svg)](https://www.npmjs.com/package/cli-highlighter)

## Example

![Example Output](assets/screenshot.svg)

## CLI Usage

Output a file

```shell
highlight package.json
```

Color output of another program with piping. Example: A database migration script that logs SQL Queries

```shell
db-migrate --dry-run | highlight
```

Command line options:

```html
Usage: highlight [options] [file]

Outputs a file or STDIN input with syntax highlighting

Options:
  --language, -l  Set the langugage explicitely
                  If omitted will try to auto-detect
  --theme, -t     Use a theme defined in a JSON file
  --help, -h      Show help
```

## Programmatic Usage

You can use this module programmatically to highlight logs of your Node app. Example:

```js
import highlight from 'cli-highlighter';
import Sequelize from 'sequalize';

const db = new Sequelize(process.env.DB, {
  logging(log) {
    console.log(highlight(log, { language: 'sql', ignoreIllegals: true }))
  }
})
```

Detailed API documentation can be found [here](http://cli-highlight.surge.sh/).

## Themes

You can write your own theme in a JSON file and pass it with `--theme`.
The key must be one of the [highlight.js CSS class names](http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html) or `"default"`,
and the value must be one or an array of [Chalk styles](https://github.com/chalk/chalk#styles) to be applied to that token.

```json
{
  "keyword": "blue",
  "built_in": ["cyan", "dim"],
  "string": "red",
  "default": "gray"
}
```

The style for `"default"` will be applied to any substrings not handled by highlight.js. The specifics depend on the language but this typically includes things like commas in parameter lists, semicolons at the end of lines, etc.

The theme is combined with the [default theme](http://cli-highlight.surge.sh/globals.html#default_theme).
The default theme is still not colored a lot or optimized for many languages, PRs welcome!

## Supported Languages

[All languages of highlight.js](https://highlightjs.org/static/demo/) are supported.

## Contributing

The module is written in TypeScript and can be compiled with `pnpm build`. Tests are written with [vitest](https://github.com/vitest/vitest).

Improving language support is done by adding more colors to the tokens in the default theme and writing more tests.
