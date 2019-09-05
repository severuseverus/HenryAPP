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
  private userId =null;
  travel = null;

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    const numbers = interval(100);
    const takeFourNumbers = numbers.pipe();
    //TIRAR O TAKE 4 para chamar infinitamente o get
    //const takeFourNumbers = numbers.pipe();
    this.travelService.getUser().subscribe(data => {
      this.user = data;
      this.userId = data._id;
    });

    const id ="5d65dacd896d6a4264b430ef";
    console.log(this.userId);

    if(this.user !== null){
      takeFourNumbers.subscribe(x => this.travelService.getDetails(this.user._id).subscribe(data => {
        this.travel = data;
      }));
  
      this.travelService.getDetails(this.user._id).subscribe(data => {
        this.travel = data;
      });
      
    }else{
      console.log("DEU RUIM");
      console.log(this.user);
    }
  }

  //DAR UNSUBSCRIBE NOS METODOS ACIMA É NOIS
  ngOnDestroy(){
  }
}
