export interface Project {
    id?: number
    title: string;
    name: string;
    releaseFrequency?: number;
    leadTime?: number;
    timeToRepair?: number;
    bugIssuesRate?: number;
  }