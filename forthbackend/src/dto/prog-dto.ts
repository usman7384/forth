import { z } from "zod";

export const stringArraySchema = z.array(z.string()).nonempty();
