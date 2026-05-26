import { create } from "zustand";
import { ToastStore } from "@/types/store";

export const useToastStore = create<ToastStore>((set) => ({
	visible: false,
	title: null,
	message: null,
	type: "information",
	duration: 2000,
	position: "bottom",

	show: ({ 
		title = null, 
		message = null, 
		type = "information", 
		duration = 2000, 
		position = "bottom" 
	}) => set({
		visible: true,
		title,
		message,
		type,
		duration,
		position,
	}),
	hide: () => set({ visible: false, message: null, title: null }),
}));
