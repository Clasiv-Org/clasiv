import axios from "axios";
import Config from "react-native-config";
import { useAuthStore } from "@/store/auth";

const BACKEND_ENDPOINT = Config.BACKEND_ENDPOINT;
if (!BACKEND_ENDPOINT) throw new Error("BACKEND_ENDPOINT is not defined");

const api = axios.create({
	baseURL: BACKEND_ENDPOINT,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const accessToken = useAuthStore.getState().accessToken;
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

export default api;
