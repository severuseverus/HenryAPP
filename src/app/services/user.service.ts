import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url = 'https://henry-api-ford-challenge.herokuapp.com';
  authenticationState = new BehaviorSubject(false);


  constructor(private http: HttpClient, private storage: Storage) { }

  getUsers() {
    return this.http.get(`${this.url}/users`).toPromise();
  }

  async isUserLoggedIn(){
    return (await this.storage.get('user')) != undefined;
  }

  login(user) {
    return this.storage.set('user', user).then(() => {
      this.authenticationState.next(true);
    });
  }
  
  logout(){
    return this.storage.remove('user').then(() => {
      this.authenticationState.next(false);
    });
  }

}
