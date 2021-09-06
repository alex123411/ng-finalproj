import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/services/games/games.service';

export interface User{
  _id?: string;
  email?: string;
  password?: string;
  nickname?: string;
  createdDate?: string;
  profilePhoto?: string;
  friendList?: Array<string>;
  gamesList?: Array<Game>;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private registerURL = '/api/auth/register';
  private loginURL = '/api/auth/login';

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>(this.registerURL, user);
  }
  loginUser(user: User) {
    return this.http.post<any>(this.loginURL, user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
