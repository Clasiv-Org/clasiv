import { create } from "zustand";
import { UserProfile } from "@/types/users";

type AuthStore = {
    user: UserProfile | null;
	accessToken: string | null;
    setUser: (user: UserProfile | null) => void;
    setAccessToken: (accessToken: string | null) => void;
	clear: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set({ user }),
    setAccessToken: (token) => set({ accessToken: token }),
    clear: () => set({ user: null, accessToken: null }),
}))

export const useIsLoggedIn = () => useAuthStore((state) => !!state.accessToken);
