export type { HighlightOptions } from './types/highlight.js';
export type { Style } from './types/style.js';
export type { JsonTheme, Theme } from './types/theme.js';
export type { Tokens } from './types/tokens.js';
export {
	highlight,
	listLanguages,
	supportsLanguage,
} from './utils/highlight.js';
export { highlight as default } from './utils/highlight.js';
export { DEFAULT_THEME, fromJson, plain } from './utils/theme.js';
