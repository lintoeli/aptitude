import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-time-details',
  templateUrl: './lead-time-details.page.html',
  styleUrls: ['./lead-time-details.page.scss'],
})
export class LeadTimeDetailsPage implements OnInit {

  project?: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];
  }

}
