
export interface Benchmark {
    project: string;
    releaseFrequency: number;
    leadTime: number;
    timeToRepair: number;
    bugIssuesRate: number;
    period: String; // Formato 202Y-SX
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