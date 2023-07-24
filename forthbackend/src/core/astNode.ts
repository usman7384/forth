/** @format */

export class ASTNode {
	private _value: string;
	private _type: string;

	constructor(value: string, type: string) {
		this._value = value;
		this._type = type;
	}

	get value(): string {
		return this._value;
	}

	get type(): string {
		return this._type;
	}

	set value(value: string) {
		this._value = value;
	}

	set type(type: string) {
		this._type = type;
	}
}
