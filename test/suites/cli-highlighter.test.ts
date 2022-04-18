import { join } from 'desm';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import { describe, expect, it } from 'vitest';

// Needed to override `lionp` settings
process.env.FORCE_COLOR = '3';

// eslint-disable-next-line import/first
import { highlight, listLanguages, supportsLanguage } from '~/index.js';

function testLanguage(language: string, code: string): void {
	it(`should color ${language} correctly`, () => {
		const highlighted = highlight(code);

		if (process.env.OUTPUT_CODE_SAMPLES) {
			console.log(language + ':\n\n' + highlighted);
		}

		expect(highlighted).toMatchSnapshot();
	});
}

const fixturesPath = join(import.meta.url, '../fixtures');
describe('highlight()', () => {
	const fixtures = fs.readdirSync(fixturesPath);

	for (const fixture of fixtures) {
		const fixturePath = path.join(fixturesPath, fixture);

		if (fs.statSync(fixturePath).isFile()) {
			const [language] = fixture.split('.');

			if (language === undefined) {
				throw new Error(`Unable to determine language from fixture ${fixture}`);
			}

			testLanguage(language, fs.readFileSync(fixturePath, 'utf8'));
		}
	}
});

describe('listLanguages()', () => {
	it('should list the supported languages', () => {
		const languages = listLanguages();
		expect(languages).toBeInstanceOf(Array);
		expect(languages.length).toBeGreaterThan(0);
	});
});

describe('supportsLanguage()', () => {
	it('should return true if the language is supported', () => {
		const supports = supportsLanguage('json');
		expect(supports).toBe(true);
	});
	it('should return false if the language is not supported', () => {
		const supports = supportsLanguage('notsupported');
		expect(supports).toBe(false);
	});
});
