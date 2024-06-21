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
  public async buildChart(metric: string, mainProject: string, sideProject? : string) : Promise<AgChartOptions> {
    // Obtenemos la métrica a representar en el gráfico
    const keyMetric = this.benchmarkService.keyableMetric(metric);

    // Creamos una nueva configuración "en blanco"
    let optionsObject = this.createBlankChartOptions();

    let maxDataValue = 0; // Usaremos esto para calcular los dominios de los ejes

    if (sideProject){
      // Cargamos los benchmarks de ambos proyectos en la configuración
      const dataForLoad = await this.benchmarkService.findOneMetricBenchmarksForTwoProjects(keyMetric as keyof Benchmark, mainProject, sideProject);
      optionsObject.data = dataForLoad;
      //Obtenemos los colores de la barra de cada proyecto y actualizamos la serie por defecto
      const barColors = await this.colorDefiner.getBarColorCode(keyMetric, mainProject, sideProject);
      optionsObject.series[0].fill =  barColors.mainProjectColorCode as string;

      // Creamos la segunda serie de barras para representar el proyecto secundario
      optionsObject.series.push({ xKey: 'period', yKey: 'sideMetric', type: 'bar', fill: barColors.sideProjectColorCode as string});

      // Calcula el valor máximo para ajustar los ejes
      maxDataValue = Math.max(...dataForLoad.map(item => Math.max(item.mainMetric, item.sideMetric as number)));

      // Configuración de ambos ejes para que tengan el mismo rango
      optionsObject.axes = [
        {
          // Ajustes del eje inferior (fechas de evaluaciones)
          type: 'category',
          position: 'bottom',
          label: {
            color: 'white', 
          }
        },
        {
          type: 'number',
          position: 'left',
          keys: ['mainMetric'],
          label: { color: 'white' },
          min: 0, 
          max: maxDataValue * 1.1 
        },
        {
          type: 'number',
          position: 'right',
          keys: ['sideMetric'],
          label: { color: '#121212' },
          min: 0,
          max: maxDataValue * 1.1
        }
      ];

    } else {
      //Obtenemos los colores de la barra y actualizamos la serie por defecto
      const barColors = await this.colorDefiner.getBarColorCode(keyMetric, mainProject);
      optionsObject.series[0].fill =  barColors.mainProjectColorCode as string;
      // Cargamos los benchmarks del proyecto principal
      let dataForLoad = await this.benchmarkService.findOneMetricBenchmarks(keyMetric as keyof Benchmark, mainProject);
      optionsObject.data = dataForLoad;
    }
    return optionsObject as AgChartOptions;
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
        enabled: false,
        item: {
            toggleSeriesVisible: false,
        }
      }
    } as Chart;
  }

}
