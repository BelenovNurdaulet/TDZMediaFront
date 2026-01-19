import { Grid, GridItem } from "@ozen-ui/kit/Grid";
import { Input } from "@ozen-ui/kit/Input";
import { DatePicker } from "@ozen-ui/kit/DatePicker";
import { Select, Option } from "@ozen-ui/kit/Select";
import { Button } from "@ozen-ui/kit/ButtonNext";
import { IconButton } from "@ozen-ui/kit/IconButtonNext";
import { Stack } from "@ozen-ui/kit/Stack";
import { SearchIcon, FilterClearIcon, CrossIcon } from "@ozen-ui/icons";

import type { RoleCode } from "@/entities/user/userTypes.ts";
import s from "./UsersFilter.module.css";

type Props = {
    q: string;
    role: RoleCode | "";
    ids: string;

    createdFrom: Date | null;
    createdTo: Date | null;

    updatedFrom: Date | null;
    updatedTo: Date | null;

    onQChange: (value: string) => void;
    onRoleChange: (value: RoleCode | "") => void;
    onIdsChange: (value: string) => void;

    onCreatedFromChange: (value: Date | null) => void;
    onCreatedToChange: (value: Date | null) => void;

    onUpdatedFromChange: (value: Date | null) => void;
    onUpdatedToChange: (value: Date | null) => void;

    onClear: () => void;
};

export function UsersFilter(props: Props) {
    const {
        q,
        role,
        ids,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,

        onQChange,
        onRoleChange,
        onIdsChange,
        onCreatedFromChange,
        onCreatedToChange,
        onUpdatedFromChange,
        onUpdatedToChange,
        onClear,
    } = props;

    return (
        <>
            <Grid cols={{ s: 12, m: 8 }} gap="m" className={s.grid}>
                <GridItem col={{ s: 12, m: 1 }} style={{ minWidth: 220 }}>
                    <Input
                        name="q"
                        placeholder="Поиск"
                        value={q}
                        onChange={(e) => onQChange(e.target.value)}
                        renderLeft={<SearchIcon />}
                        size="s"
                        fullWidth
                        renderRight={
                            q ? () => (
                                    <div style={{ display: "flex" }}>
                                        <IconButton
                                            icon={CrossIcon}
                                            variant="function"
                                            tabIndex={-1}
                                            onClick={() => onQChange("")}
                                        />
                                    </div>
                                )
                                : undefined
                        }
                    />
                </GridItem>


                <GridItem col={{ s: 12, m: 1 }}>
                    <Select
                        size="s"
                        value={role}
                        defaultValue={""}
                        label="Роль"
                        onChange={(value) => {
                            onRoleChange((value === "") ? "" : value as RoleCode);
                        }}
                        name="role"
                        fullWidth
                    >
                        <Option value="">Все</Option>
                        <Option value="USER">Пользователь</Option>
                        <Option value="ADMIN">Администратор</Option>
                    </Select>
                </GridItem>
                <GridItem col={{ s: 12, m: 1 }}>
                    <Input
                        name="ids"
                        placeholder="1,2,3"
                        label="Посик по IDs"
                        value={ids}
                        onChange={(e) => onIdsChange(e.target.value)}
                        size="s"
                        fullWidth
                    />
                </GridItem>

                <GridItem col={{ s: 12, m: 2 }}>
                    <Stack direction="row" fullWidth>
                        <DatePicker
                            mode="date"
                            label="Создано с"
                            value={createdFrom}
                            onChange={onCreatedFromChange}
                            maxDate={createdTo || undefined}
                            size="s"
                            className={s.leftInput}
                            fullWidth
                        />
                        <DatePicker
                            mode="date"
                            label="по"
                            value={createdTo}
                            onChange={onCreatedToChange}
                            minDate={createdFrom || undefined}
                            size="s"
                            className={s.rightInput}
                            fullWidth
                        />
                    </Stack>
                </GridItem>

                <GridItem col={{ s: 12, m: 2 }}>
                    <Stack direction="row" fullWidth>
                        <DatePicker
                            mode="date"
                            label="Обновлено с"
                            value={updatedFrom}
                            onChange={onUpdatedFromChange}
                            maxDate={updatedTo || undefined}
                            size="s"
                            className={s.leftInput}
                            fullWidth
                        />
                        <DatePicker
                            mode="date"
                            label="по"
                            value={updatedTo}
                            onChange={onUpdatedToChange}
                            minDate={updatedFrom || undefined}
                            size="s"
                            className={s.rightInput}
                            fullWidth
                        />
                    </Stack>
                </GridItem>

                <GridItem col={{ s: 12, m: 1 }}>
                    <Button
                        size="s"
                        color="error"
                        iconLeft={FilterClearIcon}
                        onClick={onClear}
                        fullWidth
                    >
                        Очистить
                    </Button>
                </GridItem>
            </Grid>
        </>
    );
}
