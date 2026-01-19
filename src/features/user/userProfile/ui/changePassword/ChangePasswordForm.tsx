import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Input} from "@ozen-ui/kit/Input";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {Stack} from "@ozen-ui/kit/Stack";
import {IconButton} from "@ozen-ui/kit/IconButtonNext";
import {EyeOffIcon, EyeOnIcon} from "@ozen-ui/icons";
import {Grid, GridItem} from "@ozen-ui/kit/Grid";

import {
    type ChangePasswordFormValues,
    changePasswordSchema,
} from "@/features/user/userProfile/model/changePasswordSchema.ts";
import {useChangePassword} from "@/features/user/userProfile/model/useChangePassword.ts";

export function ChangePasswordForm() {
    const [typeOld, setTypeOld] = useState<"password" | "text">("password");
    const [typeNew, setTypeNew] = useState<"password" | "text">("password");

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {oldPassword: "", newPassword: "", newPasswordRepeat: ""},
    });

    const {submit, isLoading} = useChangePassword({
        onSuccess: () => reset(),
    });

    const onSubmit = async (values: ChangePasswordFormValues) => {
        await submit({oldPassword: values.oldPassword, newPassword: values.newPassword});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap="l" fullWidth align="start">
                <Controller
                    control={control}
                    name="oldPassword"
                    render={({field}) => (
                        <Input
                            size="s"
                            label="Текущий пароль"
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            type={typeOld}
                            error={!!errors.oldPassword}
                            hint={errors.oldPassword ? errors.oldPassword.message : null}
                            fullWidth
                            required
                            renderRight={() => (
                                <IconButton
                                    size="s"
                                    variant="function"
                                    aria-label={typeOld === "password" ? "Показать пароль" : "Скрыть пароль"}
                                    icon={typeOld === "password" ? EyeOnIcon : EyeOffIcon}
                                    onClick={() => setTypeOld((p) => (p === "password" ? "text" : "password"))}
                                />
                            )}
                        />
                    )}
                />

                <Grid cols={{s: 12, m: 2}} gap="l" style={{width: "100%"}}>
                    <GridItem col={{s: 12, m: 1}}>
                        <Controller
                            control={control}
                            name="newPassword"
                            render={({field}) => (
                                <Input
                                    size="s"
                                    label="Новый пароль"
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onChange={field.onChange}
                                    type={typeNew}
                                    error={!!errors.newPassword}
                                    hint={errors.newPassword ? errors.newPassword.message : null}
                                    fullWidth
                                    required
                                    renderRight={() => (
                                        <IconButton
                                            size="s"
                                            variant="function"
                                            aria-label={typeNew === "password" ? "Показать пароль" : "Скрыть пароль"}
                                            icon={typeNew === "password" ? EyeOnIcon : EyeOffIcon}
                                            onClick={() => setTypeNew((p) => (p === "password" ? "text" : "password"))}
                                        />
                                    )}
                                />
                            )}
                        />
                    </GridItem>

                    <GridItem col={{s: 12, m: 1}}>
                        <Controller
                            control={control}
                            name="newPasswordRepeat"
                            render={({field}) => (
                                <Input
                                    size="s"
                                    label="Повторите новый пароль"
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onChange={field.onChange}
                                    type={typeNew}
                                    error={!!errors.newPasswordRepeat}
                                    hint={errors.newPasswordRepeat ? errors.newPasswordRepeat.message : null}
                                    fullWidth
                                    required
                                />
                            )}
                        />
                    </GridItem>
                </Grid>
                <div style={{display: "flex", justifyContent: "flex-end", marginTop: "auto" , width: "100%"}}>
                    <Button type="submit" loading={isLoading} size="s">
                        Изменить пароль
                    </Button>
                </div>
            </Stack>
        </form>
    );
}
