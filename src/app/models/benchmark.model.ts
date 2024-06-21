
export interface Benchmark {
  id?: number;
  projectName: string;
  releaseFrequency: number;
  leadTime: number;
  timeToRepair: number;
  bugIssuesRate: number;
  period: string; // Formato 202Y-SX
}

export interface SimpleBenchmark {
  period: string;
  mainMetric: number;
  sideMetric?: number;
}

export interface DashboardBenchmark {
  period: string;
  projectName: string;
  value: number;
}