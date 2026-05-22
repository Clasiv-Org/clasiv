import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthStore } from "@/types/store";
import { LoginPayload } from "@/types/auth";
import { login } from "@/api/auth/login";
import { authStorage } from "@/storage/auth";

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			loading: false,
            error: null,
            message: null,
			setUser: (user) => set({ user }),
			setAccessToken: (token) => set({ accessToken: token }),
			setLoading: (loading) => set({ loading }),
			login: async (data: LoginPayload) => {
                set({ loading: true });
				try {
					const response = await login(data);
					set({ 
						user: response.user, 
						accessToken: response.tokens.accessToken, 
					});
				} catch (error) {
					set({ error: (error as Error).message ?? "Something went wrong!" });
				} finally {
                    set({ loading: false });
				}
			},
			clear: () => set({ 
				user: null, 
				accessToken: null, 
				loading: false 
			}),
		}),
		{
			name: "auth-store",
			storage: createJSONStorage(() => authStorage), 
			partialize: (state) => ({                      
				user: state.user,
				accessToken: state.accessToken,
			}),
		}
	)
);

export const useIsLoggedIn = () => useAuthStore((state) => !!state.accessToken);
