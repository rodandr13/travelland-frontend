import { RequestCredentials } from "undici-types";

export type ApiRequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  credentials?: RequestCredentials;
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
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: options.credentials || "same-origin",
    });

    const contentType = response.headers.get("Content-Type");
    let data: any = null;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || "API request failed",
        response.status,
        data
      );
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(error.message || "Network error");
  }
};
