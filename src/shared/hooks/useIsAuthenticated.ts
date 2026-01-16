import { useGetMeQuery } from "@/entities/user/userApi";

export function useIsAuthenticated() {
    const { data: user, isLoading, isFetching } = useGetMeQuery();

    return {
        isAuth: !!user,
        user,
        isLoading: isLoading || isFetching,
    };
}
