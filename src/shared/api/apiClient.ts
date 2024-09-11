export const apiClient = async (url: string, options = {}) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const fullUrl = `${baseURL}${url}`;

  const response = await fetch(fullUrl, defaultOptions);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
