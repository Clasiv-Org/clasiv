import api from "@/config/axios";
import { 
	ActivationInitiatePayload, 
	ActivationInitiateResponse, 
} from "@/types/auth";

export const activationInitiate = async (
	data: ActivationInitiatePayload
): Promise<ActivationInitiateResponse> => {
	const response = await api.post(
		"/auth/activation/initiate", 
		data,
	);

	return response.data;
};
