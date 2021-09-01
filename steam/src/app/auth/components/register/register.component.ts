import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User, AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private router: Router, private auth: AuthService) { }

  registrationForm = new FormGroup({
    nickname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  registerUser(){
    console.log(this.registrationForm.value);
    this.auth.registerUser(this.registrationForm.value)
      .subscribe(
        res => {this.router.navigate(['login']);},
        err => {alert(err.error.message)}
      )
    

  }
}
