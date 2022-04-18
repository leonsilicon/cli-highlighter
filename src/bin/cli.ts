#!/usr/bin/env node

import { program } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import type * as tty from 'node:tty';
import { outdent } from 'outdent';

import type { HighlightOptions } from '~/types/highlight.js';
import { highlight, supportsLanguage } from '~/utils/highlight.js';
import { parse } from '~/utils/theme.js';

program
	.name('cli-highlighter')
	.usage(
		outdent`
			Usage: highlight [options] [file]
			Outputs a file or STDIN input with syntax highlighting
		`
	)
	.option('-t, --theme <theme>', 'Use a theme defined in a JSON file')
	.option(
		'-l, --language <language>',
		'Set the language explicitly. If omitted, will try to auto-detect'
	)
	.argument('<file>')
	.showHelpAfterError();

const { theme: themeFilePath, language } = program.opts<{
	theme?: string;
	language: string;
}>();

const file = program.args[0];

let code = '';
if (!file && !(process.stdin as tty.ReadStream).isTTY) {
	// Input from STDIN
	process.stdin.setEncoding('utf8');

	process.stdin.on('readable', () => {
		const chunk = process.stdin.read() as unknown;
		if (chunk !== null) {
			code += String(chunk);
		}
	});

	await new Promise((resolve) => {
		process.stdin.on('end', () => {
			const chunk = process.stdin.read() as unknown;
			if (chunk !== null) {
				code += String(chunk);
			}

			resolve(code);
		});
	});
} else if (file) {
	// Read file
	code = fs.readFileSync(file, 'utf-8');
} else {
	program.help();
}

const theme =
	themeFilePath === undefined
		? undefined
		: fs.readFileSync(themeFilePath, 'utf8');

const options: HighlightOptions = {
	ignoreIllegals: true,
	theme: (theme && parse(theme)) || undefined,
};

if (file) {
	const extension = path.extname(file).slice(1);
	if (extension && supportsLanguage(extension)) {
		options.language = extension;
	}
}

options.language = language;

process.stdout.write(highlight(code, options));
