// eslint-disable-next-line unicorn/import-style
import type { ChalkInstance } from 'chalk';
import chalk from 'chalk';
import onetime from 'onetime';

import type { Style, Styler } from '~/types/style.js';
import type { JsonTheme, Theme } from '~/types/theme.js';
/**
 * Identity function for tokens that should not be styled (returns the input string as-is).
 * See [[Theme]] for an example.
 */
export const plain: Styler = (codePart) => codePart;

/**
 * The default theme. It is possible to override just individual keys.
 */
export const getDefaultTheme = onetime(
	(): Theme => ({
		keyword: chalk.blue,
		built_in: chalk.cyan,
		type: chalk.cyan.dim,
		literal: chalk.blue,
		number: chalk.green,
		regexp: chalk.red,
		string: chalk.red,
		subst: plain,
		symbol: plain,
		class: chalk.blue,
		function: chalk.yellow,
		title: plain,
		params: plain,
		comment: chalk.green,
		doctag: chalk.green,
		meta: chalk.grey,
		'meta-keyword': plain,
		'meta-string': plain,
		section: plain,
		tag: chalk.grey,
		name: chalk.blue,
		'builtin-name': plain,
		attr: chalk.cyan,
		attribute: plain,
		variable: plain,
		bullet: plain,
		code: plain,
		emphasis: chalk.italic,
		strong: chalk.bold,
		formula: plain,
		link: chalk.underline,
		quote: plain,
		'selector-tag': plain,
		'selector-id': plain,
		'selector-class': plain,
		'selector-attr': plain,
		'selector-pseudo': plain,
		'template-tag': plain,
		'template-variable': plain,
		addition: chalk.green,
		deletion: chalk.red,
		default: plain,
	})
);

/**
	Converts a [[JsonTheme]] with string values to a [[Theme]] with formatter functions. Used by [[parse]].
*/
export function fromJson(json: JsonTheme): Theme {
	const theme: Theme = {};
	for (const jsonKey of Object.keys(json)) {
		const key = jsonKey as keyof JsonTheme;
		const styleOrStyleArray: Style | Style[] = json[key]!;

		if (Array.isArray(styleOrStyleArray)) {
			const styles = styleOrStyleArray;
			let chalkStyle: (codePart: string) => string = chalk;
			for (const style of styles) {
				if (style === 'plain') {
					chalkStyle = plain;
				} else {
					chalkStyle = (chalkStyle as ChalkInstance)[style];
				}
			}

			theme[key] = chalkStyle;
		} else {
			theme[key] =
				styleOrStyleArray === 'plain' ? plain : chalk[styleOrStyleArray];
		}
	}

	return theme;
}

/**
	Parses a JSON string into a [[Theme]] with formatter functions.

	```ts
	import * as fs from 'node:fs';
	import { parse, highlight } from 'cli-highlighter';

	const json = fs.readFileSync('mytheme.json', 'utf8');
	const code = highlight('SELECT * FROM table', {theme: parse(json)});
	console.log(code);
	```
*/
export function parse(json: string): Theme {
	return fromJson(JSON.parse(json));
}
