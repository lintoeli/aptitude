import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-freq-details',
  templateUrl: './release-freq-details.page.html',
  styleUrls: ['./release-freq-details.page.scss'],
})
export class ReleaseFreqDetailsPage implements OnInit {

  project?: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.project = this.route.snapshot.params['project'];
  }


}
