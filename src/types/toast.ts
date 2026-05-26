export type ToastType = "success" | "error" | "warning" | "information";
export type ToastPosition = "top" | "bottom";

export type ToastProps = {
    type?: ToastType;
	title?: string;
    message?: string;
    duration?: number;
    position?: ToastPosition;
};
