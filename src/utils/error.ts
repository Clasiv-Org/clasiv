import axios from "axios";

export const parseError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        return {
            message: error.response.data.message ?? "Something went wrong!",
            statusCode: error.response.data.statusCode ?? error.response.status,
        };
    }
    return {
        message: (error as Error).message ?? "Something went wrong!",
        statusCode: null,
    };
};
