import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Header } from "@/widgets/header/ui/Header";
import { UsersPage } from "@/pages/users/UsersPage";
import { ProfilePage } from "@/pages/userProfile/ProfilePage";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { RegisterPage } from "@/pages/auth/register/RegisterPage";
import { LogoutPage } from "@/pages/auth/logout/LogoutPage";


import s from "./App.module.css";
import {RedirectIfAuth} from "@/shared/ui/RedirectIfAuth.tsx";
import {RequireAuth} from "@/shared/ui/RequireAuth.tsx";
import {ForbiddenPage} from "@/pages/errors/forbidden/ForbiddenPage.tsx";
import {NotFoundPage} from "@/pages/errors/notFound/NotFoundPage.tsx";

export function AppRouter() {
    return (
        <BrowserRouter>
            <div className={s.container}>
                <Header />

                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    <Route path="/login" element={
                        <RedirectIfAuth>
                            <LoginPage />
                        </RedirectIfAuth>
                    } />
                    <Route path="/register" element={
                        <RedirectIfAuth>
                            <RegisterPage />
                        </RedirectIfAuth>
                    } />


                    <Route path="/users" element={
                        <RequireAuth>
                            <UsersPage />
                        </RequireAuth>
                    } />
                    <Route path="/profile" element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    } />

                    <Route path="/logout" element={<LogoutPage />} />


                    <Route path="/403" element={<ForbiddenPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
