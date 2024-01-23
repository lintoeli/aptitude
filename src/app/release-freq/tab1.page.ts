import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  project! : String;
  constructor(private route: ActivatedRoute) {

  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {this.project = params['project']});
    console.log(this.route.params)
  }

}
