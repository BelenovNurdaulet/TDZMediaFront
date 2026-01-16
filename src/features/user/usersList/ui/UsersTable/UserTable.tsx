import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@ozen-ui/kit/Table";
import { Typography } from "@ozen-ui/kit/Typography";
import { Stack } from "@ozen-ui/kit/Stack";
import { CheckCircleFilledIcon, InfoCircleFilledIcon } from "@ozen-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import type { PublicUser, SortField } from "@/entities/user/userTypes.ts";
import s from "./UsersTable.module.css";
import {SortableHeader} from "@/features/user/usersList/ui/SortableHeader/SortableHeader.tsx";
import {formatFullName} from "@/shared/utils/formatFullName.ts";
import {formatDateTime} from "@/shared/utils/formatDateTime.ts";

import {useRoleMap} from "@/shared/hooks/useRoleMap.ts";

type Props = {
    items: PublicUser[];
    loading?: boolean;

    activeSearch?: boolean;

    sortBy?: SortField;
    sortDir?: "asc" | "desc";
    onSort: (field: SortField) => void;
};


export function UsersTable(props: Props) {
    const { items, loading = false, activeSearch = false, sortBy, sortDir, onSort } = props;
    const roleMap = useRoleMap();


    return (
        <TableContainer maxHeight={loading ? "calc(100vh - 406px)" : "calc(100vh - 325px)"}>
            <Table size="s" stickyHeader striped divider="row">
                <TableHead>
                    <TableRow>
                        <SortableHeader field="id" label="ID" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                        <SortableHeader field="firstName" label="ФИО" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                        <SortableHeader field="email" label="Email" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />

                        <SortableHeader field="createdAt" label="Создан" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                        <SortableHeader field="updatedAt" label="Обновлён" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                        <TableCell align="left">Роль</TableCell>
                        <TableCell align="center">Действия</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {items.length === 0 ? (
                        <TableRow style={{ backgroundColor: "var(--color-background-main)" }}>
                            <TableCell colSpan={7} align="center" style={{ padding: 0 }}>
                                <Stack
                                    align="center"
                                    justify="center"
                                    direction="column"
                                    gap="s"
                                    style={{
                                        height: "calc(100vh - 474px)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {loading ? (
                                        <Typography variant="text-m" color="secondary" align="center">
                                            Загрузка...
                                        </Typography>
                                    ) : activeSearch ? (
                                        <>
                                            <InfoCircleFilledIcon color="var(--color-content-warning)" />
                                            <Typography variant="text-m" color="secondary" align="center">
                                                Ничего не найдено
                                            </Typography>
                                            <Typography variant="text-m" color="secondary" align="center">
                                                Попробуйте изменить фильтры
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleFilledIcon color="var(--color-content-action)" />
                                            <Typography variant="text-m_1" color="secondary" align="center">
                                                Пользователей нет
                                            </Typography>
                                        </>
                                    )}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    <Typography color="secondary" variant="text-s">
                                        {u.id}
                                    </Typography>
                                </TableCell>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    {formatFullName(u)}
                                </TableCell>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    {u.email}
                                </TableCell>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    {formatDateTime(u.createdAt)}
                                </TableCell>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    {formatDateTime(u.updatedAt)}
                                </TableCell>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    {roleMap[u.role] ?? u.role}
                                </TableCell>
                                <TableCell className={s.tableCell} verticalAlign="middle">
                                    <RouterLink to={`/users/${u.id}`} className={s.detailsLink}>
                                        Подробнее
                                    </RouterLink>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
