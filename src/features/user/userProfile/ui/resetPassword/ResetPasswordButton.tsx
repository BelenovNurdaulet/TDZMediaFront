import { Button } from "@ozen-ui/kit/ButtonNext";
import { useSnackbar } from "@ozen-ui/kit/Snackbar";
import { useResetUserPasswordMutation } from "@/entities/user/userApi";

type Props = {
    userId: number;
};

export function ResetPasswordButton({ userId }: Props) {
    const { pushMessage } = useSnackbar();
    const [resetPassword, { isLoading }] = useResetUserPasswordMutation();

    const onClick = async () => {
        try {
            await resetPassword(userId).unwrap();
            pushMessage({
                title: "Успех",
                description: "Пароль сброшен",
                status: "success",
            });
        } catch (error: any) {
            pushMessage({
                title: "Ошибка",
                description: String(error?.data?.error?.message ?? "Не удалось сбросить пароль"),
                status: "error",
            });
        }
    };

    return (
        <Button color="error" size="s"  onClick={onClick} loading={isLoading} disabled={isLoading}>
            Сбросить пароль
        </Button>
    );
}
