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

  private useTwoSeriesSubject = new BehaviorSubject<boolean>(this.useTwoSeries);
  useTwoSeries$: Observable<boolean> = this.useTwoSeriesSubject.asObservable();

  public chartOptions!: AgChartOptions;
  private subscription: Subscription = new Subscription();

  constructor(private chartService: ChartService) { 

  }
  
  ngOnInit(): void {
    this.useTwoSeries$.subscribe(useTwo => {
      this.loadChartOptions(useTwo);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['useTwoSeries']) {
      this.useTwoSeriesSubject.next(changes['useTwoSeries'].currentValue);
    }
  }

  private loadChartOptions(useTwoSeries: boolean): void {
    
    if (useTwoSeries) {
      this.chartService.doubleChart = false;
      this.chartService.updateChartOptions(this.chartService.dafaultChartOptionsWithTwoSeries);
      this.chartOptions = this.chartService.dafaultChartOptionsWithTwoSeries;
    } else {
      this.chartService.doubleChart = true;
      this.chartService.updateChartOptions(this.chartService.dafaultSimpleChartOptions);
      this.chartOptions = this.chartService.dafaultSimpleChartOptions;
    }
    // Aquí puedes implementar la lógica para aplicar las opciones al gráfico
  }

  ngOnDestroy(): void {
    this.chartService.doubleChart = false;
    this.subscription.unsubscribe();
  }

}
