import { Injectable } from '@angular/core';
import { Project } from '../../models/project.model';
import { BenchmarkService } from '../benchmark/benchmark.service';
import { Benchmark } from 'src/app/models/benchmark.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [
      {title: 'Angular', name: 'angular', releaseFrequency: 1, leadTime: 2, timeToRepair: 3, bugIssuesRate: 4},
      {title: 'TensorFlow', name: 'tensorflow', releaseFrequency: 1, leadTime: 2, timeToRepair: 3, bugIssuesRate: 4},
      {title: 'Spring Boot', name: 'springboot', releaseFrequency: 1, leadTime: 2, timeToRepair: 3, bugIssuesRate: 4},
      {title: 'Electron', name: 'electron', releaseFrequency: 2, leadTime: 5, timeToRepair: 4, bugIssuesRate: 3},
      {title: 'Golang', name: 'golang', releaseFrequency: 4, leadTime: 2, timeToRepair: 5, bugIssuesRate: 1},
      {title: 'React', name: 'react', releaseFrequency: 2, leadTime: 3, timeToRepair: 4, bugIssuesRate: 5},
      {title: 'Vue.js', name: 'vuejs', releaseFrequency: 3, leadTime: 4, timeToRepair: 5, bugIssuesRate: 6},
      {title: 'Django', name: 'django', releaseFrequency: 2, leadTime: 1, timeToRepair: 3, bugIssuesRate: 4},
      {title: 'Flask', name: 'flask', releaseFrequency: 1, leadTime: 3, timeToRepair: 2, bugIssuesRate: 5},
      {title: 'Ruby on Rails', name: 'rubyonrails', releaseFrequency: 3, leadTime: 2, timeToRepair: 1, bugIssuesRate: 4},
      {title: 'Node.js', name: 'nodejs', releaseFrequency: 4, leadTime: 3, timeToRepair: 2, bugIssuesRate: 1},
      {title: 'Express', name: 'express', releaseFrequency: 2, leadTime: 2, timeToRepair: 3, bugIssuesRate: 3},
      {title: 'Laravel', name: 'laravel', releaseFrequency: 1, leadTime: 4, timeToRepair: 2, bugIssuesRate: 2},
      {title: 'SwiftUI', name: 'swiftui', releaseFrequency: 5, leadTime: 1, timeToRepair: 4, bugIssuesRate: 3},
      {title: 'Kotlin', name: 'kotlin', releaseFrequency: 3, leadTime: 3, timeToRepair: 3, bugIssuesRate: 3}
  ];

  constructor(private benchmarkService: BenchmarkService) { }

  getAllProjects(){
    // Se deben actualizar los proyectos
    this.updateLastBenchmarks(); 
    return this.projects;
  }

  findOneProjectByName(name: string){
    return this.projects.filter(p => p.name === name)[0];
  }

  /**
   * Actualiza las últimas métricas de todos los proyectos
   */
  private updateLastBenchmarks(){
    this.projects.forEach((project) =>{
      const lastBenchmark = this.benchmarkService.getLastProjectBenchmark(project.name);
      if (lastBenchmark != null){
        this.updateMetrics(project, lastBenchmark);
      }
    });
  }

  /**
   * Setea en un proyecto la información de sus métricas más recientes
   * @param project: Proyecto a actualizar 
   * @param benchmark: Últimos valores registrados 
   */
  private updateMetrics(project: Project, benchmark: Benchmark){
    project.bugIssuesRate = benchmark.bugIssuesRate;
    project.leadTime = benchmark.leadTime;
    project.releaseFrequency = benchmark.releaseFrequency;
    project.timeToRepair = benchmark.timeToRepair;
  }
}
