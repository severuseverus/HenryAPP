import { Component } from '@angular/core';
import { TravelService } from './../../services/travel.service';
import { UserService } from './../../services/user.service';
import { Travel } from '../../models/travel.model';
import { Storage } from '@ionic/storage';

import { interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/pt';

registerLocaleData(localeFr, 'pt');

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

    const travels = await this.calculateGlobalScore();
    this.pontuacaoGlobal = 1000;
    this.travel = travels.filter((_: Travel) => _.status == 1)[0];
    this.repeat.subscribe(() => this.getTravel());
  }

  goToTravelHistory() {
    this.router.navigate(['travel-history']);
  }

  async calculateGlobalScore() {
    const travels = (await this.travelService.getMedia(this.user._id))["_data"];
    const pontuacao = travels.reduce((total: number, travel: Travel) => (travel.status == 2) ? total + travel.actualScore : total, 0);
    this.pontuacaoGlobal = pontuacao / travels.filter((_: Travel) => _.status == 2).length;
    return travels;
  }

  async getTravel() {
    const response = await this.travelService.getDetails(this.user._id);
    this.travel = (response["_data"].length > 0) ? response["_data"][0] : new Travel();
  }

  async sair() {
    await this.userService.logout();
    this.shouldTake = false;
    this.travel = new Travel();
    this.pontuacaoGlobal = 0;
    this.router.navigate(['login']);
  }

}
