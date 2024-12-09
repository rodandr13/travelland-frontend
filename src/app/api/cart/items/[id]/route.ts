import { headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  CART_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";

export const DELETE = async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  // await ensureAccessToken();

  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");

  const requestHeaders: HeadersInit = {};

  if (cookieHeader) {
    requestHeaders.cookie = cookieHeader;
  }
  const itemId = params.id;
  const response = await fetch(
    `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.DELETE_ITEM}/${itemId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: requestHeaders,
    }
  );

  const cart = await response.json();

  const nextResponse = NextResponse.json(cart);

  const setCookieHeader = response.headers.get("set-cookie");

  if (setCookieHeader) {
    const cookies = setCookieHeader.split(/,(?=[^ ])/);

    cookies.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie.trim());
    });
  }

  return nextResponse;
};
