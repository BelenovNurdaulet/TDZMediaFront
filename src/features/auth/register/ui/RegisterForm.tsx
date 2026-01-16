import {Input} from "@ozen-ui/kit/Input";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {IconButton} from "@ozen-ui/kit/IconButtonNext";
import {EyeOffIcon, EyeOnIcon} from "@ozen-ui/icons";

import { useState } from 'react';
import {SectionMessage} from "@ozen-ui/kit/SectionMessage";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@ozen-ui/kit/Accordion';
import {useRegister} from "@/features/auth/register/model/useRegister";
import {Grid, GridItem} from "@ozen-ui/kit/Grid";
import s from "./RegisterForm.module.css"
import {Link} from "@ozen-ui/kit/Link";
import  { Link as RouterLink } from "react-router-dom";
import {Autocomplete} from "@ozen-ui/kit/AutocompleteNext";
import {Tag} from "@ozen-ui/kit/TagNext";

type Props = {
    onSuccess?: () => void;
};

export function RegisterForm({onSuccess}: Props) {
    const {
        type,
        viewPassword,
        register,
        handleSubmit,
        errors,
        onSubmit,
        onInvalid,
        isLoading,

        error,
    } = useRegister({onSuccess});
    const [skills, setSkills] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const errorText =
        error && typeof error === "object" && "status" in error
            ? `Ошибка регистрации (${String(error.status)})`
            : "Ошибка регистрации";

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <Stack direction="column" gap="l" fullWidth align="center">
                <Stack fullWidth>
                    <Typography variant="heading-2xl" align="left">Создание учетной записи</Typography>
                </Stack>


                <Input
                    size="s"
                    label="Имя"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    hint={errors.firstName ? errors.firstName.message : null}
                    fullWidth
                    required
                />

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
                <Accordion size="s" variant="round" compressed>
                    <AccordionSummary>Дополнительные параметры</AccordionSummary>
                    <AccordionDetails className={s.AccordionDetails}>
                        <Grid cols={2} gap={'l'}>
                            <GridItem col={1}>
                                <Input
                                    size="s"
                                    label="Фамилия"
                                    {...register("lastName")}
                                    error={!!errors.lastName}
                                    hint={errors.lastName ? errors.lastName.message : null}
                                    fullWidth
                                />
                            </GridItem>
                            <GridItem col={1}>
                                <Input
                                    size="s"
                                    label="Отчество"
                                    {...register("surName")}
                                    error={!!errors.surName}
                                    hint={errors.surName ? errors.surName.message : null}
                                    fullWidth
                                />
                            </GridItem>
                            <GridItem col={2}>
                                <Autocomplete
                                    limitTags={3}
                                    searchFunction={(skills) => skills}
                                    disableClearButton
                                    disableShowChevron
                                    renderTag={(props) => {
                                        const { key: tagKey, ...rest } = props;
                                        return (
                                            <Tag
                                                {...rest}
                                                key={tagKey}
                                                size="s"
                                            />
                                        );
                                    }}
                                    size='s'
                                    label="Навыки"
                                    noOptionsText="Укажите навыки через запятую"
                                    allowCustomValue
                                    multiple
                                    options={skills}
                                    value={skills}
                                    inputValue={inputValue}
                                    onChange={(_, newValue = []) => {
                                        if(newValue){
                                        const filtered = Array.from(new Set(newValue.filter(Boolean)));
                                        setSkills(filtered);
                                        }
                                    }}
                                    onInputChange={(_, value: string) => {
                                        if (value.endsWith(',')) {
                                            const newSkill = value.slice(0, -1).trim();
                                            if (newSkill && !skills.includes(newSkill)) {
                                                setSkills((prev) => [...prev, newSkill]);
                                            }
                                            setInputValue("");
                                        } else {
                                            setInputValue(value);
                                        }
                                    }}
                                    fullWidth
                                />
                            </GridItem>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                {error ? <Typography color="error">{errorText}</Typography> : null}
                <Button type="submit" loading={isLoading} fullWidth size="s">
                    Зарегистрироваться
                </Button>

                <Link to={"/login"} as={RouterLink}>У меня уже есть учетная запись</Link>

                <SectionMessage size="s">
                    После успешной регистрации вы перейдёте в окно авторизации.
                </SectionMessage>
            </Stack>
        </form>
    );
}
