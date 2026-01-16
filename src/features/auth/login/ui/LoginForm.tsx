import {Input} from "@ozen-ui/kit/Input";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {IconButton} from "@ozen-ui/kit/IconButtonNext";
import {EyeOffIcon, EyeOnIcon} from "@ozen-ui/icons";
import {Link} from "@ozen-ui/kit/Link";
import {SectionMessage} from "@ozen-ui/kit/SectionMessage";
import {useLogin} from "@/features/auth/login/model/useLogin.ts";
import {Link as RouterLink} from "react-router-dom";

type Props = {
    onSuccess?: () => void;
};

export function LoginForm({onSuccess}: Props) {
    const {
        type,

        viewPassword,
        onSubmit,
        onInvalid,

        register,
        handleSubmit,

        errors,
        isLoading,
    } = useLogin({onSuccess});

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <Stack direction="column" gap="l" fullWidth align="center">
                <Typography variant="heading-2xl" align="left">Войдите в приложение</Typography>
                <Input
                    size="s"
                    label="Почта"
                    {...register("email")}
                    error={!!errors.email}
                    hint={errors.email ? errors.email.message : null}
                    fullWidth
                    required
                />

                <Input
                    size="s"
                    label="Пароль"
                    {...register("password")}
                    type={type}
                    error={!!errors.password}
                    hint={errors.password ? errors.password.message : null}
                    fullWidth
                    required
                    renderRight={() => (
                        <IconButton
                            size="s"
                            variant="function"
                            aria-label={type === "password" ? "Показать пароль" : "Скрыть пароль"}
                            icon={type === "password" ? EyeOnIcon : EyeOffIcon}
                            onClick={viewPassword}
                        />
                    )}
                />

                <Button type="submit" loading={isLoading} fullWidth size="s">
                    Войти
                </Button>

                <Link to={"/register"} as={RouterLink}>У меня нет учетной записи</Link>
                <SectionMessage size='s'>
                    Для входа в приложение воспользуйтесь своей почтой
                </SectionMessage>
            </Stack>
        </form>
    );
}
