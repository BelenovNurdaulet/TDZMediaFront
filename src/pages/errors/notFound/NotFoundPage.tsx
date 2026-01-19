import { Stack } from "@ozen-ui/kit/Stack";
import { Typography } from "@ozen-ui/kit/Typography";
import { Button } from "@ozen-ui/kit/ButtonNext";
import { Link as RouterLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";

export function NotFoundPage() {
    return (
        <div className={s.page}>
            <Stack
                align="center"
                justify="center"
                gap="l"
                className={s.card}
                direction="column"
            >
                <Typography variant="heading-3xl">
                    404
                </Typography>

                <Typography variant="heading-l">
                    Страница не найдена
                </Typography>

                <Typography
                    variant="text-m"
                    color="secondary"
                    align="center"
                >
                    Возможно, страница была удалена или вы ошиблись адресом
                </Typography>

                <Button
                    as={RouterLink}
                    to="/"
                    size="m"
                    variant="function"
                >
                    На главную
                </Button>
            </Stack>
        </div>
    );
}
