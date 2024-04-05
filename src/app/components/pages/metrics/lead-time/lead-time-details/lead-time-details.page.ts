import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-lead-time-details',
  templateUrl: './lead-time-details.page.html',
  styleUrls: ['./lead-time-details.page.scss'],
})
export class LeadTimeDetailsPage implements OnInit {

  public project?: String;
  public doubleChart: boolean = false;
  
  constructor(private route: ActivatedRoute, private chartService: ChartService, private router: Router) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];
    this.doubleChart = this.chartService.doubleChart

    this.router.events.pipe(
      first(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('cambio de ruta', event);
      
    });
  }

  switchChart(){
    this.chartService.doubleChart = !this.chartService.doubleChart;
    this.doubleChart = !this.doubleChart;
  }

}
