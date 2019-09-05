import { Component, OnInit } from '@angular/core';
import { TravelService } from './../../services/travel.service';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user = null;
  private userId = null;
  travel = null;

  constructor(private travelService: TravelService) { }

  async ngOnInit() {
    const numbers = interval(5000);
    const takeFourNumbers = numbers.pipe();
    //TIRAR O TAKE 4 para chamar infinitamente o get
    //const takeFourNumbers = numbers.pipe();
    this.user = (await this.travelService.getUser())["_data"][0];

    takeFourNumbers.subscribe(async x => {
      this.travel = (await this.travelService.getDetails(this.user._id))["_data"][0];
    });

    this.travel = (await this.travelService.getDetails(this.user._id))["_data"][0];
    console.log(this.travel);
  }

  //DAR UNSUBSCRIBE NOS METODOS ACIMA É NOIS
  ngOnDestroy() {
  }
}
