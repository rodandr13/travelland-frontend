interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<TokenResponse> => {
  const result = await fetch("http://localhost:4000/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to refresh token");
  }

  return await result.json();
};
