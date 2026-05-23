import api from "@/config/axios";
import type { 
	ActivationEmailRequestOtpPayload,  
} from "@/types/auth";
import type { HTTPResponse } from "@/types/http";

export const activationEmailRequestOtp = async (
	data: ActivationEmailRequestOtpPayload
): Promise<HTTPResponse> => {
	const response = await api.post(
		"/auth/activation/otp", 
		data,
	);

	return response.data;
};
