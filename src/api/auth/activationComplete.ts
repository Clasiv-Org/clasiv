import api from "@/config/axios";
import type { 
	ActivationCompletePayload,
    LoginResponse, 
} from "@/types/auth";

export const activationComplete = async (
	data: ActivationCompletePayload
): Promise<LoginResponse> => {
	const response = await api.post(
		"/auth/activation/complete", 
		data,
	);

	return response.data;
};
