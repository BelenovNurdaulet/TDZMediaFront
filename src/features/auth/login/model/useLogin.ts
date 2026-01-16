import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useLoginMutation } from "@/entities/auth/authApi";
import { useSnackbar } from "@ozen-ui/kit/Snackbar";

type Params = {
    onSuccess?: () => void;
};

export function useLogin({ onSuccess }: Params) {
    const [type, setType] = useState<"password" | "text">("password");
    const [login, { isLoading }] = useLoginMutation();
    const { pushMessage } = useSnackbar();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const viewPassword = () =>
        setType((prev) => (prev === "password" ? "text" : "password"));

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await login(values).unwrap();
            onSuccess?.();
            pushMessage({
                title: "Успех",
                description: "Вы успешно авторизованы",
                status: "success",
            });
        } catch (error: any) {
            pushMessage({
                title: "Ошибка входа",
                description: String(error?.data?.error?.message ?? "Не удалось войти"),
                status: "error",
            });
        }
    };

    const onInvalid = () => {
        Object.values(errors).forEach((e) => {
            if (e?.message) {
                pushMessage({
                    title: "Ошибка валидации",
                    description: e.message,
                    status: "warning",
                });
            }
        });
    };

    return {
        type,
        viewPassword,

        register,
        handleSubmit,
        errors,

        onSubmit,
        onInvalid,

        isLoading,
    };
}
