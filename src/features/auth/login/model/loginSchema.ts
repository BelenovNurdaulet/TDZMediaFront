import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().min(1, { message: "Введите почту" }).pipe(z.email({ message: "Неверный email" })),
    password: z.string().min(6, { message: "Пароль должен состоять не менее из 6 символов" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
