import { Router, Request, Response } from "express";
import forthServices from "../services/forth-services";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	const prog = req.body.prog;
	try {
		forthServices.validateArray([prog]);
		const stack = await forthServices.evaluate([prog]);
		res.json(stack);
	} catch (error) {
		const message = forthServices.handleError(error);
		res.status(500).json({ error: message });
	}
});

export default router;
