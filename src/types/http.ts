import { z } from "zod";

export const HTTPResponseSchema = z.object({
	message: z.string(),
	statusCode: z.number(),
});

export type HTTPResponse = z.infer<typeof HTTPResponseSchema>;
