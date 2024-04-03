import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metric-menu',
  templateUrl: './metric-menu.component.html',
  styleUrls: ['./metric-menu.component.scss'],
})
export class MetricMenuComponent  implements OnInit {

  @Input() project?: String;

  constructor(private router: Router) {

  }

  ngOnInit() {
    
  }

  navigateTo(path: string): void {
    this.router.navigate([path], {replaceUrl: true});
  }

}
