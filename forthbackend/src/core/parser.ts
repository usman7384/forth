/** @format */
import { TokenType } from "./token-type";
import { Token } from "./token";
import { ASTNode } from "./astNode";
import { InterpreterError } from "./error";

export class Parser {
	private _tokens: Token[];
	private _current_token: Token;
	private _current_index: number;

	private _words: Map<string, string>;

	constructor(tokens: Token[], words: Map<string, string>) {
		this._tokens = tokens;
		this._current_index = 0;
		this._current_token = this._tokens[this._current_index];
		this._words = words;
	}

	static toAstNodeStream(
		tokens: Token[],
		words: Map<string, string>,
	): ASTNode[] {
		const parser = new Parser(tokens, words);
		return parser.parse();
	}

	private _advance() {
		this._current_index += 1;
		if (
			this._current_index === this._tokens.length &&
			this._tokens[this._current_index].type !== TokenType.EOF
		) {
			this._error();
		}
		this._current_token = this._tokens[this._current_index];
	}

	private _error(text?: string) {
		if (text) {
			throw new Error(text);
		}
		throw new Error("Parsing error");
	}

	private is_numeric(str: string) {
		return /^\d+$/.test(str);
	}

	parse() {
		const astStream: ASTNode[] = [];
		while (this._current_token.type !== TokenType.EOF) {
			if (this._current_token.type === TokenType.START_OF_DEFINITION) {
				this._advance();
				if (
					(this._tokens[this._current_index].type as TokenType) ===
					TokenType.END_OF_DEFINITION
				) {
					throw new InterpreterError({
						name: "Empty Definition",
						message: "Empty Definition",
					});
				}
				const name = this._current_token.text as string;

				if (this.is_numeric(name)) {
					throw new InterpreterError({
						name: "Redefining Numbers",
						message: "Cannot Redefine Numbers",
					});
				}

				let definition = "";
				this._advance();
				while (
					(this._current_token.type as TokenType) !==
					TokenType.END_OF_DEFINITION
				) {
					if ((this._current_token.type as TokenType) === TokenType.EOF) {
						this._error();
					}
					definition += `${this._current_token.text} `;
					this._advance();
				}

				const defWords = definition.trim().split(" ");
				defWords.forEach((word) => {
					if (this._words.has(word)) {
						const replacedWord = this._words.get(word) as string;
						definition = definition.replace(word, replacedWord.trim());
					}
				});

				if (this._words.has(name)) {
					this._words.set(name, definition);
				} else {
					defWords.forEach((word) => {
						if (this._words.has(word)) {
							const replacedWord = this._words.get(word) as string;
							definition = definition.replace(word, replacedWord);
						}
					});
					this._words.set(name, definition);
				}
				this._advance();
			} else if (this._current_token.type === TokenType.WORD) {
				const word = this._current_token.text as string;
				if (this._words.has(word)) {
					const splitWords = this._words.get(word);
					const definition = splitWords?.trim().split(" ");
					if (definition !== undefined) {
						definition.forEach((word) => {
							if (!Number.isNaN(Number(word))) {
								astStream.push(new ASTNode(word, TokenType.NUM));
							} else if (
								word === "+" ||
								word === "-" ||
								word === "*" ||
								word === "/"
							) {
								const type =
									word === "+"
										? TokenType.PLUS
										: word === "-"
										? TokenType.MINUS
										: word === "*"
										? TokenType.MULTIPLY
										: TokenType.DIVIDE;
								astStream.push(new ASTNode(word, type));
							} else {
								astStream.push(new ASTNode(word, TokenType.WORD));
							}
						});
					}
					this._advance();
				} else {
					astStream.push(new ASTNode(word, TokenType.WORD));
					this._advance();
				}
			} else if (Object.values(TokenType).includes(this._current_token.type)) {
				astStream.push(
					new ASTNode(
						this._current_token.text as string,
						this._current_token.type,
					),
				);
				this._advance();
			} else {
				this._error();
			}
		}
		return astStream;
	}
}
