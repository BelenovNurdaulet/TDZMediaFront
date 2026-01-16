import { z } from "zod";

const roleSchema = z.enum(["USER", "ADMIN"]).optional();

const idsSchema = z
    .string()
    .trim()
    .optional()
    .refine(
        (v) => !v || /^(\d+)(\s*,\s*\d+)*$/.test(v),
        { message: "IDs должны быть в формате 1,2,3" }
    );

const dateSchema = z
    .string()
    .trim()
    .optional()
    .refine(
        (v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v),
        { message: "Дата должна быть в формате YYYY-MM-DD" }
    );

export const userListFilterSchema = z.object({
    q: z.string().trim().optional(),
    role: roleSchema,
    ids: idsSchema,

    createdFrom: dateSchema,
    createdTo: dateSchema,

    updatedFrom: dateSchema,
    updatedTo: dateSchema,
});

export type UserListFilterValues = z.infer<typeof userListFilterSchema>;
