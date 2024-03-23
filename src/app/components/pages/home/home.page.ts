import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  projects: Project[] = [{title: 'Angular', name: 'angular', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'TensorFlow', name: 'tensorflow', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'Spring Boot', name: 'springboot', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'Manolo', name: 'springboot', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'Sanpedro', name: 'springboot', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        ]
  constructor() { }

  ngOnInit() {
  }

}
