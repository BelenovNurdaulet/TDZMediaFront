import {baseApi} from "@/shared/api/baseApi.ts";
import type {PublicUser, UpdateUserRequest, UsersListQuery, UsersListResponse} from "@/entities/user/userTypes.ts";

export const userApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        getUsers: build.query<UsersListResponse, UsersListQuery | void>({
            query: (params) => ({
                url: '/api/users',
                params: params ?? undefined,
            }),
            providesTags: (result) =>
                result
                    ? [
                        {type: "User" as const, id: "LIST"},
                        ...result.items.map((u) => ({type: "User" as const, id: u.id})),
                    ]
                    : [{type: "User" as const, id: "LIST"}],
        }),

        getMe: build.query<PublicUser, void>({
            query: () => 'api/users/me',
            providesTags: [{ type: "User", id: "ME" }],
        }),


        getUserById: build.query<PublicUser, number>({
            query: (id) => ({
                url: `/api/users/${id}`
            }),
            providesTags: (_res, _err, arg) => [{ type: "User", id: arg }]
        }),

        updateUserById: build.mutation<PublicUser, { id: number; data: UpdateUserRequest }>({
            query: ({id, data}) => ({
                url: `/api/users/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: [
                { type: "User", id: "LIST" },
                { type: "User", id: "ME" },
            ],
        }),

        deleteUserById: build.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/api/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),

        resetUserPassword: build.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/api/users/${id}/password/reset`,
                method: "PATCH",
            }),
        }),

        changeMyPassword: build.mutation<
            { success: boolean },
            { oldPassword: string; newPassword: string }
        >({
            query: (body) => ({
                url: `/api/users/me/password/change`,
                method: "PATCH",
                body,
            })
        })
    }),
});

export const {
    useGetUsersQuery,
    useGetMeQuery,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
    useDeleteUserByIdMutation,
    useResetUserPasswordMutation,
    useChangeMyPasswordMutation,
} = userApi;
