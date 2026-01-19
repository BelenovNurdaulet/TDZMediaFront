
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "@/entities/user/userApi";
import type {ReactElement} from "react";

export function RequireAuth({ children }: { children: ReactElement }) {
    const { data: user, isLoading } = useGetMeQuery();

    if (isLoading) return null;
    if (!user) return <Navigate to="/403" replace />;
    return children;
}
