import { parse, serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

import { refreshAccessToken } from "@/src/shared/api/refreshAccessToken";
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from "@/src/shared/lib/constans";

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
        // Обновляем заголовки запроса
        const requestHeaders = new Headers(request.headers);

        const existingCookies = requestHeaders.get("cookie") || "";
        const cookies = parse(existingCookies);

        cookies.accessToken = newTokens.accessToken;
        cookies.refreshToken = newTokens.refreshToken;

        const updatedCookieString = Object.entries(cookies)
          .map(([name, value]) => serialize(name, value))
          .join("; ");

        requestHeaders.set("cookie", updatedCookieString);

        // Создаем NextResponse с модифицированными заголовками запроса
        const nextResponse = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        // Устанавливаем куки на том же NextResponse
        nextResponse.cookies.set("accessToken", newTokens.accessToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          maxAge: ACCESS_TOKEN_LIFETIME,
          sameSite: "lax",
        });
        nextResponse.cookies.set("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          maxAge: REFRESH_TOKEN_LIFETIME,
          sameSite: "lax",
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
