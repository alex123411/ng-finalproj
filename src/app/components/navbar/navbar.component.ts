import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  
  constructor(private router: Router ,private authService: AuthService) { }

  ngOnInit(): void {
    this.logged = this.authService.loggedIn();
    if(!this.logged) {this.router.navigate(['/login'])}
  }

  logOut(): void{
    this.logged = false;
    localStorage.removeItem('token');
  }

  logIn(): void{
    this.logged = true;
  }

}
