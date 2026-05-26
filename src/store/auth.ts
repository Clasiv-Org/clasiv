import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthStore } from "@/types/store";
import { login } from "@/api/auth/login";
import { authStorage } from "@/storage/auth";
import { activationInitiate } from "@/api/auth/activationInitiate";
import { ActivationUser } from "@/types/users";
import { activationEmailRequestOtp } from "@/api/auth/activationEmailRequestOtp";
import { activationEmailVerifyOtp } from "@/api/auth/activationEmailVerifyOtp";
import { activationComplete } from "@/api/auth/activationComplete";
import { parseError } from "@/utils/error";

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			activationUser: null,
			accessToken: null,
			activationSessionId: null,
			loading: false,
            message: null,
			statusCode: null,
            error: null,

			setUser: (user) => set({ user }),
			setAccessToken: (token) => set({ accessToken: token }),
			setLoading: (loading) => set({ loading }),

			login: async (data) => {
                set({ loading: true });
				try {
					const response = await login(data);
					set({ 
						user: response.user, 
						accessToken: response.tokens.accessToken, 
						message: response.message,
						statusCode: response.statusCode
					});
				} catch (error) {
                    set(parseError(error));
				} finally {
                    set({ loading: false });
				}
			},
			activationInitiate: async (data) => {
				set({ loading: true, statusCode: null, message: null, error: null,});
				try {
					const response = await activationInitiate(data);
					console.log("from store: ",response);
					set ({
                        activationUser: response.user !== null 
							? {...response.user, password: null}
                            : null,
                        activationSessionId: response.activationSessionId ?? null,
						message: response.message,
                        statusCode: response.statusCode
					});
				} catch (error) {
					set(parseError(error));
				} finally {
					console.log(useAuthStore.getState().message);
					set({ loading: false });
				}
			},
			activationEmailRequestOtp: async (data) => {
				set({ loading: true, statusCode: null, message: null, error: null,});
				set((state) => ({
					activationUser: {
						...state.activationUser,
						userName: data.userName,
						emailId: data.emailId,
						phoneNo: data.phoneNo,
					} as ActivationUser,
				}));
				console.log(useAuthStore.getState().activationUser);
				try {
					const activationSessionId = useAuthStore.getState().activationSessionId!;
					console.log(activationSessionId);
					const response = await activationEmailRequestOtp({
                        activationSessionId,
                        emailId: data.emailId,
					});
					console.log(response);
                    set({
                        message: response.message,
						statusCode: response.statusCode
                    });
				} catch (error) {
					set(parseError(error));
				} finally {
                    set({ loading: false });
				}
			},
			activationEmailVerifyOtp: async (otp) => {
				set({ loading: true, statusCode: null, message: null, error: null,});
                try {
					const activationSessionId = useAuthStore.getState().activationSessionId!;
                    const response = await activationEmailVerifyOtp({
                        activationSessionId,
                        otp
					});

                    set({
                        message: response.message,
                        statusCode: response.statusCode
                    });
                } catch (error) {
                    set(parseError(error));
                } finally {
                    set({ loading: false });
                }
            },
            activationComplete: async (password) => {
				set({ loading: true, statusCode: null, message: null, error: null,});
				set((state) => ({
					activationUser: {
						...state.activationUser,
						password: password,
					} as ActivationUser,
				}));
                try {
					const { activationSessionId, activationUser } = useAuthStore.getState();
					const { userName, emailId, phoneNo, password } = activationUser!;

                    const response = await activationComplete({
                        activationSessionId: activationSessionId!,
                        userName: userName!,
                        emailId: emailId!,
                        phoneNo: phoneNo!,
                        password: password!
					});

					set({ 
						user: response.user, 
						accessToken: response.tokens.accessToken, 
						activationUser: null,
                        activationSessionId: null
					});
                } catch (error) {
                    set(parseError(error));
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
