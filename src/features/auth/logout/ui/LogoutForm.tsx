import {Button} from "@ozen-ui/kit/ButtonNext";
import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {Link} from "@ozen-ui/kit/Link";
import {Link as RouterLink} from "react-router-dom";
import {useLogout} from "@/features/auth/logout/model/useLogout.ts";

type Props = {
    onSuccess?: () => void;
};

export function LogoutForm({onSuccess}: Props) {
    const {
        onLogout
    } = useLogout({onSuccess});

    return (
        <Stack direction="column" gap="l" fullWidth align="center">
            <Typography variant="heading-2xl" align="left">Хотите покинуть приложение ?</Typography>

            <Button type="submit" onClick={onLogout} fullWidth size="s">
                Выйти
            </Button>

            <Link to={"/"} as={RouterLink}>Нет я остаюсь</Link>
        </Stack>
    );
}
