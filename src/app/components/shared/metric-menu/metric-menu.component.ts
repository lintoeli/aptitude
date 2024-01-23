import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-menu',
  templateUrl: './metric-menu.component.html',
  styleUrls: ['./metric-menu.component.scss'],
})
export class MetricMenuComponent  implements OnInit {

  @Input() project?: String;

  constructor() {

  }

  ngOnInit() {}

}
