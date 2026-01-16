import { useMemo, useState } from "react";
import type { RoleCode, UsersListQuery } from "@/entities/user/userTypes";
import {userListFilterSchema, type UserListFilterValues} from "./filterSchema";

type FilterState = {
    q: string;
    role: RoleCode | "";
    ids: string;

    createdFrom: Date | null;
    createdTo: Date | null;

    updatedFrom: Date | null;
    updatedTo: Date | null;
};

const initialState: FilterState = {
    q: "",
    role: "",
    ids: "",
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
};
export function validateFilterOrToast(
    values: unknown,
    pushMessage: (args: any) => void
): values is UserListFilterValues {
    const res = userListFilterSchema.safeParse(values);

    if (res.success) return true;

    const first = res.error.issues?.[0];
    pushMessage({
        title: "Ошибка фильтра",
        description: first?.message ?? "Проверь фильтры",
        variant: "error",
    });

    return false;
}
function formatDate(d: Date | null): string | undefined {
    if (!d) return undefined;
    const yyyy = String(d.getFullYear());
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export function useFilter() {
    const [state, setState] = useState<FilterState>(initialState);

    const queryParams: UsersListQuery = useMemo(() => {
        const candidate = {
            q: state.q.trim() || undefined,
            role: state.role || undefined,
            ids: state.ids.trim() || undefined,
            createdFrom: formatDate(state.createdFrom),
            createdTo: formatDate(state.createdTo),
            updatedFrom: formatDate(state.updatedFrom),
            updatedTo: formatDate(state.updatedTo),
        };

        const parsed = userListFilterSchema.safeParse(candidate);
        if (!parsed.success) {
            return {
                q: candidate.q,
                role: candidate.role as any,
                createdFrom: candidate.createdFrom,
                createdTo: candidate.createdTo,
                updatedFrom: candidate.updatedFrom,
                updatedTo: candidate.updatedTo,
            };
        }

        const v = parsed.data;
        return {
            q: v.q || undefined,
            role: v.role,
            ids: v.ids || undefined,
            createdFrom: v.createdFrom,
            createdTo: v.createdTo,
            updatedFrom: v.updatedFrom,
            updatedTo: v.updatedTo,
        };
    }, [state]);

    return {
        state,
        queryParams,

        setQ: (q: string) => setState((p) => ({ ...p, q })),
        setRole: (role: RoleCode | "") => setState((p) => ({ ...p, role })),
        setIds: (ids: string) => setState((p) => ({ ...p, ids })),

        setCreatedFrom: (d: Date | null) => setState((p) => ({ ...p, createdFrom: d })),
        setCreatedTo: (d: Date | null) => setState((p) => ({ ...p, createdTo: d })),

        setUpdatedFrom: (d: Date | null) => setState((p) => ({ ...p, updatedFrom: d })),
        setUpdatedTo: (d: Date | null) => setState((p) => ({ ...p, updatedTo: d })),

        clear: () => setState(initialState),
    };
}
