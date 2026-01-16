import { useSnackbar } from "@ozen-ui/kit/Snackbar";
import { useChangeMyPasswordMutation } from "@/entities/user/userApi";

type Params = {
    onSuccess?: () => void;
};

export function useChangePassword(params?: Params) {
    const { pushMessage } = useSnackbar();
    const [changePassword, { isLoading }] = useChangeMyPasswordMutation();

    const submit = async (data: { oldPassword: string; newPassword: string }) => {
        try {
            await changePassword(data).unwrap();
            pushMessage({
                title: "Успех",
                description: "Пароль изменён",
                status: "success",
            });
            params?.onSuccess?.();
            return true;
        } catch (error: any) {
            pushMessage({
                title: "Ошибка",
                description: String(error?.data?.error?.message ?? "Не удалось изменить пароль"),
                status: "error",
            });
            return false;
        }
    };

    return { submit, isLoading };
}
