import {Container} from "@ozen-ui/kit/Container";
import {Card} from "@ozen-ui/kit/Card";
import {Input} from "@ozen-ui/kit/Input";
import {Loader} from "@ozen-ui/kit/Loader";
import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {Button} from "@ozen-ui/kit/ButtonNext";

import {useGetMeQuery} from "@/entities/user/userApi";
import {useLogout} from "@/features/auth/logout/model/useLogout";


import s from "./ProfilePage.module.css";
import {DeleteAccountButton} from "@/features/user/userProfile/ui/deleteAccount/DeleteAccountButton.tsx";
import {ResetPasswordButton} from "@/features/user/userProfile/ui/resetPassword/ResetPasswordButton.tsx";
import {ChangePasswordForm} from "@/features/user/userProfile/ui/changePassword/ChangePasswordForm.tsx";
import {UpdateProfileForm} from "@/features/user/userProfile/ui/updateProfileForm/UpdateProfileForm.tsx";
import {SectionMessage} from "@ozen-ui/kit/SectionMessage";

export function ProfilePage() {
    const {data: me, isLoading, isFetching, error} = useGetMeQuery();
    const {onLogout} = useLogout({});

    if (isLoading || isFetching) return <Loader/>;

    if (!me) {
        return (
            <Container className={s.container} position="center">
                <Typography variant="heading-xl">Профиль</Typography>
                <Typography color="secondary">Вы не авторизованы</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className={s.container} position="center">
                <Typography variant="heading-xl">Профиль</Typography>
                <Typography color="error">Ошибка загрузки</Typography>
            </Container>
        );
    }

    return (
        <Container className={s.container} position="center">
            <Stack direction="column" gap="m" fullWidth>
                <Stack direction="row" justify="spaceBetween" align="center">
                    <Typography variant="heading-xl">Профиль</Typography>
                    <Button onClick={onLogout}>Выйти</Button>
                </Stack>

                <Card size="s" borderWidth="none" style={{padding: 16}}>
                    <Stack gap="m">
                        <Input label="Имя" value={me.firstName} disabled fullWidth/>
                        <Input label="Фамилия" value={me.lastName ?? ""} disabled fullWidth/>
                        <Input label="Отчество" value={me.surName ?? ""} disabled fullWidth/>
                        <Input label="Email" value={me.email} disabled fullWidth/>
                        <Input label="Role" value={me.role} disabled fullWidth/>
                        <Input label="Skills" value={me.skills.join(", ")} disabled fullWidth/>
                    </Stack>
                </Card>
                <Card size="s" borderWidth="none" className={s.card}>
                    <UpdateProfileForm me={me} canEditRole={true}/>
                </Card>

                <Typography variant="heading-l">Сменить пароль</Typography>
                <ChangePasswordForm/>

                <Typography variant="heading-l">Действия</Typography>
                <Card borderWidth="none" size="s" style={{width:'50%'}} >
                    <Stack direction="column" gap="m" fullWidth >
                    <Stack direction="row" gap="m" wrap>
                        <ResetPasswordButton userId={me.id}/>
                        <DeleteAccountButton userId={me.id}/>
                    </Stack>
                    <SectionMessage size="s">
                        После удаления профиля восстановление будет невозможно.
                    </SectionMessage>
                    </Stack>
                </Card>
            </Stack>
        </Container>
    );
}
