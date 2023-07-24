import { Evaluator, Lexer, Parser, CustomWords } from "./src/core";

// const prog = [": bar 3 ;", ": foo bar dup ;", ": bar bar 1 + ;", "foo bar"];
// const prog = [": swap 3 swap ;", ": foo 1 2 ;", "foo swap"];
const prog = ["1 2 dup", " 2 +"];
// const prog = [": ;"];
const customwords = new CustomWords();
const engine = new Evaluator();

for (const expr of prog) {
	const tokStream = Lexer.toTokenStream(expr);
	console.log(tokStream);
	const nodes = Parser.toAstNodeStream(tokStream, customwords.words);
	engine.evaluate(nodes);
}
console.log(engine.stack.toString());
