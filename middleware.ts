import { NextRequest, NextResponse } from "next/server";

import { refreshAccessToken } from "@/src/shared/api/refreshAccessToken";
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from "@/src/shared/lib/constans";

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup");

  if ((accessToken || refreshToken) && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!refreshToken && accessToken) {
    const nextResponse = NextResponse.redirect(new URL("/login", request.url));
    nextResponse.cookies.delete("accessToken");
    return nextResponse;
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await refreshAccessToken(refreshToken.value);
      const setCookieHeader = res.headers.get("set-cookie");

      if (res.ok && setCookieHeader) {
        const nextResponse = NextResponse.next();
        const cookies = setCookieHeader.split(/,(?=\S)/);

        cookies.forEach((cookie) => {
          const [cookieName, cookieValue] = cookie.split(";")[0].split("=");

          if (cookieName === "accessToken" || cookieName === "refreshToken") {
            nextResponse.cookies.set(cookieName, cookieValue, {
              httpOnly: true,
              secure: true,
              path: "/",
              maxAge:
                cookieName === "accessToken"
                  ? ACCESS_TOKEN_LIFETIME
                  : REFRESH_TOKEN_LIFETIME,
              sameSite: "lax",
            });
          }
        });

        return nextResponse;
      } else {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    } catch (error) {
      console.error("Ошибка при обновлении токенов:", error);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
