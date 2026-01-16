import { useSnackbar } from "@ozen-ui/kit/Snackbar";
import { useUpdateUserByIdMutation } from "@/entities/user/userApi";
import type { RoleCode } from "@/entities/user/userTypes";

type Params = {
    userId: number;
    onSuccess?: () => void;
};

function normalizeSkills(text?: string) {
    const raw = (text ?? "").trim();
    if (!raw) return [];
    return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

export function useUpdateProfile({ userId, onSuccess }: Params) {
    const { pushMessage } = useSnackbar();
    const [updateUser, { isLoading }] = useUpdateUserByIdMutation();

    const submit = async (values: {
        firstName: string;
        lastName?: string | null;
        surName?: string | null;
        email: string;
        skillsText?: string;
        role?: RoleCode;
    }) => {
        try {
            const data: any = {
                firstName: values.firstName.trim(),
                lastName: values.lastName ? values.lastName.trim() : null,
                surName: values.surName ? values.surName.trim() : null,
                email: values.email.trim(),
                skills: normalizeSkills(values.skillsText),
            };

            if (values.role) data.role = values.role;

            await updateUser({ id: userId, data }).unwrap();

            pushMessage({
                title: "Успех",
                description: "Профиль обновлён",
                status: "success",
            });

            onSuccess?.();
            return true;
        } catch (error: any) {
            pushMessage({
                title: "Ошибка",
                description: String(error?.data?.error?.message ?? "Не удалось обновить профиль"),
                status: "error",
            });
            return false;
        }
    };

    return { submit, isLoading };
}
