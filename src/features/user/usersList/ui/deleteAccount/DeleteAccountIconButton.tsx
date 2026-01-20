import {useState} from "react";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {useSnackbar} from "@ozen-ui/kit/Snackbar";
import {Dialog} from "@ozen-ui/kit/DialogNext";
import {DialogBody, DialogFooter, DialogHeader, DialogTitle} from "@ozen-ui/kit/DialogNext";
import {useDeleteUserByIdMutation} from "@/entities/user/userApi";
import {useLogout} from "@/features/auth/logout/model/useLogout";
import {IconButton} from "@ozen-ui/kit/IconButtonNext";
import {DeleteIcon} from "@ozen-ui/icons";

type Props = {
    userId: number;
    targetUserId: number;
    targetUserEmail: string;
};

export function DeleteAccountIconButton({userId , targetUserId , targetUserEmail}: Props) {


    const {pushMessage} = useSnackbar();
    const [deleteUser, {isLoading}] = useDeleteUserByIdMutation();
    const {onLogout} = useLogout({});

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(targetUserId).unwrap();
            pushMessage({
                title: "Успех",
                description: `Пользователь ${targetUserEmail} был удалён`,
                status: "success",
            });
            if (userId === targetUserId) {
                await onLogout();
            }

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
            <IconButton
                size="2xs"
                variant="function"
                icon={DeleteIcon}
                color="error"
                aria-label="Удалить"
                onClick={() => setDialogOpen(true)}
            />

            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} size="s" variant="small">
                <DialogHeader>
                    <DialogTitle>Удаление пользоваетеля {targetUserEmail}</DialogTitle>
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
