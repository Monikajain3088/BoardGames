import { Component } from '@angular/core';
import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(public login: LoginService ){}
  isExpanded = false;
public UserId = '';
public Password = '';
Login() {
    const ht = this.UserId + '} ' + this.Password;
      const userName = this.UserId;
      const password = this.Password;
      this.login.LoginIn(userName, password);
  }
  LogOut()
  {
    this.login.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
export interface TokenParams {
  token: string;
  expiration: string;
}
