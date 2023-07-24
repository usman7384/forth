type ErrorName = "Empty Definition" | "Parsing Error" | "Redefining Numbers";

export class InterpreterError extends Error {
	name: ErrorName;
	message: string;

	constructor({ name, message }: { name: ErrorName; message: string }) {
		super();
		this.name = name;
		this.message = message;
	}
}
