import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  url = 'https://henry-api-ford-challenge.herokuapp.com';

  constructor(private http: HttpClient) { }

  //searchData(title: string, type: SearchType): Observable<any> {
    //return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      //map(results => results['Search'])
    //);
  //}
  getUser() {
    return this.http.get(`${this.url}/users?email=digo.david.oliveira@gmail.com`).pipe(
      map(results => results['_data']['0'])
    );
  }
  getDetails(userId) {
    return this.http.get(`${this.url}/travels?vin=123425657342&finished=false&_id=${userId}`).pipe(
      map(results => results['_data']['0'])
    );
  }
}
