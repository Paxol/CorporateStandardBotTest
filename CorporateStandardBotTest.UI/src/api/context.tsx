import { createContext, useContext } from "react";
import type { ApiClient } from "./client";

export const ApiClientContext = createContext<ApiClient | null>(null);

export function useApiClient() {
  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error("useApiClient must be used within an ApiClientProvider");
  }
  return apiClient;
}