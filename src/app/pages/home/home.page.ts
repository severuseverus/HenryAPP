import { Component, OnInit } from '@angular/core';
import { TravelService } from './../../services/travel.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user = null;
  travel = null;
  helper =null;
  infractions= [];
  pont = 0;
  pontuacaoGlobal = 0;

  constructor(private travelService: TravelService, private router: Router) { }

  async ngOnInit() {
    const time = interval(5000);
    const repeat = time.pipe();
    this.user = (await this.travelService.getUser())["_data"][0];

    let pont = 0;
    this.helper = (await this.travelService.getMedia(this.user._id))["_data"];
    for (let key in this.helper) {
      pont += this.helper[key]['actualScore'];
    }
    this.pontuacaoGlobal = pont / this.helper.length;

    repeat.subscribe(() => this.doGetTravel()); 

    this.doGetTravel();

    console.log(this.travel);
    console.log(this.infractions);
  }

  goToTravelHistory(){
    this.router.navigate(['travel-history']);
  }

  async doGetTravel(){
      this.travel = (await this.travelService.getDetails(this.user._id))["_data"][0];
      this.infractions = this.travel.infractions;
  }

}
