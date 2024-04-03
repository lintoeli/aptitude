import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-time-repair-details',
  templateUrl: './time-repair-details.page.html',
  styleUrls: ['./time-repair-details.page.scss'],
})
export class TimeRepairDetailsPage implements OnInit {

  public project?: String;
  constructor(private route: ActivatedRoute, private chartService: ChartService, private router: Router) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];

    this.router.events.pipe(
      first(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('cambio de ruta:', event);
      
    });
  }
}
