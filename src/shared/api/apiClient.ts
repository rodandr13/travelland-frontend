import { RequestCredentials } from "undici-types";

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
  force?: boolean;
};

export type ApiRequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: Record<string, unknown>;
  credentials?: RequestCredentials;
  next?: NextFetchRequestConfig;
};

export class ApiError extends Error {
  public statusCode: number;
  public data: unknown;

  constructor(message: string, statusCode: number, data: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const apiClient = async <T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<{ data: T | null; status: number }> => {
  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: options.credentials || "same-origin",
      ...(options.next ? { next: options.next } : {}),
    });

    const contentType = response.headers.get("Content-Type");
    let data: T | null = null;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      throw new ApiError("Unsupported content type", response.status, null);
    }

    if (!response.ok) {
      const errorMessage =
        typeof data === "object" && data !== null && "message" in data
          ? (data as { message: string }).message
          : "Ошибка при получении данных";

      throw new ApiError(errorMessage, response.status, data);
    }

    return { data, status: response.status };
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(error.message || "Network error");
    }
    throw new Error("Unknown error");
  }
};
