import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { first } from 'rxjs';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-bug-issues-rate-details',
  templateUrl: './bug-issues-rate-details.page.html',
  styleUrls: ['./bug-issues-rate-details.page.scss'],
})
export class BugIssuesRateDetailsPage implements OnInit {

  public project?: String;
  public chart?: Chart;
  constructor(private route: ActivatedRoute, private chartService: ChartService, private router: Router) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];

    this.router.events.pipe(
      first(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('cambio de ruta', event);
      
    });
  }


}
