import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1, "Введите имя"),
    lastName: z.string().optional().nullable(),
    surName: z.string().optional().nullable(),
    email: z.string().trim().min(1, { message: "Введите почту" }).pipe(z.email({ message: "Неверный email" })),
    password: z.string().min(6, "Минимум 6 символов"),
    role: z.string().optional().nullable(),
    skillsText: z.string().optional().nullable(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
