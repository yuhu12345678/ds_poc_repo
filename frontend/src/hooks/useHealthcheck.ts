import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api";
import type { HealthResponse } from "../types/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function fetchHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<HealthResponse>(`${API_BASE}/health`);
  return response.data;
}

export function useHealthcheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    refetchOnWindowFocus: false,
  });
}
