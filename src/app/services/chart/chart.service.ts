import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AgChartOptions } from 'ag-charts-community';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public dafaultChartOptions: AgChartOptions =  {
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
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],

    background: {
      fill: '#121212', // Color de fondo del gráfico
    },

    axes: [
      {
        // Para los ejes, ajusta según sea necesario
        type: 'number',
        position: 'left',
        label: {
          color: 'white', // Color de la fuente de las etiquetas del eje
        },
      },
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: 'white', // Color de la fuente de las etiquetas del eje
        }
      }
    ]

  };
    
  
  private chartOptionsSource = new BehaviorSubject<AgChartOptions | null>(null);
  currentChartOptions = this.chartOptionsSource.asObservable();

  constructor() {}

  updateChartOptions(options: AgChartOptions) {
    this.chartOptionsSource.next(options);
  }
}
