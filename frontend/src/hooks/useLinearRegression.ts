import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../lib/api";
import type { RegressionRequest, RegressionResponse } from "../types/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function runRegression(payload: RegressionRequest): Promise<RegressionResponse> {
  const response = await apiClient.post<RegressionResponse>(`${API_BASE}/linear-regression`, payload);
  return response.data;
}

export function useLinearRegression() {
  return useMutation({
    mutationFn: runRegression,
  });
}
