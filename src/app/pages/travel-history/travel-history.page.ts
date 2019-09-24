import { Component, OnInit } from '@angular/core';
import { TravelService } from './../../services/travel.service';
import { Storage } from '@ionic/storage';
import { Travel } from 'src/app/models/travel.model';


@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.page.html',
  styleUrls: ['./travel-history.page.scss'],
})
export class TravelHistoryPage implements OnInit {
  user = null;
  travels = new Array<Travel>();

  constructor(private travelService: TravelService, private storage: Storage) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.user = await this.storage.get('user');
    this.travels = (await this.travelService.getTravels(this.user._id))["_data"];
    if (this.travels.length == 0) {
      this.travels = (await this.travelService.getDetails(this.user._id))["_data"];
      if (this.travels.length == 0) {
        this.travels = (await this.travelService.getTravelsCreated(this.user._id))["_data"];
      }
    }

  }

}
