import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@ozen-ui/kit/Input";
import { Button } from "@ozen-ui/kit/ButtonNext";
import { Stack } from "@ozen-ui/kit/Stack";
import { Typography } from "@ozen-ui/kit/Typography";
import { SectionMessage } from "@ozen-ui/kit/SectionMessage";
import { Select, Option } from "@ozen-ui/kit/Select";

import type { PublicUser, RoleCode } from "@/entities/user/userTypes";
import {
    type UpdateProfileFormValues,
    updateProfileSchema
} from "@/features/user/userProfile/model/updateProfileSchema.ts";
import {useUpdateProfile} from "@/features/user/userProfile/model/useUpdateProfile.ts";


type Props = {
    me: PublicUser;
    canEditRole?: boolean;
};

export function UpdateProfileForm({ me, canEditRole = false }: Props) {
    const { submit, isLoading } = useUpdateProfile({
        userId: me.id,
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: me.firstName,
            lastName: me.lastName ?? "",
            surName: me.surName ?? "",
            email: me.email,
            skillsText: me.skills.join(", "),
            role: me.role,
        },
    });

    useEffect(() => {
        reset({
            firstName: me.firstName,
            lastName: me.lastName ?? "",
            surName: me.surName ?? "",
            email: me.email,
            skillsText: me.skills.join(", "),
            role: me.role,
        });
    }, [me, reset]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const roleValue = watch("role") ?? "USER";

    const onSubmit = async (values: UpdateProfileFormValues) => {
        await submit({
            firstName: values.firstName,
            lastName: values.lastName?.trim() ? values.lastName.trim() : null,
            surName: values.surName?.trim() ? values.surName.trim() : null,
            email: values.email,
            skillsText: values.skillsText,
            role: canEditRole ? (values.role as RoleCode) : undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap="l" fullWidth align="center">
                <Typography variant="heading-l" align="left">
                    Редактировать профиль
                </Typography>

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
                    label="Фамилия"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    hint={errors.lastName ? String(errors.lastName.message) : null}
                    fullWidth
                />

                <Input
                    size="s"
                    label="Отчество"
                    {...register("surName")}
                    error={!!errors.surName}
                    hint={errors.surName ? String(errors.surName.message) : null}
                    fullWidth
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
                    label="Навыки (через запятую)"
                    {...register("skillsText")}
                    error={!!errors.skillsText}
                    hint={errors.skillsText ? String(errors.skillsText.message) : "Например: react, ts, node"}
                    fullWidth
                />

                <Select
                    size="s"
                    label="Роль"
                    value={roleValue}
                    disabled={!canEditRole}
                    onChange={(value) => setValue("role", value as RoleCode)}
                    fullWidth
                >
                    <Option value="USER">USER</Option>
                    <Option value="ADMIN">ADMIN</Option>
                </Select>

                <Button type="submit" loading={isLoading} fullWidth size="s">
                    Сохранить
                </Button>
            </Stack>
        </form>
    );
}
