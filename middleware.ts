import { parse, serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

import { refreshAccessToken } from "@/src/shared/api/refreshAccessToken";
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from "@/src/shared/lib/constants";

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup");
  if ((accessToken || refreshToken) && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!refreshToken && accessToken) {
    const nextResponse = NextResponse.redirect(new URL("/signin", request.url));
    nextResponse.cookies.delete("accessToken");
    return nextResponse;
  }

  if (!accessToken && refreshToken) {
    try {
      const newTokens = await refreshAccessToken(refreshToken.value);
      if (newTokens.accessToken && newTokens.refreshToken) {
        const requestHeaders = new Headers(request.headers);

        const existingCookies = requestHeaders.get("cookie") || "";
        const cookies = parse(existingCookies);

        cookies.accessToken = newTokens.accessToken;
        cookies.refreshToken = newTokens.refreshToken;

        const updatedCookieString = Object.entries(cookies)
          .map(([name, value]) => serialize(name, value))
          .join("; ");

        requestHeaders.set("cookie", updatedCookieString);

        // Создаем NextResponse с модифицированными заголовками запроса,
        // чтобы серверные компоненты могли сразу видеть новые куки
        const nextResponse = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        // Устанавливаем куки на том же NextResponse для отправки их в браузер
        nextResponse.cookies.set("accessToken", newTokens.accessToken, {
          domain: process.env.COOKIE_DOMAIN || "localhost",
          httpOnly: true,
          path: "/",
          maxAge: ACCESS_TOKEN_LIFETIME,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        });
        nextResponse.cookies.set("refreshToken", newTokens.refreshToken, {
          domain: process.env.COOKIE_DOMAIN || "localhost",
          httpOnly: true,
          path: "/",
          maxAge: REFRESH_TOKEN_LIFETIME,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
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
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
