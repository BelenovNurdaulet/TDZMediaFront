import {Link as RouterLink, useLocation} from "react-router-dom";
import {Card} from "@ozen-ui/kit/Card";
import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {Divider} from "@ozen-ui/kit/Divider";

import {useGetMeQuery} from "@/entities/user/userApi.ts";
import {useGetInfoQuery} from "@/entities/info/infoApi.ts";
import s from "./Header.module.css";
import {Avatar} from "@ozen-ui/kit/Avatar";

export function Header() {
    const {data: user, isLoading} = useGetMeQuery();
    useGetInfoQuery();

    const location = useLocation();
    const isAuth = !!user;

    const navLinks = [
        {to: "/users", label: "Пользователи"},
        {to: "/profile", label: "Профиль"},
    ];

    return (
        <Card className={s.container} size="s" borderWidth="none">
            <Stack
                direction="row"
                align="center"
                justify="spaceBetween"
                fullWidth
                className={s.content}

            >
                <Stack direction="row" align="center" gap="m" wrap>
                    <RouterLink to="/" style={{textDecoration: "none"}}>
                        <Typography variant="heading-xl" color="primary">
                            UserManager
                        </Typography>
                    </RouterLink>

                    {isAuth && (
                        <Stack direction="row" gap="m" justify='center' align="center"
                               divider={<Divider orientation="vertical" flexItem/>}>
                            {navLinks.map(({to, label}) => (
                                <Button
                                    key={to}
                                    as={RouterLink}
                                    to={to}
                                    size="s"
                                    variant="function"
                                    color={location.pathname === to ? "primary" : "secondary"}
                                >
                                    {label}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Stack>

                <Stack direction="row" align="center" gap="m" style={{paddingRight: '25px'}}
                       divider={<Divider orientation="vertical" flexItem/>}>
                    {isLoading ? (
                        <Typography variant="text-s" color="secondary">Загрузка…</Typography>
                    ) : isAuth ? (
                        <>
                            <Stack direction="row" align="center" gap="m">
                                <Avatar
                                    name={user?.email ?? "Пользователь"}
                                    size="xs"
                                    color="primary"
                                />
                                <Typography variant="text-s">{user?.email}</Typography>

                                <Divider orientation="vertical" size="s" color="secondary"/>

                                <Button as={RouterLink} size='s' color='secondary' variant="function" to="/logout">
                                    Выйти
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <Stack direction="row" gap="l">

                            <Button as={RouterLink} to="/login" size="s" variant="function" color="secondary">
                                Войти
                            </Button>
                            <Button as={RouterLink} to="/register" size="s" variant="function" color="secondary">
                                Регистрация
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Card>
    );
}
