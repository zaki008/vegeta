import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductResponse extends BaseResponse {
  data: {
    total: number;
    data: Product[];
  };
}

interface ProductApiParams {
  page?: string | undefined;
  category?: string | undefined;
  min_price?: string | undefined;
  max_price?: string | undefined;
  rating?: string | undefined;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductResponse, ProductApiParams>({
      query: ({ page, category, min_price, max_price, rating }) => ({
        url: "/",
        params: {
          page: page || undefined,
          category: category || undefined,
          min_price: min_price || undefined,
          max_price: max_price || undefined,
          rating: rating || undefined,
        },
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
