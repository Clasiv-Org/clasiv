import { LoginPayload } from "@/types/auth";
import { UserProfile } from "@/types/users";

export type AuthStore = {
	user: UserProfile | null;
	accessToken: string | null;
	loading: boolean;
	error: string | null;
	message: string | null;
	setUser: (user: UserProfile | null) => void;
	setAccessToken: (token: string | null) => void;
	setLoading: (loading: boolean) => void;
	login: (data: LoginPayload) => Promise<void>;
	clear: () => void;
};
