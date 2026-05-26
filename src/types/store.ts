import type { 
	ActivationInitiatePayload, 
	LoginPayload, 
    ActivationForm
} from "@/types/auth";
import type { 
    ActivationUser,
	User, 
	UserProfile 
} from "@/types/users";
import type { 
	ToastType, 
	ToastProps, 
    ToastPosition
} from "@/types/toast";

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

export type ToastStore = {
	visible: boolean;
	title: string | null;
	message: string | null;
    type: ToastType;
    duration: number;
	position: ToastPosition;

    show: (props: ToastProps) => void;
    hide: () => void;
};
