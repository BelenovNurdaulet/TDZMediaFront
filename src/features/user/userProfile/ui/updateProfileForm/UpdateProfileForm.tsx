import {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Input} from "@ozen-ui/kit/Input";
import {Button} from "@ozen-ui/kit/ButtonNext";
import {Stack} from "@ozen-ui/kit/Stack";
import {Select, Option} from "@ozen-ui/kit/Select";

import type {PublicUser, RoleCode} from "@/entities/user/userTypes";
import {
    updateProfileSchema,
} from "@/features/user/userProfile/model/updateProfileSchema.ts";
import {useUpdateProfile} from "@/features/user/userProfile/model/useUpdateProfile.ts";
import {Grid, GridItem} from "@ozen-ui/kit/Grid";
import {SkillAutocomplete} from "@/shared/ui/SkillAutocomplete.tsx";

type Props = {
    user: PublicUser;
    canEditRole?: boolean;
};

export function UpdateProfileForm({user, canEditRole = false}: Props) {
    const {submit, isLoading} = useUpdateProfile({userId: user.id});

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(updateProfileSchema),
    });
    const [skills, setSkills] = useState<string[]>(user.skills ?? []);
    useEffect(() => {
        reset({
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            surName: user.surName ?? "",
            email: user.email ?? "",
            skills: user.skills ?? [],
            role: (user.role ?? "USER") as RoleCode,
        });
    }, [user, reset]);

    return (
        <form onSubmit={handleSubmit((values) => submit({ ...values, skills }))}>

        <Stack direction="column" gap="s" fullWidth align="start">
                <Grid cols={{s: 12, m: 2}} gap="l" style={{width: "100%"}}>
                    <GridItem col={{s: 12, m: 2}}>
                        <Controller
                            control={control}
                            name="firstName"
                            render={({field}) => (
                                <Input
                                    size="s"
                                    label="Имя"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={!!errors.firstName}
                                    hint={errors.firstName?.message ?? null}
                                    fullWidth
                                    required
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem col={{s: 12, m: 1}}>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({field}) => (
                                <Input
                                    size="s"
                                    label="Фамилия"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={!!errors.lastName}
                                    hint={errors.lastName?.message ? String(errors.lastName.message) : null}
                                    fullWidth
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem col={{s: 12, m: 1}}>
                        <Controller
                            control={control}
                            name="surName"
                            render={({field}) => (
                                <Input
                                    size="s"
                                    label="Отчество"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={!!errors.surName}
                                    hint={errors.surName?.message ? String(errors.surName.message) : null}
                                    fullWidth
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem col={{s: 12, m: 1}}>
                        <Controller
                            control={control}
                            name="email"
                            render={({field}) => (
                                <Input
                                    size="s"
                                    label="Почта"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={!!errors.email}
                                    hint={errors.email?.message ?? null}
                                    fullWidth
                                    required
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem col={{s: 12, m: 1}}>
                        <Controller
                            control={control}
                            name="role"
                            render={({field}) => (
                                <Select
                                    size="s"
                                    label="Роль"
                                    value={(field.value ?? "USER") as RoleCode}
                                    disabled={!canEditRole}
                                    onChange={(value) => field.onChange(value as RoleCode)}
                                    fullWidth
                                >
                                    <Option value="USER">Пользователь</Option>
                                    <Option value="ADMIN">Администратор</Option>
                                </Select>
                            )}
                        />

                    </GridItem>
                    <GridItem col={{s: 12, m: 2}}>
                        <SkillAutocomplete
                            skills={skills}
                            setSkills={setSkills}
                            label="Навыки"
                        />
                    </GridItem>
                </Grid>
                <div style={{display: "flex", justifyContent: "flex-end", marginTop: "auto", width: "100%"}}>
                    <Button type="submit" loading={isLoading} size="s">
                        Сохранить
                    </Button>
                </div>
            </Stack>
        </form>
    );
}
