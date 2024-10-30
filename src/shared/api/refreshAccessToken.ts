import { apiClient, ApiError } from "@/src/shared/api/apiClient";
import {
  AUTH_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<TokenResponse> => {
  try {
    const url = `${EXTERNAL_API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`;

    const { data } = await apiClient<TokenResponse>(url, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: "include",
    });

    return data;
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
