import {Link as RouterLink} from "react-router-dom";
import { Card } from "@ozen-ui/kit/Card";
import { Stack } from "@ozen-ui/kit/Stack";
import { Typography } from "@ozen-ui/kit/Typography";
import { Button } from "@ozen-ui/kit/ButtonNext";
import { Divider } from "@ozen-ui/kit/Divider";
import { Link } from "@ozen-ui/kit/Link";
import {useGetMeQuery} from "@/entities/user/userApi.ts";
import s from "./Header.module.css";
import {useGetInfoQuery} from "@/entities/info/infoApi.ts";


export function Header() {
    const { data: user, isLoading } = useGetMeQuery();
    useGetInfoQuery();

    const isAuth = !!user;

    return (
        <Card className={s.container} size="s" borderWidth="none"  style={{ padding: 12}} >
            <Stack direction="row" justify="spaceBetween" align="center" fullWidth gap="l" className={s.content}>
                <Stack direction="row" align="center" gap="m">
                    <RouterLink to="/" style={{ textDecoration: "none" }}>
                        <Typography variant="heading-l">UserManager</Typography>
                    </RouterLink>

                    <Divider orientation="vertical" size="s" color="secondary" />

                    {isAuth ? (
                        <Stack direction="row" gap="m" align="center" justify="spaceBetween" >
                            <Link as={RouterLink} to="/users" style={{ textDecoration: "none" }}>
                                Список пользователей
                            </Link>
                            <Link as={RouterLink} to="/profile" style={{ textDecoration: "none" }}>
                                Профиль
                            </Link>
                        </Stack>
                    ) : null}
                </Stack>


                <Stack direction="row" align="center" gap="m">
                    {isLoading ? (
                        <Typography variant="text-s">Загрузка…</Typography>
                    ) : isAuth ? (
                        <>
                            <Typography variant="text-s">
                                {user?.email}
                            </Typography>

                            <Divider orientation="vertical" size="s" color="secondary" />

                            <Link as={RouterLink} to={'/logout'}>
                                Выйти
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button as={RouterLink} to="/login" size="s" variant="function">
                                Войти
                            </Button>
                            <Button as={RouterLink} to="/register" size="s">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </Card>
    );
}
