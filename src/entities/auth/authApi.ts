import { baseApi } from "@/shared/api/baseApi.ts";
import type { PublicUser } from "@/entities/user/userTypes.ts";
import type { TokenPair, RegisterRequest, LoginRequest, RefreshRequest } from "./authTypes.ts";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<PublicUser, RegisterRequest>({
            query: (body) => ({
                url: "/api/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),

        login: build.mutation<TokenPair, LoginRequest>({
            query: (body) => ({
                url: "/api/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "User", id: "ME" }],
        }),

        refresh: build.mutation<TokenPair, RefreshRequest | void>({
            query: (body) => ({
                url: "/api/auth/refresh",
                method: "POST",
                body: body ?? undefined,
            }),
            invalidatesTags: [{ type: "User", id: "ME" }],
        }),

        logout: build.mutation<{ success: boolean }, void>({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST",
            }),
            invalidatesTags: [{ type: "User", id: "ME" }],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
} = authApi;
