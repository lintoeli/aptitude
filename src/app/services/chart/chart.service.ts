import { Injectable } from '@angular/core';
import { BehaviorSubject, range } from 'rxjs';
import { AgChartOptions } from 'ag-charts-community';
import { Project } from 'src/app/models/project.model';
import { BenchmarkService } from '../benchmark/benchmark.service';
import { Benchmark } from 'src/app/models/benchmark.model';
import { Chart } from 'src/app/models/chart.interface';
import { ColorDefinerService } from '../color-definer/color-definer.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  //Flag de grafico simple/doble
  private doubleChartSource = new BehaviorSubject<boolean>(false);
  doubleChart$ = this.doubleChartSource.asObservable();

  // Proyecto secundario
  private sideProjectSource = new BehaviorSubject<Project | undefined>(undefined);
  sideProject$ = this.sideProjectSource.asObservable();

  constructor(private benchmarkService: BenchmarkService, private colorDefiner: ColorDefinerService) {}

  /**
   * Cambia el proyecto secundario
   * @param project, nuevo proyecto secundario
   */
  public setSideProject(project: Project | undefined): void {
    this.sideProjectSource.next(project);
  }

  /**
   * Pone el grafico en simple cuando se cierra el chart
   */
  public disableDoubleChartOnDestroy(): void{
    this.doubleChartSource.next(false);
  }

  /**
   * Construye la configuración del gráfico para que pueda ser mostrado
   * 
   * @param metric, métrica a representar 
   * @param mainProject, proyecto principal a representar 
   * @param sideProject, (opcional) proyecto secundario a representar y comparar con el principal 
   * @returns AgChartOptions, una clase de configuración de gráfico para poder representarlo en el componente
   */
  public buildChart(metric: string, mainProject: string, sideProject? : string) : AgChartOptions {
    // Obtenemos la métrica a representar en el gráfico
    const keyMetric = this.keyableMetric(metric);

    // Creamos una nueva configuración "en blanco"
    let optionsObject = this.createBlankChartOptions();

    if (sideProject){
      // Cargamos los benchmarks de ambos proyectos en la configuración
      optionsObject.data = this.benchmarkService.findOneMetricBenchmarksForTwoProjects(keyMetric as keyof Benchmark, mainProject, sideProject);

      //Obtenemos los colores de la barra de cada proyecto y actualizamos la serie por defecto
      const barColors = this.colorDefiner.getBarColorCode(keyMetric, mainProject, sideProject);
      optionsObject.series[0].fill =  barColors.mainProjectColorCode as string;

      // Creamos la segunda serie de barras para representar el proyecto secundario
      optionsObject.series.push({ xKey: 'period', yKey: 'sideMetric', type: 'bar', fill: barColors.sideProjectColorCode as string});

      // Agregamos el eje del proyecto secundario para que sea visible en el gráfico
      optionsObject.axes.push({type: 'number', position: 'right', keys: ['sideMetric'], label: {color: '#121212'}});

    } else {
      //Obtenemos los colores de la barra y actualizamos la serie por defecto
      const barColors = this.colorDefiner.getBarColorCode(keyMetric, mainProject);
      optionsObject.series[0].fill =  barColors.mainProjectColorCode as string;
      // Cargamos los benchmarks del proyecto principal
      optionsObject.data = this.benchmarkService.findOneMetricBenchmarks(keyMetric as keyof Benchmark, mainProject);
    }

    return optionsObject as AgChartOptions;
  }

  /**
   * Formatea el string de la métrica obtenida de la ruta para que pueda  ser usada como clave en
   * el array de benchmarks
  */
  private keyableMetric(metric: string): string {
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
   * Crea una configuración de gráfico por defecto
   * @returns Una configuración de gráficos sin datos cargados y con un eje y serie por defecto
   */
  private createBlankChartOptions() : Chart {
    return {
      axes: [
        {
          // Ajustes del eje inferior (fechas de evaluaciones)
          type: 'category',
          position: 'bottom',
          label: {
            color: 'white', 
          }
        },
        {
          // Ajustes del eje izquierdo (proyecto principal)
          type: 'number',
          position: 'left',
          keys: ['mainMetric'],
          label: {
            color: 'white',
          },
        },       
      ],
      series: [
        // Primera serie por defecto, la del proyecto principal
        { xKey: 'period', yKey: 'mainMetric', type: 'bar', fill: '#00cc36'}
      ],
      background: {
        fill: '#121212', // Color de fondo del gráfico
      },
      // Donde se cargarán los valores tanto del proyecto principal como del secundario, si lo hubiere  
      data: [],
      legend: {
        item: {
            toggleSeriesVisible: false,
        }
      }
    } as Chart;
  }

}
