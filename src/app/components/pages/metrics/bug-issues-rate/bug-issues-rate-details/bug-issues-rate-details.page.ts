import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Subscription, first } from 'rxjs';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-bug-issues-rate-details',
  templateUrl: './bug-issues-rate-details.page.html',
  styleUrls: ['./bug-issues-rate-details.page.scss'],
})
export class BugIssuesRateDetailsPage implements OnInit {

  public project?: String;
  public doubleChart!: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private chartService: ChartService, private router: Router) {}

  ngOnInit() {
    
    // Obtenemos de la ruta el nombre del proyecto
    this.project = this.route.snapshot.params['project'];
    
    // Aquí nos suscribimos al estado de doubleChart
    this.subscription.add(this.chartService.doubleChart$.subscribe(doubleChart => {
      this.doubleChart = doubleChart;
    }));

    this.router.events.pipe(
      first(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('cambio de ruta', event);
    });
  }

  ngOnDestroy() {
    // Desuscribimos para optimizar memoria
    this.subscription.unsubscribe();
  }

  switchChart() {
    // Llamada al servicio para cambiar el estado de la flag de doble grafico
    this.chartService.toggleDoubleChart();
  }


}
