import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  url = 'https://henry-api-ford-challenge.herokuapp.com';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.url}/users?email=digo.david.oliveira@gmail.com`).toPromise();
  }
  
  getDetails(userId) {
    return this.http.get(`${this.url}/travels?status=1&user=${userId}`).toPromise();
  }

  getMedia(userId) {
    return this.http.get(`${this.url}/travels?user=${userId}`).toPromise();
  }

  getTravels(userId) {
    return this.http.get(`${this.url}/travels?status=2`).toPromise();
  }

}
