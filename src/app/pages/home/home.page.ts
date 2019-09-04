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
  travel = null;

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe();
    //TIRAR O TAKE 4 para chamar infinitamente o get
    //const takeFourNumbers = numbers.pipe();

    takeFourNumbers.subscribe(x => this.travelService.getDetails().subscribe(data => {
      this.travel = data;
    }));

    this.travelService.getDetails().subscribe(data => {
      this.travel = data;
    });

    this.travelService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  //DAR UNSUBSCRIBE NOS METODOS ACIMA É NOIS
  ngOnDestroy(){
  }
}
