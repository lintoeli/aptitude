import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-lead-time-details',
  templateUrl: './lead-time-details.page.html',
  styleUrls: ['./lead-time-details.page.scss'],
})
export class LeadTimeDetailsPage implements OnInit {

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

  constructor(private route: ActivatedRoute,  
              private router: Router,
              private chartService: ChartService,
              private projetService: ProjectService) {}

  ngOnInit() {
    // Obtenemos de la ruta la métrica que hay que mostrar
    this.metric = this.router.url.split('/')[1];
    
    // Obtenemos de la ruta el nombre del proyecto
    this.project = this.route.snapshot.params['project'];

    // Obtenemos benchmarks:
    // if (this.project){
    //   this.chartService.buildChart(this.metric, this.project)
    // }
  
    // Obtenemos la lista de proyectos
    this.allProjects = this.projetService.getAllProjects();
    
    // Aquí nos suscribimos al estado de doubleChart
    this.subscription.add(this.chartService.doubleChart$.subscribe(doubleChart => {
      this.chartService.buildChart(this.metric, this.project)
      this.doubleChart = doubleChart;
    }));

    // Nos suscribimos al cambio de proyecto secundario para mostrarlo en el desplegable
    this.subscription.add(this.chartService.sideProject$.subscribe(project => {
      this.sideProject = project;
      if(project){
        this.chartService.buildChart(this.metric, this.project, project.name);
        this.dropdownName = project.title;
      } else {
        this.chartService.buildChart(this.metric, this.project)
        this.dropdownName = "Selecciona un proyecto para comparar";
      }
    }));


  }

  ngOnDestroy() {
    // Desuscribimos para optimizar memoria
    this.subscription.unsubscribe();
  }

  switchChart() {
    // Llamada al servicio para cambiar el estado de la flag de doble grafico
    this.chartService.toggleDoubleChart();
  }

  changeSideProject(event: any){
    console.log(event.target.value);
    console.log(typeof event.target.value);
    this.sideProject = this.projetService.findOneProjectByName(event.target.value);
    this.chartService.setSideProject(this.sideProject);
    if(event.target.value !== 'undefined'){
      this.chartService.buildChart(this.metric, this.project, this.sideProject.name)
    } else{
      this.chartService.buildChart(this.metric, this.project);
    }
  }

}
