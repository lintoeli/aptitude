import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Benchmark, DashboardBenchmark, SimpleBenchmark } from 'src/app/models/benchmark.model';
import { Project } from 'src/app/models/project.model';
import { ProjectAPIService } from 'src/app/services/api/project/project.api.service';
import { BenchmarkService } from 'src/app/services/benchmark/benchmark.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  @Input() projectTitle: string = "";

  public metric!: string;

  public project?: Project;

  // Info del panel
  public periodVariation!: string;
  public currentValue!: number;
  public bestValue!: SimpleBenchmark;
  public worstValue!: SimpleBenchmark;
  public bestGlobalValue !:  DashboardBenchmark;
  public bestGlobalValueTitle !: string;
  public worstGlobalValue !: DashboardBenchmark;
  public worstGlobalValueTitle !: string;

  loading : boolean = true;

  constructor(private projectService: ProjectService,
              private projectAPIService: ProjectAPIService,
              private router: Router,
              private benchmarkService: BenchmarkService) { }

  async ngOnInit() {
    this.loading = true;
    // Obtenemos de la ruta la métrica que hay que mostrar
    this.metric = this.benchmarkService.keyableMetric(this.router.url.split('/')[1]);
    
    // Obtenemos el proyecto
    this.project = await firstValueFrom(this.projectAPIService.getProjectByName(this.projectTitle));

    //this.project = await firstValueFrom(this.projectAPIService.getProjectByName(this.projectTitle));

    // Obtenemos el resto de info del panel
    const periodVariationNumber = await this.benchmarkService.getPreviousPeriodVariation(this.metric as keyof Benchmark, this.project.name);
    periodVariationNumber >= 0 ? this.periodVariation = "+" + periodVariationNumber.toFixed(2) : this.periodVariation = periodVariationNumber.toFixed(2);

    this.currentValue = this.benchmarkService.getLastProjectBenchmark(this.project.name)[this.metric as keyof Benchmark] as number;

    this.bestValue = await this.benchmarkService.getBestBenchmark(this.metric as keyof Benchmark, this.project.name) as SimpleBenchmark;

    this.worstValue = await this.benchmarkService.getWorstBenchmark(this.metric as keyof Benchmark, this.project.name) as SimpleBenchmark;

    this.bestGlobalValue = await this.benchmarkService.getGlobalBestBenchmark(this.metric as keyof Benchmark) as DashboardBenchmark;
    this.bestGlobalValueTitle = await (await firstValueFrom(this.projectAPIService.getProjectByName(this.bestGlobalValue.projectName))).title;

    this.worstGlobalValue = await this.benchmarkService.getGlobalWorstBenchmark(this.metric as keyof Benchmark) as DashboardBenchmark;
    this.worstGlobalValueTitle = (await firstValueFrom(this.projectAPIService.getProjectByName(this.worstGlobalValue.projectName))).title;


    this.loading = false;
  }

  findProjectTitle(projectName: string){
    return this.projectService.findOneProjectByName(projectName).title;
  }
}
