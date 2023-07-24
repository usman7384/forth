/** @format */
import { Stack } from "./stack";
import { ASTNode } from "./astNode";
import { TokenType } from "./token-type";
import { CustomWords } from "./customWords";

export class Evaluator {
	private _stack: Stack;
	constructor() {
		this._stack = new Stack();
	}

	public evaluate(astStream: ASTNode[]) {
		for (let i = 0; i < astStream.length; i++) {
			if (astStream[i].type === TokenType.NUM) {
				this._stack.push(+astStream[i].value);
			} else if (astStream[i].type === TokenType.PLUS) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				this._stack.push(first + second);
			} else if (astStream[i].type === TokenType.MINUS) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				this._stack.push(second - first);
			} else if (astStream[i].type === TokenType.MULTIPLY) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				this._stack.push(first * second);
			} else if (astStream[i].type === TokenType.DIVIDE) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				if (first === 0) {
					throw new Error("Cannot divide by zero");
				}
				this._stack.push(second / first);
			} else if (astStream[i].type === TokenType.WORD) {
				if (astStream[i].value === TokenType.DROP) {
					if (this._stack.size() === 0) {
						throw new Error("Stack is empty");
					}
					this._stack.pop();
				} else if (astStream[i].value === TokenType.DUP) {
					const first = this._stack.pop() as number;
					this._stack.push(first);
					this._stack.push(first);
				} else if (astStream[i].value === TokenType.SWAP) {
					const first = this._stack.pop() as number;
					const second = this._stack.pop() as number;
					this._stack.push(first);
					this._stack.push(second);
				} else if (astStream[i].value === TokenType.OVER) {
					const first = this._stack.pop() as number;
					const second = this._stack.pop() as number;
					this._stack.push(second);
					this._stack.push(first);
					this._stack.push(second);
				}
			}
		}
		return this._stack.storage;
	}

	get stack() {
		return this._stack;
	}
}
