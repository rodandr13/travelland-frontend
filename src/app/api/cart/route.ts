import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const headersList = headers();
  const cookieHeader = headersList.get("cookie");

  const requestHeaders: HeadersInit = {};

  if (cookieHeader) {
    requestHeaders.cookie = cookieHeader;
  }

  const response = await fetch(`http://localhost:4000/backend/cart`, {
    method: "GET",
    credentials: "include",
    headers: requestHeaders,
  });

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
