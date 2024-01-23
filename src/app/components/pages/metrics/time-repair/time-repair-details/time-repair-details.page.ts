import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-repair-details',
  templateUrl: './time-repair-details.page.html',
  styleUrls: ['./time-repair-details.page.scss'],
})
export class TimeRepairDetailsPage implements OnInit {

  project?: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];
  }

}
