import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiClient } from "@/src/shared/api";
import {
  CART_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";

export const GET = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const { data: cart } = await apiClient(
    `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.GET_CART}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: {
        tags: ["cart"],
        revalidate: 60,
      },
    }
  );

  return NextResponse.json(cart);
};
