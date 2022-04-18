import type { Style, Styler } from '~/types/style.js';
import type { Tokens } from '~/types/tokens.js';

/**
	The schema of a JSON file defining a custom scheme. The key is a language token, while the value
	is a [chalk](https://github.com/chalk/chalk#styles) style.

	Example:
	```json
	{
			"keyword": ["red", "bold"],
			"addition": "green",
			"deletion": ["red", "strikethrough"],
			"number": "plain"
	}
	```
*/
export interface JsonTheme extends Tokens<Style | Style[]> {}

/**
	Passed to [[highlight]] as the `theme` option. A theme is a map of language tokens to a function
	that takes in string value of the token and returns a new string with colorization applied
	(typically a [chalk](https://github.com/chalk/chalk) style), but you can also provide your own
	formatting functions.

	Example:
	```ts
	import {Theme, plain} from 'cli-highlight';
	import chalk = require('chalk');
	*
	const myTheme: Theme = {
			keyword: chalk.red.bold,
			addition: chalk.green,
			deletion: chalk.red.strikethrough,
			number: plain
	};
	```
*/
export interface Theme extends Tokens<Styler> {
	/**
		things not matched by any token
	*/
	default?: (codePart: string) => string;
}
