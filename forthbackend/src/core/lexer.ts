import { Token } from "./token";
import { TokenType } from "./token-type";

export class Lexer {
	inputText: string;

	constructor(inputText: string) {
		this.inputText = inputText;
	}

	isNumber(char: string): boolean {
		return !isNaN(parseFloat(char)) && isFinite(Number(char));
	}

	isChar(char: string): boolean {
		return /^[a-z]$/i.test(char);
	}

	createToken(type: TokenType, value: string, start_pos: number): Token {
		return new Token(type, value, start_pos);
	}

	collectWord(
		start_pos: number,
		text: string,
		condition: (char: string) => boolean,
	): [string, number] {
		let curr_word = text[start_pos];
		let i = start_pos;
		while (condition(text[i + 1])) {
			curr_word += text[i + 1];
			i++;
		}
		const end_pos = i;
		return [curr_word, end_pos];
	}

	lex(): Token[] {
		const tokenList: Token[] = [];
		const text = this.inputText;

		let i = 0;
		let curr_word: string;

		while (i < text.length) {
			const start_pos = i;
			const curr_char = text[i];

			if (this.isNumber(curr_char)) {
				[curr_word, i] = this.collectWord(i, text, this.isNumber);
				tokenList.push(this.createToken(TokenType.NUM, curr_word, start_pos));
				i++;
			} else if (["+", "-", "*", "/"].includes(curr_char)) {
				const type =
					curr_char === "+"
						? TokenType.PLUS
						: curr_char === "-"
						? TokenType.MINUS
						: curr_char === "*"
						? TokenType.MULTIPLY
						: curr_char === "/"
						? TokenType.DIVIDE
						: null;
				if (type !== null) {
					tokenList.push(this.createToken(type, curr_char, start_pos));
				}
				i++;
			} else if ([":", ";"].includes(curr_char)) {
				const type =
					curr_char === ":"
						? TokenType.START_OF_DEFINITION
						: TokenType.END_OF_DEFINITION;
				tokenList.push(this.createToken(type, curr_char, start_pos));
				i++;
			} else if (this.isChar(curr_char)) {
				[curr_word, i] = this.collectWord(i, text, this.isChar);
				const knownWords = ["dup", "swap", "over", "rot", "drop"];
				if (knownWords.includes(curr_word)) {
					tokenList.push(
						this.createToken(TokenType.WORD, curr_word, start_pos),
					);
					i++;
				} else {
					tokenList.push(
						this.createToken(TokenType.WORD, curr_word, start_pos),
					);
					i++;
				}
				curr_word = "";
			} else if (["[", "]", " ", ","].includes(curr_char)) {
				i++;
			} else {
				throw new Error(`Unknown character at position ${i}: ${curr_char}`);
			}
		}

		tokenList.push(this.createToken(TokenType.EOF, "", this.inputText.length));
		return tokenList;
	}

	static toTokenStream(expression: string): Token[] {
		const lexer = new Lexer(expression);
		return lexer.lex();
	}
}
