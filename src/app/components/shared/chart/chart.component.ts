import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  template:
  `
  <div *ngIf="loading">
    <p>Cargando grafica...</p>
  </div>

  <div *ngIf="!loading">
    <div class="chart-container">
      <ag-charts-angular
        [options]="chartOptions">
      </ag-charts-angular>
    </div>
  </div>
  
  `,
  styleUrls: ['./chart.component.scss'],
  imports: [CommonModule, AgChartsAngular],
})
export class ChartComponent implements OnInit, OnDestroy{

  @Input() metric: string = "";
  @Input() mainProject: string = "";
  @Input() sideProject: string = "undefined";
  public chartOptions!: AgChartOptions;
  private subscription: Subscription = new Subscription();

  loading: boolean = true;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    // Inicializamos el gráfico con las opciones correctas
    this.subscription.add(
      this.chartService.sideProject$.subscribe(async project => {
        this.loading = true;
        if (project) {
          console.log("Proyecto doble en chart component");
          await this.loadChartOptions(this.metric, this.mainProject, project.name);
          console.log("se cargaron las opciones: ", this.chartOptions);
          this.loading = false;
        } else {
          console.log("Proyecto en chart component");
          await this.loadChartOptions(this.metric, this.mainProject);
          console.log("se cargaron las opciones: ", this.chartOptions);
          this.loading = false;
        }
      })
    );
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // Reaccionamos solo a los cambios en 'sideProject'
    if (changes['sideProject']) {
      await this.loadChartOptions(this.metric, this. mainProject, changes['sideProject'].currentValue);
    } else {
      await this.loadChartOptions(this.metric, this. mainProject)
    }
  }

  private async loadChartOptions(metric: string, mainProject: string, sideProject?: string): Promise<void> {
    // Cambiamos las opciones del gráfico basadas en la existencia de un sideProject o no
    if (sideProject) {
      this.chartOptions =  await this.chartService.buildChart(metric, mainProject, sideProject);
    } else {
      this.chartOptions = await this.chartService.buildChart(metric, mainProject);
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
