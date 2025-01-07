import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.scss";
import { cookies } from "next/headers";

import { AuthProvider } from "@/src/app/providers/AuthProvider";
import { StoreProvider } from "@/src/app/providers/StoreProvider";
import { apiClient } from "@/src/shared/api";
import { ApiError } from "@/src/shared/api/apiClient";
import {
  AUTH_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";
import { Header } from "@/src/widgets/header";

import { Footer } from "../shared/ui/footer";
import { Main } from "../shared/ui/main";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Экскурсии в Праге на русском языке. Из Праги по Европе. | Traventico",
  description:
    "Экскурсии в Праге на русском языке — лучший вариант для ознакомления с красотами и историей города. Все экскурсии проводятся на русском языке.",
};

type UserResponse = {
  first_name: string;
  id: number;
  email: string;
  phone_number: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let user = null;
  if (accessToken != null) {
    try {
      const url = `${EXTERNAL_API_BASE_URL}${AUTH_ENDPOINTS.ME}`;
      const { data } = await apiClient<UserResponse>(url, {
        credentials: "include",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      });
      user = data;
    } catch (error) {
      user = null;
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.statusCode})`,
          error.data
        );
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    }
  }

  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider initialUser={user} initialAccessToken={accessToken}>
          <MantineProvider>
            <StoreProvider>
              <Header />
              <Main>{children}</Main>
              <Footer />
            </StoreProvider>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
