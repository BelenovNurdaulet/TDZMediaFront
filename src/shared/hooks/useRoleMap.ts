import { useMemo } from "react";
import { useSelector } from "react-redux";
import type {RootState} from "@/app/store/store.ts";
import {selectInfoData} from "@/entities/info/selectors.ts";


type RoleItem = { code: string; name: string };

export function useRoleMap() {
    const info = useSelector((s: RootState) => selectInfoData(s));

    return useMemo(() => {
        const map: Record<string, string> = {};
        (info?.roles ?? []).forEach((r: RoleItem) => {
            map[r.code] = r.name;
        });
        return map;
    }, [info]);
}
