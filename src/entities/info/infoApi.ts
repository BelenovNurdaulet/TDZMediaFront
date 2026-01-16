import {baseApi} from "@/shared/api/baseApi.ts";
import type {InfoResponse} from "@/entities/info/infoTypes.ts";

export const infoApi =
    baseApi.injectEndpoints({

        endpoints:(build) => ({
            getInfo: build.query<InfoResponse , void>({
                query: () => ({url: '/api/info'}),
                keepUnusedDataFor: 60*60*24,
                providesTags: ["Info"],
            })
        })
    })

export const { useGetInfoQuery } = infoApi;