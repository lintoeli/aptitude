import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-bug-issues-rate-details',
  templateUrl: './bug-issues-rate-details.page.html',
  styleUrls: ['./bug-issues-rate-details.page.scss'],
})
export class BugIssuesRateDetailsPage implements OnInit {

  public project?: String;

  public allProjects!: Project[];
  public sideProject?: Project;
  public doubleChart!: boolean;
  private subscription: Subscription = new Subscription();
  dropdownName?: string;

  constructor(private route: ActivatedRoute,  
              private router: Router,
              private chartService: ChartService,
              private projetService: ProjectService) {}

  ngOnInit() {
    
    // Obtenemos de la ruta el nombre del proyecto
    this.project = this.route.snapshot.params['project'];

    // Obtenemos la lista de proyectos
    this.allProjects = this.projetService.getAllProjects();
    
    // Aquí nos suscribimos al estado de doubleChart
    this.subscription.add(this.chartService.doubleChart$.subscribe(doubleChart => {
      this.doubleChart = doubleChart;
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

  ngOnDestroy() {
    // Desuscribimos para optimizar memoria
    this.subscription.unsubscribe();
  }

  switchChart() {
    // Llamada al servicio para cambiar el estado de la flag de doble grafico
    this.chartService.toggleDoubleChart();
  }

  changeSideProject(event: any){
    this.sideProject = this.projetService.findOneProjectByName(event.target.value);
    this.chartService.setSideProject(this.sideProject);
  }



}
