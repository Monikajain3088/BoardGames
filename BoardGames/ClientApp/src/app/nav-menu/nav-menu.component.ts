import { Component } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(public login: LoginService, private router: Router){}
  isExpanded = false;
public UserId = '';
public Password = '';
Login() {
    const ht = this.UserId + '} ' + this.Password;
      const userName = this.UserId;
      const password = this.Password;
      this.login.LoginIn(userName, password).subscribe(data => {
      this.router.navigate(['/admin-view']
                   );

      });
  }
  LogOut()
  {
    this.login.logout();
    this.router.navigate(['/visitor-rating']);
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
