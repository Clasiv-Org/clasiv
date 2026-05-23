import { 
	ActivationInitiatePayload, 
	LoginPayload, 
    ActivationForm
} from "@/types/auth";
import { 
    ActivationUser,
	User, 
	UserProfile 
} from "@/types/users";

export type AuthStore = {
	user: UserProfile | null;
	activationUser: ActivationUser | null;
	accessToken: string | null;
	activationSessionId: string | null;
	loading: boolean;
	message: string | null;
	statusCode: number | null;
	error: string | null;

	setUser: (user: UserProfile | null) => void;
	setAccessToken: (token: string | null) => void;
	setLoading: (loading: boolean) => void;

	activationInitiate: (data: ActivationInitiatePayload) => Promise<void>;
	activationEmailRequestOtp: (data: ActivationForm) => Promise<void>;
	activationEmailVerifyOtp: (otp: string) => Promise<void>;
	activationComplete: (password: string) => Promise<void>;
	login: (data: LoginPayload) => Promise<void>;
	clear: () => void;
};
