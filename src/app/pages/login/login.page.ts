import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users = [];

  constructor(private userService: UserService, private router: Router, private storage: Storage) { }

  async ngOnInit() {
    if(await this.userService.isUserLoggedIn()){
      this.goToMain();
    }else{
      this.users = (await this.userService.getUsers())["_data"];
    }
  }

  setUser(user){
    this.storage.set('user', user);
    this.goToMain();
  }

  goToMain(){
    this.router.navigate(['home']);
  }
}
