import { Stack } from "@ozen-ui/kit/Stack";
import { Typography } from "@ozen-ui/kit/Typography";
import { Button } from "@ozen-ui/kit/ButtonNext";
import { Link as RouterLink } from "react-router-dom";
import s from "./ForbiddenPage.module.css";

export function ForbiddenPage() {
    return (
        <div className={s.page}>
            <Stack
                align="center"
                justify="center"
                gap="l"
                direction="column"
                className={s.card}
            >
                <Typography variant="heading-3xl" color="error">
                    403
                </Typography>

                <Typography variant="heading-l">
                    Доступ запрещён
                </Typography>

                <Typography
                    variant="text-m"
                    color="secondary"
                    align="center"
                >
                    У вас нет прав для просмотра этой страницы
                </Typography>

                <Button
                    as={RouterLink}
                    to="/login"
                    size="m"
                    variant="contained"
                >
                    Войти
                </Button>
            </Stack>
        </div>
    );
}
