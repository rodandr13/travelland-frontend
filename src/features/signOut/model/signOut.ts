"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/src/app/providers/AuthProvider";
import { apiClient } from "@/src/shared/api";
import { ApiError } from "@/src/shared/api/apiClient";
import {
  AUTH_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";

export const useSignOut = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  return async () => {
    try {
      const url = `${EXTERNAL_API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`;
      await apiClient(url, {
        method: "POST",
        credentials: "include",
      });
      setAuthUser(null);
      router.replace("/");
    } catch (error) {
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
  };
};
