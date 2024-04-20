
export interface Benchmark {
    project: string;
    releaseFrequency: number;
    leadTime: number;
    timeToRepair: number;
    bugIssuesRate: number;
    period: String; // Formato SX-202Y
  }