import hljs from 'highlight.js';
import * as parse5 from 'parse5';
import type * as HtmlParser2 from 'parse5-htmlparser2-tree-adapter';
import htmlparser2Adapter from 'parse5-htmlparser2-tree-adapter';

import type { HighlightOptions } from '~/types/highlight.js';
import type { Styler } from '~/types/style.js';
import type { Theme } from '~/types/theme';
import type { Tokens } from '~/types/tokens.js';
import { DEFAULT_THEME, plain } from '~/utils/theme.js';

function colorizeNode(
	node: HtmlParser2.Node,
	theme: Theme = {},
	context?: string
): string {
	switch (node.type) {
		case 'text': {
			const text = (node as HtmlParser2.TextNode).data;
			if (context === undefined) {
				return (theme.default ?? DEFAULT_THEME.default ?? plain)(text);
			}

			return text;
		}

		case 'tag': {
			const hljsClass = /hljs-(\w+)/.exec(
				(node as HtmlParser2.Element).attribs.class!
			);
			if (hljsClass) {
				const token = hljsClass[1] as keyof Tokens<Styler>;
				const nodeData = (node as HtmlParser2.Element).childNodes
					.map((node) => colorizeNode(node, theme, token))
					.join('');

				return (theme[token] ?? DEFAULT_THEME[token] ?? plain)(nodeData);
			}

			// Return the data itself when the class name isn't prefixed with a highlight.js token prefix.
			// This is common in instances of sublanguages (JSX, Markdown Code Blocks, etc.)
			return (node as HtmlParser2.Element).childNodes
				.map((node) => colorizeNode(node, theme))
				.join('');
		}

		default:
			throw new Error('Invalid node type ' + node.type);
	}
}

function colorize(code: string, theme: Theme = {}): string {
	const fragment = parse5.parseFragment(code, {
		treeAdapter: htmlparser2Adapter,
	});
	return fragment.childNodes.map((node) => colorizeNode(node, theme)).join('');
}

/**
	Apply syntax highlighting to `code` with ASCII color codes. The language is automatically detected if not set.

	```ts
		import { highlight } from 'cli-highlighter';
		import * as fs from 'node:fs';

		const json = await fs.readFileSync('package.json', 'utf8');
    console.log('package.json:');
    console.log(highlight(json));
	```

	@param code The code to highlight
	@param options Optional options
*/
export function highlight(
	code: string,
	options: HighlightOptions = {}
): string {
	let html: string;
	if (options.language) {
		html = hljs.highlight(code, {
			language: options.language,
			ignoreIllegals: options.ignoreIllegals,
		}).value;
	} else {
		html = hljs.highlightAuto(code).value;
	}

	return colorize(html, options.theme);
}

/**
	Returns all supported languages
*/
export function listLanguages(): string[] {
	return hljs.listLanguages();
}

/**
	Returns true if the language is supported
	@param name A language name, alias or file extension
*/
export function supportsLanguage(name: string): boolean {
	return Boolean(hljs.getLanguage(name));
}
