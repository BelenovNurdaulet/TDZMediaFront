import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterMutation } from "@/entities/auth/authApi";
import { useGetInfoQuery } from "@/entities/info/infoApi";
import { registerSchema, type RegisterFormValues } from "./registerSchema";
import {useSnackbar} from "@ozen-ui/kit/Snackbar";

type Props = {
    onSuccess?: () => void;
};

function parseSkills(skillsText?: string | null): string[] | undefined {
    const text = (skillsText ?? "").trim();
    if (!text) return undefined;

    const items = text
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

    return items.length ? items : undefined;
}

export function useRegister({ onSuccess }: Props) {
    const { pushMessage } = useSnackbar();

    const [type, setType] = useState<"password" | "text">("password");
    const [registerUser, { isLoading: isRegisterLoading, error }] = useRegisterMutation();

    const { data: info, isLoading: isInfoLoading } = useGetInfoQuery();
    const roles = info?.roles ?? [];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: null,
            surName: null,
            email: "",
            password: "",
            role: null,
            skillsText: "",
        },
    });

    const viewPassword = () => setType((prev) => (prev === "password" ? "text" : "password"));

    const onSubmit = async (values: RegisterFormValues) => {
        await registerUser({
            firstName: values.firstName,
            lastName: values.lastName ?? null,
            surName: values.surName ?? null,
            email: values.email,
            password: values.password,
            role: values.role ?? null,
            skills: parseSkills(values.skillsText),
        }).unwrap();

        onSuccess?.();
        pushMessage({
            title: "Успех",
            description: "Вы успешно авторизованы",
            status: "success",
        });
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
        isLoading: isRegisterLoading || isInfoLoading,
        error,
        roles,
        isInfoLoading,
    };
}