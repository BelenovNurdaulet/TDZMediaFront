export type ApiErrorType = {
    error?: {
        message?: string;
        code?: string;
    };
    requestId?: string;
};