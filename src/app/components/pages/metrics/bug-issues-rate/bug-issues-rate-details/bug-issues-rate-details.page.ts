import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-issues-rate-details',
  templateUrl: './bug-issues-rate-details.page.html',
  styleUrls: ['./bug-issues-rate-details.page.scss'],
})
export class BugIssuesRateDetailsPage implements OnInit {

  project?: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];
  }

}
