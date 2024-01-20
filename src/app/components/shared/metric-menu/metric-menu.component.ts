import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-metric-menu',
  templateUrl: './metric-menu.component.html',
  styleUrls: ['./metric-menu.component.scss'],
})
export class MetricMenuComponent  implements OnInit {

  project?: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {console.log(params)}); 
    this.route.params.subscribe(params => {this.project = params['project']});
  }

  ngOnInit() {}

}
