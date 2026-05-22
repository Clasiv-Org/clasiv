import api from "@/config/axios";
import { 
	LoginPayload, 
	LoginResponse 
} from "@/types/auth";

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
	const response = await api.post(
		"/auth/login", 
		data,
	);

	return response.data;
};
