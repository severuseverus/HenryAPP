import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://henry-api-ford-challenge.herokuapp.com';

  constructor(private http: HttpClient, private storage: Storage) { }

  getUsers() {
    return this.http.get(`${this.url}/users`).toPromise();
  }

  async isUserLoggedIn(){
    return (await this.storage.get('user')) != undefined;
  }
}
