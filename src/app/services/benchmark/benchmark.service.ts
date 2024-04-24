import { Injectable } from '@angular/core';
import { Benchmark, DashboardBenchmark, SimpleBenchmark } from 'src/app/models/benchmark.model';
import { sampleData } from './benchmark.data';

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

  // Cargamos los benchmarks de prueba
  benchmarks = sampleData; 

  constructor() { }

  /**
   * Formatea el string de la métrica obtenida de la ruta para que pueda  ser usada como clave en
   * el array de benchmarks
  */
  public keyableMetric(metric: string): string {
    switch  (metric) {
      case 'time-repair':
        return 'timeToRepair';
      case 'bug-issues-rate':
        return 'bugIssuesRate';
      case 'lead-time':
        return 'leadTime'
      case 'release-freq':
        return 'releaseFrequency';

      default:
        return metric;
    }
  }

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
  findOneMetricBenchmarks(metric: keyof Benchmark, project: string) :  SimpleBenchmark[] {
    if (metric === 'project' || metric === 'period') {
      throw new Error('The metric must be a numeric property of Benchmark.');
    } 
    return this.benchmarks
        .filter(item => item.project === project)
        .map(item => ({period: item.period, mainMetric: item[metric]} as SimpleBenchmark));
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
  public findOneMetricBenchmarksForTwoProjects(metric: keyof Benchmark, mainProject: string, sideProject: string): SimpleBenchmark[] {
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

  public getPreviousPeriodVariation(metric: keyof Benchmark, project: string) {
    // Obtenemos benchmarks de un proyecto para una métrica
    const benchmarks = this.findOneMetricBenchmarks(metric, project);
    
    // Parseamos el ultimo y el penultimo a la entidad SimpleBenchmark
    const lastBenchmark =  benchmarks[benchmarks.length - 1] as SimpleBenchmark;
    const previousBenchmark =  benchmarks[benchmarks.length - 2] as SimpleBenchmark;

    // Devolvemos la diferencia
    return lastBenchmark.mainMetric - previousBenchmark.mainMetric;
  }

  public getBestBenchmark(metric: keyof Benchmark, project: string) {
    // Obtenemos benchmarks de un proyecto para una métrica
    const benchmarks = this.findOneMetricBenchmarks(metric, project) as SimpleBenchmark[];

    return benchmarks.reduce((max, item) => max.mainMetric > item.mainMetric ? max : item);
  }

  public getWorstBenchmark(metric: keyof Benchmark, project: string) {
    // Obtenemos benchmarks de un proyecto para una métrica
    const benchmarks = this.findOneMetricBenchmarks(metric, project) as SimpleBenchmark[];

    return benchmarks.reduce((min, item) => min.mainMetric < item.mainMetric ? min : item);
  }

  public getGlobalBestBenchmark(metric: keyof Benchmark){

    let currentBenchmarks = this.benchmarks.filter((item) => item.period === "2023-S2");
    const max = currentBenchmarks.reduce((max, item) => max[metric] > item[metric] ? max : item);
    return { period: max.period, value: max[metric], projectName: max.project } as DashboardBenchmark;
  }


  public getGlobalWorstBenchmark(metric: keyof Benchmark){
    let currentBenchmarks = this.benchmarks.filter((item) => item.period === "2023-S2");
    const min = currentBenchmarks.reduce((min, item) => min[metric] < item[metric] ? min : item);
    return { period: min.period, value: min[metric], projectName: min.project } as DashboardBenchmark;
  }
}
