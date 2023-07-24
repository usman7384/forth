export class CustomWords {
	private _words: Map<string, string>;

	constructor() {
		this._words = new Map<string, string>();
	}

	get words(): Map<string, string> {
		return this._words;
	}

	set words(words: Map<string, string>) {
		this._words = words;
	}
}
