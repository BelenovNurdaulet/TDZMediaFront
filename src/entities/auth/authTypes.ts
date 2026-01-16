export type TokenPair = {
    accessToken: string;
    refreshToken: string;
};

export type RegisterRequest = {
    firstName: string;
    lastName?: string | null;
    surName?: string | null;
    email: string;
    password: string;
    skills?: string[];
    role?: string| null;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RefreshRequest = {
    refreshToken: string;
};
