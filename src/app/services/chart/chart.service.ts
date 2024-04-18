import { Injectable } from '@angular/core';
import { BehaviorSubject, range } from 'rxjs';
import { AgChartOptions } from 'ag-charts-community';
import { Project } from 'src/app/models/project.model';
import { BenchmarkService } from '../benchmark/benchmark.service';
import { ProjectService } from '../project/project.service';
import { Benchmark } from 'src/app/models/benchmark.model';
import { Chart } from 'src/app/models/chart.interface';

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

  //Opciones gráfico SIMPLE
  public dafaultSimpleChartOptions: AgChartOptions =  {
    // Data: Data to be displayed in the chart
    data: [
      { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
      { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
      { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
      { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
      { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales', fill: "#45d918" }],

    background: {
      fill: '#121212', // Color de fondo del gráfico
    },

    axes: [
      {
        // Ajustes del eje izquierdo (proyecto principal)
        type: 'number',
        position: 'left',
        label: {
          color: 'white', 
        },
      },
      {
        // Ajustes del eje inferior (fechas de evaluaciones)
        type: 'category',
        position: 'bottom',
        label: {
          color: 'white', 
        }
      }
    ],
    // Desactiva el mostrar/ocultar elementos del grafico
    legend: {
      item: {
          toggleSeriesVisible: false,
      }
  }

  };


  //Opciones gráfico DOBLE
  public dafaultChartOptionsWithTwoSeries: AgChartOptions =  {
    // Data: Data to be displayed in the chart
    data: [
      { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
      { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
      { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
      { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
      { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales', fill: "#45d918" },
             { type: 'bar', xKey: 'month', yKey: 'avgTemp', fill: "#ffea00" }],

    background: {
      fill: '#121212', // Color de fondo del gráfico
    },

    axes: [
      {
        // Ajustes del eje izquierdo (proyecto principal)
        type: 'number',
        position: 'left',
        keys: ['iceCreamSales'],
        label: {
          color: 'white',
        },
      },

      {
        // Ajustes del eje derecho (proyecto secundario)
        type: 'number',
        position: 'right',
        keys: ['avgTemp'],
        label: {
          color: 'white', 
        }
      },
      {
        // Ajustes del eje inferior (fechas de evaluaciones)
        type: 'category',
        position: 'bottom',
        label: {
          color: 'white', 
        }
      },
    ],

    // Desactiva el mostrar/ocultar elementos del grafico
    legend: {
      item: {
          toggleSeriesVisible: false,
      }
  }

  };
    
  
  private chartOptionsSource = new BehaviorSubject<AgChartOptions | null>(null);
  currentChartOptions = this.chartOptionsSource.asObservable();

  constructor(private benchmarkService: BenchmarkService, private projectService: ProjectService) {}

  updateChartOptions(newOptions: Chart) {
    this.chartOptionsSource.next(newOptions as  AgChartOptions);
  }

  // Cambia el estado de la flag para mostrar o no dos series
  toggleDoubleChart() {
    const current = this.doubleChartSource.getValue();
    this.doubleChartSource.next(!current);
  }

  // Cambia el proyecto secundario
  setSideProject(project: Project | undefined) {
    this.sideProjectSource.next(project);
  }

  // Pone el grafico en simple cuando se cierra el chart
  disableDoubleChartOnDestroy(){
    this.doubleChartSource.next(false);
  }

  buildChart(metric: string, mainProject: string, sideProject? : string) : void {
    // Obtenemos la métrica a representar en el gráfico
    const keyMetric = this.keyableMetric(metric);

    if (sideProject){
      //console.log('aqui entra')
      // Obtenemos la configuración actual del gráfico
      
      let optionsObject = this.dafaultChartOptionsWithTwoSeries as Chart;
      optionsObject.data = this.benchmarkService.findOneMetricBenchmarksForTwoProjects(keyMetric as keyof Benchmark, mainProject, sideProject);
      console.log('datos a cargar DOBLE', optionsObject.data)
      optionsObject.series[0].xKey = 'period'
      optionsObject.series[0].yKey = 'mainMetric';
      optionsObject.series[1] = { xKey: 'period', yKey: 'sideMetric', type: 'bar', fill: '#fccf03'};
      optionsObject.axes[0].keys = ['mainMetric'];
      optionsObject.axes[1].keys = ['sideMetric'];

      this.updateChartOptions(optionsObject);
      this.currentChartOptions.toPromise().then(res => console.log(res));
      
    } else {
      let optionsObject = this.dafaultSimpleChartOptions as Chart;

      optionsObject.data = this.benchmarkService.findOneMetricBenchmarks(keyMetric as keyof Benchmark, mainProject); // Cambiamos el array de datos
      console.log('datos a cargar SIMPLE', optionsObject.data)

      optionsObject.series[0].xKey = 'period'
      optionsObject.series[0].yKey = 'mainMetric';

      this.updateChartOptions(optionsObject);

    }
  }

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

  // private mergeBenchmarks(mainBenchmarks: Object[], sideBenchmarks: Object[]){
  //   return mainBenchmarks.map(item => {
  //     const match = sideBenchmarks.find(bItem => bItem.period === item.period);
  //     return {
  //         period: item.period,
  //         releaseFrequency: item.releaseFrequency,
  //         sideReleaseFrequency: match ? match.releaseFrequency : null
  //     };
  // });
  // }
}
