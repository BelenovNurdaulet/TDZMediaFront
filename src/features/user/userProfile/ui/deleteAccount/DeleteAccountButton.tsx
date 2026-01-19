import {useState} from "react";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {useSnackbar} from "@ozen-ui/kit/Snackbar";
import {Dialog} from "@ozen-ui/kit/DialogNext";
import {DialogBody, DialogFooter, DialogHeader, DialogTitle} from "@ozen-ui/kit/DialogNext";
import {useDeleteUserByIdMutation} from "@/entities/user/userApi";
import {useLogout} from "@/features/auth/logout/model/useLogout";

type Props = {
    userId: number;
};

export function DeleteAccountButton({userId}: Props) {
    const {pushMessage} = useSnackbar();
    const [deleteUser, {isLoading}] = useDeleteUserByIdMutation();
    const {onLogout} = useLogout({});

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            await onLogout();
            await deleteUser(userId).unwrap();
            pushMessage({
                title: "Успех",
                description: "Аккаунт удалён",
                status: "success",
            });

        } catch (error: any) {
            pushMessage({
                title: "Ошибка",
                description: "Не удалось удалить аккаунт",
                status: "error",
            });
        } finally {
            setDialogOpen(false);
        }
    };

    return (
        <>
            <Button
                size="s"
                color="error"
                onClick={() => setDialogOpen(true)}
                loading={isLoading}
                disabled={isLoading}
                variant="function"
            >
                Удалить профиль
            </Button>

            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} size="s" variant="small">
                <DialogHeader>
                    <DialogTitle>Удаление профиля</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    После удаления профиля восстановление будет невозможно
                </DialogBody>
                <DialogFooter>
                    <Button size="s" variant="ghost" color='secondary' onClick={() => setDialogOpen(false)}>
                        Отмена
                    </Button>
                    <Button
                        size="s"
                        color="error"
                        onClick={handleConfirmDelete}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Удалить
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
