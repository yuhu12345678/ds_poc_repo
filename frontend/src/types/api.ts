export type HealthResponse = {
  status: string;
  environment: string;
  version: string;
  timestamp: string;
};

export type RegressionRequest = {
  x: number[];
  y: number[];
  predict_for: number;
};

export type RegressionResponse = {
  slope: number;
  intercept: number;
  predicted: number;
};
