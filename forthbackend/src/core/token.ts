/** @format */

import { TokenType } from "./token-type";
export class Token {
	type: TokenType;
	text: string | number;
	startPos: number;

	constructor(type: TokenType, text: string | number, startPos: number) {
		this.type = type;
		this.text = text;
		this.startPos = startPos;
	}
}
