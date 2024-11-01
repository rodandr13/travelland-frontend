import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiClient } from "@/src/shared/api";
import { ensureAccessToken } from "@/src/shared/api/ensureAccessToken";
import {
  CART_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await ensureAccessToken();

    const accessToken = cookies().get("accessToken")?.value;
    const itemId = params.id;

    const { data: cart } = await apiClient(
      `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.DELETE_ITEM}/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["cart"],
          revalidate: 60,
        },
      }
    );

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
};
