import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-card-list',
  templateUrl: './project-card-list.component.html',
  styleUrls: ['./project-card-list.component.scss'],
})
export class ProjectCardListComponent  implements OnInit {

  @Input() projects: Project[] = [];
  @Input() searchText?: string

  constructor(private router: Router) { }

  ngOnInit() {
    this.projects.sort((a, b) => a.title.localeCompare(b.title));
  }

  navigateTo(path: string): void {
    this.router.navigate([path], {replaceUrl: true});
  }

}
