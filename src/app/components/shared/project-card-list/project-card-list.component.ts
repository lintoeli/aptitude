import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-card-list',
  templateUrl: './project-card-list.component.html',
  styleUrls: ['./project-card-list.component.scss'],
})
export class ProjectCardListComponent  implements OnInit {

  @Input() projects: Project[] = [];
  @Input() searchText?: string

  constructor() { }

  ngOnInit() {
    this.projects.sort((a, b) => a.title.localeCompare(b.title));
  }

}
