import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  template:
  `<div class="chart-container">
      <ag-charts-angular
      [options]="chartOptions">
    </ag-charts-angular>
  </div>
  `,
  styleUrls: ['./chart.component.scss'],
  imports: [AgChartsAngular],
})
export class ChartComponent implements OnInit, OnDestroy{

  @Input() useTwoSeries: boolean = false;
  public chartOptions!: AgChartOptions;
  private subscription: Subscription = new Subscription();

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    // Inicializamos el gráfico con las opciones correctas
    //this.loadChartOptions(this.useTwoSeries);
    this.subscription.add(
      this.chartService.sideProject$.subscribe(project => {
        if (project) {
          // Aquí ajustas las opciones del gráfico basadas en el proyecto seleccionado
          this.loadChartOptions(true);
        } else {
          // Opcionalmente, maneja el caso de "null" si quieres resetear el gráfico o establecer opciones predeterminadas
          this.loadChartOptions(false);
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reaccionamos solo a los cambios en 'useTwoSeries'
    if (changes['useTwoSeries']) {
      this.loadChartOptions(changes['useTwoSeries'].currentValue);
    }
  }

  private loadChartOptions(useTwoSeries: boolean): void {
    // Cambiamos las opciones del gráfico basadas en 'useTwoSeries'
    this.chartOptions = useTwoSeries 
      ? this.chartService.dafaultChartOptionsWithTwoSeries
      : this.chartService.dafaultSimpleChartOptions;
      
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
