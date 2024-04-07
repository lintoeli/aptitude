import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  @Input() projectTitle: string = "";

  public project?: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.project = this.projectService.findOneProjectByName(this.projectTitle);
  }

}
