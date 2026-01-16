import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import {UsersPage} from "../../pages/users/UsersPage.tsx";

import {LoginPage} from "@/pages/auth/login/LoginPage.tsx";
import s from "./App.module.css";
import {RegisterPage} from "@/pages/auth/register/RegisterPage.tsx";
import {LogoutPage} from "@/pages/auth/logout/LogoutPage.tsx";
import {Header} from "@/widgets/header/ui/Header.tsx";
import {ProfilePage} from "@/pages/userProfile/ProfilePage.tsx";

export function AppRouter() {
    return (
        <BrowserRouter>
            <div className={s.container}>
                <Header />

                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/users" element={<UsersPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/logout" element={<LogoutPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Routes>


            </div>
        </BrowserRouter>
    );
}
