import { useState } from "react";
import { IconButton } from "@ozen-ui/kit/IconButtonNext";
import { Dialog } from "@ozen-ui/kit/DialogNext";
import {
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@ozen-ui/kit/DialogNext";
import { Button } from "@ozen-ui/kit/ButtonNext";
import { Stack } from "@ozen-ui/kit/Stack";
import { Typography } from "@ozen-ui/kit/Typography";
import { EditIcon } from "@ozen-ui/icons";

import type { PublicUser } from "@/entities/user/userTypes";
import { UpdateProfileForm } from "@/features/user/userProfile/ui/updateProfileForm/UpdateProfileForm";
import { ResetPasswordButton } from "@/features/user/userProfile/ui/resetPassword/ResetPasswordButton";

type Props = {
    user: PublicUser;
    canEditRole?: boolean;
};

export function UpdateUserIconButton({ user, canEditRole = true }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton
                size="2xs"
                variant="function"
                icon={EditIcon}
                color="primary"
                aria-label="Редактировать"
                onClick={() => setOpen(true)}
            />

            <Dialog open={open} onClose={() => setOpen(false)} size="m" variant="medium">
                <DialogHeader>
                    <DialogTitle>Редактирование пользователя {user.email}</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <Stack direction="column" gap="l" fullWidth>

                        <UpdateProfileForm user={user} canEditRole={canEditRole} />

                        <Stack direction="column" gap="m">
                            <Typography>Сбросить пароль</Typography>
                            <ResetPasswordButton userId={user.id} />
                        </Stack>

                    </Stack>
                </DialogBody>

                <DialogFooter>
                    <Button size="s" variant="ghost" color="secondary" onClick={() => setOpen(false)}>
                        Закрыть
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
