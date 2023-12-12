import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import{GetKpisResponse, GetProductsResponse, GetTransactionsResponse} from "./types";
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }), 
    reducerPath:"main",
    tagTypes:["Kpis","products","Transactions"],
    endpoints:(build) =>({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"],
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",
            providesTags: ["products"],
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "transaction/Transactions/",
            providesTags: ["Transactions"],
        }),
    }),

});

export const {useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery}  = api;