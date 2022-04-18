/**
	Possible styles that can be used on a token in a JSON theme.
	See the [chalk](https://github.com/chalk/chalk) module for more information.
	`plain` means no styling.
*/
export type Style =
	| 'reset'
	| 'bold'
	| 'dim'
	| 'italic'
	| 'underline'
	| 'inverse'
	| 'hidden'
	| 'strikethrough'
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'gray'
	| 'bgBlack'
	| 'bgRed'
	| 'bgGreen'
	| 'bgYellow'
	| 'bgBlue'
	| 'bgMagenta'
	| 'bgCyan'
	| 'plain';

export type Styler = (codePart: string) => string;
