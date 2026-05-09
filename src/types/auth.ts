import { z } from "zod";
import { UserProfileSchema } from "@/types/users";

export const LoginSchema = z.object({
    identifier: z.string(),
    password: z.string().min(8, 'Password is required'),
}).transform((data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(data.identifier);

    return {
        emailId: isEmail ? data.identifier : null,
        userName: !isEmail ? data.identifier : null,
        password: data.password,
    };
});

export const LoginResponseSchema = z.object({
    message: z.string(),
	tokens: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
	}),
	user: UserProfileSchema,
});

export type LoginPayload = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
