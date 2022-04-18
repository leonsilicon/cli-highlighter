import type { Theme } from '~/types/theme.js';

/**
	Options passed to [[highlight]]
*/
export interface HighlightOptions {
	/**
		Can be a name, file extension, alias etc. If omitted, tries to auto-detect language.
	*/
	language?: string;

	/**
		When present and evaluates to a true value, forces highlighting to finish even in case of
		detecting illegal syntax for the language instead of throwing an exception.
	*/
	ignoreIllegals?: boolean;

	/**
		Optional array of language names and aliases restricting detection to only those languages.
	*/
	languageSubset?: string[];

	/**
		Supply a custom theme where you override language tokens with own formatter functions. Every
		token that is not overriden falls back to the [[DEFAULT_THEME]]
	*/
	theme?: Theme;
}
