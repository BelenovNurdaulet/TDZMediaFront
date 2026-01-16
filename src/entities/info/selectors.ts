import {infoApi} from "@/entities/info/infoApi.ts";
import type {RootState} from "@/app/store/store.ts";


export const selectInfoData = (state: RootState) =>
    infoApi.endpoints.getInfo.select(undefined)(state).data;
