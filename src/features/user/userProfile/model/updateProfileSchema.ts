import { z } from "zod";

export const updateProfileSchema = z.object({
    firstName: z.string().trim().min(1, { message: "Введите имя" }),
    lastName: z.string().trim().optional().nullable(),
    surName: z.string().trim().optional().nullable(),
    email: z
        .string()
        .trim()
        .min(1, { message: "Введите почту" })
        .pipe(z.email({ message: "Неверный email" })),

    skills: z.array(z.string()).default([]),

    role: z.enum(["USER", "ADMIN"]).optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
