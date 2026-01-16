import {
    type BaseQueryFn,
    type FetchBaseQueryError,
    type FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_API_URL;
const baseQuery = fetchBaseQuery({baseUrl: apiUrl, credentials: 'include'});

const baseQueryReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {

        let result = await baseQuery(args, api, extraOptions);
        if (result.error && result.error.status === 401) {
            const refreshResult = await baseQuery(
                {url: "/api/auth/refresh", method: "POST"},
                api,
                extraOptions
            );
            if (!refreshResult.error) {
                result = await baseQuery(args, api, extraOptions);
            } else {
                await baseQuery(
                    {url: "/api/auth/logout", method: "POST"},
                    api,
                    extraOptions
                );

            }
        }
        return result;
    };

export const baseApi =
    createApi({
        reducerPath: 'api',
        baseQuery: baseQueryReAuth,
        tagTypes: ['User', 'Info'],
        endpoints: () => ({}),
    }
);