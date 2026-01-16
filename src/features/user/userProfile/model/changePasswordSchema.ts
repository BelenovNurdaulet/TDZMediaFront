import { z } from "zod";

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(1, { message: "Введите текущий пароль" }),
        newPassword: z.string().min(6, { message: "Минимум 6 символов" }),
        newPasswordRepeat: z.string().min(1, { message: "Повторите новый пароль" }),
    })
    .refine((v) => v.newPassword === v.newPasswordRepeat, {
        path: ["newPasswordRepeat"],
        message: "Пароли не совпадают",
    });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
