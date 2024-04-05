import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { Subscription } from 'rxjs';
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
  public chartOptions!: AgChartOptions;
  private subscription: Subscription = new Subscription();

  constructor(private chartService: ChartService) { 

  }
  
  ngOnInit(): void {
    this.subscription.add(
      this.chartService.currentChartOptions.subscribe((options) => {
        if (options) {
          this.chartOptions = options;
        } else {
          this.chartOptions = this.chartService.dafaultChartOptions;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
