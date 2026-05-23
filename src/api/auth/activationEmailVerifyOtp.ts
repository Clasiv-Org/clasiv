import api from "@/config/axios";
import type { 
	ActivationEmailVerifyOtpPayload,  
} from "@/types/auth";
import type { HTTPResponse } from "@/types/http";

export const activationEmailVerifyOtp = async (
	data: ActivationEmailVerifyOtpPayload
): Promise<HTTPResponse> => {
	const response = await api.post(
		"/auth/activation/otp/verify", 
		data,
	);

	return response.data;
};
