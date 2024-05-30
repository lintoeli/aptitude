import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
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

  // Proyecto a cargar
  public project!: string;

  // Lista de todos los proyectos
  public allProjects!: Project[];

  // Proyecto para comparar
  public sideProject?: Project;

  public doubleChart!: boolean;
  private subscription: Subscription = new Subscription();

  dropdownName?: string;

  public showOptions: boolean = false;

  constructor(private route: ActivatedRoute,  
              private router: Router,
              private chartService: ChartService,
              private projectService: ProjectService) {}

  ngOnInit() {
    // Obtenemos de la ruta la métrica que hay que mostrar
    this.metric = this.router.url.split('/')[1];
    
    // Obtenemos de la ruta el nombre del proyecto
    this.project = this.route.snapshot.params['project'];

    // Obtenemos la lista de proyectos
    this.allProjects = this.projectService.getAllProjects();
    
    // Aquí nos suscribimos al estado de doubleChart
    this.subscription.add(this.chartService.doubleChart$.subscribe(doubleChart => {
      this.chartService.buildChart(this.metric, this.project)
      this.doubleChart = doubleChart;
    }));

    // Nos suscribimos al cambio de proyecto secundario para mostrarlo en el desplegable
    this.subscription.add(this.chartService.sideProject$.subscribe(project => {
      this.sideProject = project;
      if(project){
        console.log(project);
        this.dropdownName = project.title;
      } else {
        this.dropdownName = "Selecciona un proyecto para comparar";
      }
    }));


  }

  changeSideProject(event: any){
    this.sideProject = this.projectService.findOneProjectByName(event.target.value);
    this.chartService.setSideProject(this.sideProject);
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
