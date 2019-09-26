import { Component } from '@angular/core';
import { TravelService } from './../../services/travel.service';
import { UserService } from './../../services/user.service';
import { Travel } from '../../models/travel.model';
import { Storage } from '@ionic/storage';

import { interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  user = null;
  travel: Travel = new Travel();
  helper = null;
  pontuacaoGlobal = 0;
  repeat: Observable<number>;
  shouldTake = true;

  constructor(
    private travelService: TravelService,
    private router: Router,
    private userService: UserService,
    private storage: Storage) { }

  async ionViewWillEnter() {
    const time = interval(5000);
    this.repeat = time.pipe(takeWhile(() => this.shouldTake));

    this.user = await this.storage.get('user');

    let pont = 0;
    this.helper = (await this.travelService.getMedia(this.user._id))["_data"];
    for (let key in this.helper) {
      pont += this.helper[key]['actualScore'];
    }
    this.pontuacaoGlobal = pont / this.helper.length;
    this.repeat.subscribe(() => this.getTravel());
    await this.getTravel();
  }

  ionViewWillLeave() {
    this.shouldTake = false;
    this.travel = new Travel();
    this.pontuacaoGlobal = 0;
  }

  goToTravelHistory() {
    this.router.navigate(['travel-history']);
  }

  async getTravel() {
    const response = await this.travelService.getDetails(this.user._id);
    this.travel = (response["_data"].length > 0) ? response["_data"][0] : new Travel();
  }

  async sair() {
    await this.userService.logout();
    this.router.navigate(['login']);
  }

}
