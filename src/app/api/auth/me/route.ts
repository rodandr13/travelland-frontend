// app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiClient } from "@/src/shared/api";

export async function GET() {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  try {
    const response = await apiClient("/auth/me", {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    // console.log("Ошибка получения данных пользователя:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 501 });
  }
}
