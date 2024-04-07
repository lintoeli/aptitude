import { Injectable } from '@angular/core';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [{title: 'Angular', name: 'angular', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'TensorFlow', name: 'tensorflow', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'Spring Boot', name: 'springboot', metricA: 1, metricB: 2, metricC: 3, metricD: 4},
                        {title: 'Electron', name: 'electron', metricA: 2, metricB: 5, metricC: 4, metricD: 3},
                        {title: 'Golang', name: 'golang', metricA: 4, metricB: 2, metricC: 5, metricD: 1},
                        {title: 'React', name: 'react', metricA: 2, metricB: 3, metricC: 4, metricD: 5},
                        {title: 'Vue.js', name: 'vuejs', metricA: 3, metricB: 4, metricC: 5, metricD: 6},
                        {title: 'Django', name: 'django', metricA: 2, metricB: 1, metricC: 3, metricD: 4},
                        {title: 'Flask', name: 'flask', metricA: 1, metricB: 3, metricC: 2, metricD: 5},
                        {title: 'Ruby on Rails', name: 'rubyonrails', metricA: 3, metricB: 2, metricC: 1, metricD: 4},
                        {title: 'Node.js', name: 'nodejs', metricA: 4, metricB: 3, metricC: 2, metricD: 1},
                        {title: 'Express', name: 'express', metricA: 2, metricB: 2, metricC: 3, metricD: 3},
                        {title: 'Laravel', name: 'laravel', metricA: 1, metricB: 4, metricC: 2, metricD: 2},
                        {title: 'SwiftUI', name: 'swiftui', metricA: 5, metricB: 1, metricC: 4, metricD: 3},
                        {title: 'Kotlin', name: 'kotlin', metricA: 3, metricB: 3, metricC: 3, metricD: 3}
                        ]

  constructor() { }

  getAllProjects(){
    return this.projects;
  }

  findOneProjectByName(name: string){
    return this.projects.filter(p => p.name === name)[0];
  }
}
