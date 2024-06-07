import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectAPIService } from 'src/app/services/api/project/project.api.service';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-release-freq-details',
  templateUrl: './release-freq-details.page.html',
  styleUrls: ['./release-freq-details.page.scss'],
})
export class ReleaseFreqDetailsPage implements OnInit {
  // Metrica a representar
  public metric!: string;

  // Nombre del Proyecto a cargar
  public projectName!: string;

  // Lista de todos los proyectos
  public allProjects!: Project[];

  // Proyecto para comparar
  public sideProject?: Project;

  public doubleChart!: boolean;
  private subscription: Subscription = new Subscription();

  dropdownName?: string;

  public showOptions: boolean = false;

  loading: boolean = true;

  constructor(private route: ActivatedRoute,  
              private router: Router,
              private chartService: ChartService,
              private projectService: ProjectService,
              private projectAPIService: ProjectAPIService) {}

  async ngOnInit() {
    // Obtenemos de la ruta la métrica que hay que mostrar
    this.metric = this.router.url.split('/')[1];
    
    // Obtenemos de la ruta el nombre del proyecto
    this.projectName = this.route.snapshot.params['project'];
    // Obtenemos la lista de proyectos y los ordenamos
    this.allProjects = await firstValueFrom(this.projectAPIService.getAllProjects());
    this.allProjects.sort((a, b) => a.title.localeCompare(b.title));

    // Aquí nos suscribimos al estado de doubleChart
    this.subscription.add(this.chartService.doubleChart$.subscribe(async doubleChart => {
      await this.chartService.buildChart(this.metric, this.projectName);
      console.log("builded chart")
      this.doubleChart = doubleChart;
      this.loading = false;
    }));

    // Nos suscribimos al cambio de proyecto secundario para mostrarlo en el desplegable
    this.subscription.add(this.chartService.sideProject$.subscribe(project => {
      this.sideProject = project;
      if(project){
        this.dropdownName = project.title;
      } else {
        this.dropdownName = "Selecciona un proyecto para comparar";
      }
    }));


  }

  changeSideProject(event: any){
    this.projectAPIService.getProjectByName(event.target.value).subscribe((project) =>{
      if(project) {
        this.sideProject = project;
        this.chartService.setSideProject(this.sideProject);
      }
    });
    
  }

  resetSelection(){
    this.sideProject = undefined;
    this.chartService.setSideProject(undefined);
  }

  ngOnDestroy() {
    // Desuscribimos para optimizar memoria
    this.subscription.unsubscribe();
  }

}
