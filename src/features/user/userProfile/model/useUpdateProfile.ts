import { useSnackbar } from "@ozen-ui/kit/Snackbar";
import { useUpdateUserByIdMutation } from "@/entities/user/userApi";
import type { UpdateProfileFormValues } from "./updateProfileSchema";

type Params = {
    userId: number;
    onSuccess?: () => void;
};

export function useUpdateProfile({ userId, onSuccess }: Params) {
    const { pushMessage } = useSnackbar();
    const [updateUser, { isLoading }] = useUpdateUserByIdMutation();

    const submit = async (values: UpdateProfileFormValues) => {
          try {
            const data = {
                firstName: values.firstName.trim(),
                lastName: values.lastName?.trim() || null,
                surName: values.surName?.trim() || null,
                email: values.email.trim(),
                skills: values.skills,
                role: values.role,
            };

            await updateUser({ id: userId, data }).unwrap();

            pushMessage({
                title: "Успех",
                description: "Профиль обновлён",
                status: "success",
            });

            onSuccess?.();
        } catch (error: any) {
            pushMessage({
                title: "Ошибка",
                description: String(error?.data?.error?.message ?? "Не удалось обновить профиль"),
                status: "error",
            });
        }
    };

    return { submit, isLoading };
}
