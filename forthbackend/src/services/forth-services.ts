import { ZodError } from "zod";
import {
	Evaluator,
	Lexer,
	Parser,
	CustomWords,
	InterpreterError,
} from "../core";
import { stringArraySchema } from "../dto/prog-dto";

const engine = new Evaluator();
const wordsDict = new CustomWords();

const validateArray = (prog: string[]) => {
	stringArraySchema.parse(prog);
};

const evaluate = (prog: string[]) => {
	for (const expr of prog) {
		const tokStream = Lexer.toTokenStream(expr);
		const nodes = Parser.toAstNodeStream(tokStream, wordsDict.words);
		engine.evaluate(nodes);
	}
	return engine.stack.storage;
};

const handleError = (error: unknown) => {
	if (error instanceof InterpreterError) {
		return error.message;
	} else if (error instanceof ZodError) {
		return "validation error";
	}
};

export default { engine, wordsDict, evaluate, validateArray, handleError };
