import { RequestCredentials } from "undici-types";

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
  force?: boolean;
};

export type ApiRequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  credentials?: RequestCredentials;
  next?: NextFetchRequestConfig;
};

export class ApiError extends Error {
  public statusCode: number;
  public data: any;

  constructor(message: string, statusCode: number, data: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const apiClient = async <T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<{ data: T; status: number }> => {
  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: options.credentials || "same-origin",
      ...(options.next && { next: options.next }),
    });

    const contentType = response.headers.get("Content-Type");
    let data: any = null;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else if (contentType && contentType.includes("text/")) {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        (data && data.message) || "Ошибка при получении данных",
        response.status,
        data
      );
    }

    return { data: data as T, status: response.status };
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(error.message || "Network error");
  }
};
