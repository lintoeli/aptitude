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

  @Input() metric: string = "";
  @Input() mainProject: string = "";
  @Input() sideProject: string = "undefined";
  public chartOptions!: AgChartOptions;
  private subscription: Subscription = new Subscription();

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    // Inicializamos el gráfico con las opciones correctas
    this.subscription.add(
      this.chartService.sideProject$.subscribe(project => {
        if (project) {
          this.loadChartOptions(this.metric, this.mainProject, project.name);
        } else {
          this.loadChartOptions(this.metric, this.mainProject);
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reaccionamos solo a los cambios en 'sideProject'
    if (changes['sideProject']) {
      this.loadChartOptions(this.metric, this. mainProject, changes['sideProject'].currentValue);
    } else {
      this.loadChartOptions(this.metric, this. mainProject)
    }
  }

  private loadChartOptions(metric: string, mainProject: string, sideProject?: string): void {
    // Cambiamos las opciones del gráfico basadas en la existencia de un sideProject o no
    if (sideProject) {
      this.chartOptions =  this.chartService.buildChart(metric, mainProject, sideProject);
    } else {
      this.chartOptions = this.chartService.buildChart(metric, mainProject);
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
