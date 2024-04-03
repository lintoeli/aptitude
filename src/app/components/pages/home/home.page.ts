import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects: Project[] = []
  searchText: string = '';
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    // Cargamos los proyectos
    this.projects = this.projectService.getAllProjects();
  }

  buscar( event: any ){
    this.searchText = event.detail.value;
  }
}
