import { Card } from "@ozen-ui/kit/Card";
import { Stack } from "@ozen-ui/kit/Stack";

import { useMemo, useState } from "react";
import s from "./UsersPage.module.css"
import { useGetUsersQuery } from "@/entities/user/userApi";
import { useFilter } from "@/features/user/usersList/model/useFilter";
import { UsersFilter } from "@/features/user/usersList/ui/UsersFilter/UsersFilter.tsx";
import { UsersTable } from "@/features/user/usersList/ui/UsersTable/UserTable.tsx";
import { UsersPagination } from "@/features/user/usersList/ui/UsersPagination/UsersPagination.tsx";
import type { SortField } from "@/entities/user/userTypes";
import {Title} from "@/shared/ui/Title.tsx";

export function UsersPage() {
    const f = useFilter();

    const [sortBy, setSortBy] = useState<SortField>("createdAt");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const queryParams = useMemo(
        () => ({
            ...f.queryParams,
            sortBy,
            sortDir,
            page,
            pageSize,
        }),
        [f.queryParams, sortBy, sortDir, page, pageSize]
    );

    const { data, isFetching, isLoading } = useGetUsersQuery(queryParams);

    const total = data?.total ?? 0;

    const onSort = (field: SortField) => {
        setPage(1);
        setSortDir((prev) => (sortBy === field ? (prev === "asc" ? "desc" : "asc") : "asc"));
        setSortBy(field);
    };

    const onPageChange = (value: number) => setPage(value);

    const onPageSizeChange = (value: number) => {
        setPageSize(value);
        setPage(1);
    };

    return (
        <Stack direction="column" gap="m" className={s.container}>
            <Title title="Список пользователей"  href="users" />
            <Card size="s" borderWidth="none">
                <UsersFilter
                    q={f.state.q}
                    role={f.state.role}
                    ids={f.state.ids}
                    createdFrom={f.state.createdFrom}
                    createdTo={f.state.createdTo}
                    updatedFrom={f.state.updatedFrom}
                    updatedTo={f.state.updatedTo}
                    onQChange={f.setQ}
                    onRoleChange={f.setRole}
                    onIdsChange={f.setIds}
                    onCreatedFromChange={f.setCreatedFrom}
                    onCreatedToChange={f.setCreatedTo}
                    onUpdatedFromChange={f.setUpdatedFrom}
                    onUpdatedToChange={f.setUpdatedTo}
                    onClear={f.clear}
                />

                <UsersTable
                    items={data?.items ?? []}
                    loading={isFetching || isLoading}
                    activeSearch={!!f.state.q.trim() || !!f.state.role || !!f.state.ids.trim()}
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={onSort}
                />
            </Card>
                <UsersPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                />
        </Stack>
    );
}
