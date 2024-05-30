export interface Project {
    id?: number;
    address?: string;
    title: string;
    name: string;
    releaseFrequency?: number;
    leadTime?: number;
    timeToRepair?: number;
    bugIssuesRate?: number;
  }