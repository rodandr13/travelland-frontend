import { cookies } from "next/headers";

import { refreshAccessToken } from "@/src/shared/api/refreshAccessToken";

export const ensureAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    const refreshToken = cookies().get("refreshToken")?.value;
    if (!refreshToken) {
      throw new Error("Refresh token не существует.");
    }

    try {
      await refreshAccessToken(refreshToken);
    } catch (error) {
      throw new Error("Не удалось обновить refresh token");
    }
  }
};