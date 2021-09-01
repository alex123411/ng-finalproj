import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private router: Router, private auth: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  ngOnInit(): void{
    if(this.auth.loggedIn()){ this.router.navigate(['/profile']);}
  }

  logIn(){
    console.log(this.loginForm.value);
    this.auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          window.location.reload();
        },
        err => {alert(err.error.message)}
      )
  }

}
