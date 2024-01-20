import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{
  project! : String;
  constructor(private route: ActivatedRoute) {

  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {this.project = params['project']});
    console.log(this.route.params)
  }

}
