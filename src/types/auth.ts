import { z } from "zod";
import { UserProfileSchema, UserSchema } from "@/types/users";
import { HTTPResponseSchema } from "@/types/http";

const TokenSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export const ActivationFormSchema = z.object({
    userName: z.string(),
    emailId: z.string().email(),
    phoneNo: z.string(),
});

export const ActivationInitiateSchema = z.object({
    userName: z.string(),
    password: z.string().min(8, 'Password is required'),
});

export const ActivationEmailRequestOtpSchema = z.object({
    activationSessionId: z.string(),
    emailId: z.string().email(),
});

export const ActivationEmailVerifyOtpSchema = z.object({
    activationSessionId: z.string(),
	otp: z.string(),
});

export const ActivationCompleteSchema = ActivationFormSchema.extend({
    activationSessionId: z.string(),
});

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

export const ActivateInitiateResponseSchema = HTTPResponseSchema.extend({
    activationSessionId: z.string(),
    user: UserSchema,
});

export const LoginResponseSchema = HTTPResponseSchema.extend({
	tokens: TokenSchema,
	user: UserProfileSchema,
});

export type ActivationForm = z.infer<typeof ActivationFormSchema>;
export type ActivationInitiatePayload = z.infer<typeof ActivationInitiateSchema>;
export type ActivationEmailRequestOtpPayload = z.infer<typeof ActivationEmailRequestOtpSchema>;
export type ActivationEmailVerifyOtpPayload = z.infer<typeof ActivationEmailVerifyOtpSchema>;
export type ActivationCompletePayload = z.infer<typeof ActivationCompleteSchema>;
export type LoginPayload = z.infer<typeof LoginSchema>;

export type ActivationInitiateResponse = z.infer<typeof ActivateInitiateResponseSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
