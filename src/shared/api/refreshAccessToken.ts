export const refreshAccessToken = async (refreshToken: string) => {
  return await fetch("http://localhost:4000/api/auth/login/access-token", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`,
    },
  });
};
