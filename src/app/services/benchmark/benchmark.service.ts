import { Injectable } from '@angular/core';
import { Benchmark } from 'src/app/models/benchmark.model';
import { sampleData } from './benchmark.data';

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

  // Cargamos los benchmarks de prueba
  benchmarks = sampleData; 

  constructor() { }

  /**
   * Obtiene todos los benchmarks de un proyecto
   * @param projectName, nombre del proyecto del que se quieren obtener los benchmarks
   * @returns Benchmark[], lista con todos los benchmarks del proyecto indicado por el parametro
   */
  public getProjectBenchmark(projectName: string): Benchmark[] {
    return this.benchmarks.filter((benchmark)=> benchmark.project == projectName);
  }

  /**
   * Obtiene el benchmark más reciente de un proyecto en concreto
   * @param projectName, nombre del proyecto del que se quieren obtener el benchmark
   * @returns Benchmark, último benchmark del proyecto
   */
  public getLastProjectBenchmark(projectName: string): Benchmark{
    let projectBenchmarks = this.getProjectBenchmark(projectName);
    return projectBenchmarks[projectBenchmarks.length -1];
  }

  /**
   * Obtiene las últimas evaluaciones de un proyecto para una métrica en concreto
   * @param metric, métrica a obtener 
   * @param project, nombre del proyecto del cual se quiere saber el valor de la métrica indicada 
   * @returns Object[], devuelve un array de objetos donde cada uno contiene el periodo donde se calculó
   *          el rendimiento en la métrica indicada y su respectivo valor
   */
  findOneMetricBenchmarks(metric: keyof Benchmark, project: string) :  Object[] {
    if (metric === 'project' || metric === 'period') {
      throw new Error('The metric must be a numeric property of Benchmark.');
    } 
    return this.benchmarks
        .filter(item => item.project === project)
        .map(item => ({period: item.period, mainMetric: item[metric]} as Object));
  }

  /**
   * Obtiene las últimas evaluaciones de un proyecto principal y un proyecto secundario para una métrica en concreto,
   * con el objetivo de comparar ambas
   * @param metric, métrica a obtener 
   * @param mainProject, nombre del proyecto principal del cual se quiere saber el valor de la métrica indicada
   * @param sideProject, nombre del proyecto secundario del cual se quiere saber el valor de la métrica indicada y se
   *                     quiere comparar con el proyecto principal 
   * @returns Object[], devuelve un array de objetos donde cada uno contiene el periodo donde se calculó
   *          el rendimiento en la métrica indicada y su respectivo valor para cada proyecto
   */
  public findOneMetricBenchmarksForTwoProjects(metric: keyof Benchmark, mainProject: string, sideProject: string): Object[] {
    if (metric === 'project' || metric === 'period') {
        throw new Error('The metric must be a numeric property of Benchmark.');
    }

    const mainProjectData = this.benchmarks.filter(item => item.project === mainProject);
    const sideProjectData = this.benchmarks.filter(item => item.project === sideProject);

    return mainProjectData.map(item => {
        const sideItem = sideProjectData.find(side => side.period === item.period);
        return {
            period: item.period,
            mainMetric: item[metric],
            sideMetric: sideItem ? sideItem[metric] : 0  // Se pone a 0 si no coinciden los periodos
        };
    });
}
}
