import { Project } from "./project.model";

interface Benchmark {
    project: Project;
    releaseFrequency: number;
    leadTime: number;
    timeToRepair: number;
    bugIssuesRate: number;
    date: Date; // Utilizamos el tipo Date de JavaScript para representar fechas.
  }