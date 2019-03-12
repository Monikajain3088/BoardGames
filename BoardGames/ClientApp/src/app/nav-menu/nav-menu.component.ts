import { Component } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {
  constructor(public login: LoginService, private router: Router, private formBuilder: FormBuilder){}
  isExpanded = false;
public UserId = '';
public Password = '';
loginForm: FormGroup;
    submitted = false;

// Function to log in
Login() {
  this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    const ht = this.UserId + '} ' + this.Password;
      const userName = this.UserId;
      const password = this.Password;
      this.login.LoginIn(userName, password).subscribe(data => {
      this.router.navigate(['/admin-view']
                   );

      });
  }

  // Function to log out
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
  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      UsrId: ['', Validators.required],
      Password: ['', Validators.required],
  });
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }
}
export interface TokenParams {
  token: string;
  expiration: string;
}
