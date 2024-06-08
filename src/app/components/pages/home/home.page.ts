import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CardMetricsColors } from 'src/app/models/card-metrics-colors.model';
import { Project } from 'src/app/models/project.model';
import { ProjectAPIService } from 'src/app/services/api/project/project.api.service';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ColorDefinerService } from 'src/app/services/color-definer/color-definer.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  projects: Project[] = [];
  searchText: string = '';

  cardMetricsColors!: CardMetricsColors[];

  showTooltip = false;

  loading: boolean = false;
  constructor(private projectService: ProjectService,
              private router: Router, 
              private projectAPIService: ProjectAPIService, 
              private chartService: ChartService,
              private colorDefiner: ColorDefinerService ) { }

  async ngOnInit() {
    // Limpiamos la flag de grafico doble en los detalles
    this.chartService.disableDoubleChartOnDestroy();
    this.chartService.setSideProject(undefined);
    // Cargamos los proyectos
    this.loading = true;
    // this.projectAPIService.getAllProjects().subscribe({
    //   next: (projects) => {
    //     this.projects = projects;
    //     this.projects.sort((a, b) => a.title.localeCompare(b.title));
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error al cargar los proyectos', error);
    //     // Manejo de error, por ejemplo, mostrar un mensaje al usuario
    //   }
    // });
    this.projects = await firstValueFrom(this.projectAPIService.getAllProjects());
    this.projects.sort((a, b) => a.title.localeCompare(b.title));
    this.loading = this.projects.length === 0;
    
    this.cardMetricsColors = await Promise.all(this.projects.map(async p => {
      return await this.colorDefiner.getMetricsCardColor(p);
    }));
  }

  buscar( event: any ){
    this.searchText = event.detail.value;
  }

  findProject(projectName: string){
    let res = this.projects.find(p => p.name === projectName);
    return res;
  }

  navigateTo(path: string): void {
    this.router.navigate([path], {replaceUrl: true});
  }
  
}
