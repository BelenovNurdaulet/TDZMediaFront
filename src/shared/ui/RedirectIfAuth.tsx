import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "@/entities/user/userApi.ts";
import type {ReactElement} from "react";

export function RedirectIfAuth({ children }: { children: ReactElement }) {
    const { data: user, isLoading } = useGetMeQuery();

    if (isLoading) return null;
    if (user) return <Navigate to="/users" replace />;
    return children;
}
