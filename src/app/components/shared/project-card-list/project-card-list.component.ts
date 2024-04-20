import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ColorDefinerService } from 'src/app/services/color-definer/color-definer.service';
import { CardMetricsColors } from 'src/app/models/card-metrics-colors.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-card-list',
  templateUrl: './project-card-list.component.html',
  styleUrls: ['./project-card-list.component.scss'],
})
export class ProjectCardListComponent  implements OnInit {

  @Input() projects: Project[] = [];
  @Input() searchText?: string

  cardMetricsColors: CardMetricsColors[] = [];
  constructor(private router: Router, 
              private colorDefiner: ColorDefinerService, 
              private projectService: ProjectService) { }

  ngOnInit() {
    this.projects.sort((a, b) => a.title.localeCompare(b.title));

    this.cardMetricsColors = [];

    this.projects.forEach(p => {
      this.cardMetricsColors.push(this.colorDefiner.getMetricsCardColor(p));
    })

  }

  findProject(projectName: string){
    return this.projectService.findOneProjectByName(projectName);
  }

  navigateTo(path: string): void {
    this.router.navigate([path], {replaceUrl: true});
  }

}
