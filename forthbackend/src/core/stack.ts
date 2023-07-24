/** @format */

type StackElem = string | number;

export class Stack {
	public storage: StackElem[] = [];

	constructor(private capacity: number = Infinity) {}

	push(item: StackElem): void {
		if (this.size() === this.capacity) {
			throw Error("Stack has reached max capacity, you cannot add more items");
		}

		this.storage.push(item);
	}

	pop(): StackElem | undefined {
		return this.storage.pop();
	}

	peek(): StackElem {
		return this.storage[this.size() - 1];
	}

	size(): number {
		return this.storage.length;
	}

	getElements(): StackElem[] {
		return [...this.storage];
	}

	toString() {
		return `[${this.storage}]`;
	}
}
