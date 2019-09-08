import { Component, OnInit } from '@angular/core';
import { TravelService } from './../../services/travel.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.page.html',
  styleUrls: ['./travel-history.page.scss'],
})
export class TravelHistoryPage implements OnInit {
  user = null;
  travels= [];

  constructor(private travelService: TravelService) { }

  async ngOnInit() {
    this.user = (await this.travelService.getUser())["_data"][0];
    console.log("user: ");
    console.log(this.user);
    this.travels = (await this.travelService.getTravels(this.user._id))["_data"];
    console.log("travel: ");
    console.log(this.travels);

  }

}
