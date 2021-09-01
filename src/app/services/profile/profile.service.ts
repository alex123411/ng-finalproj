import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private getUserInfoURL = 'http://localhost:8081/api/user/';
  private findUsersByNicknameURL = 'http://localhost:8081/api/user/find';
  private sendFriendRequestURL = 'http://localhost:8081/api/user/sendfriendrequest';
  private removeFriendURL = 'http://localhost:8081/api/user/removefriend';
  private acceptFriendURL = 'http://localhost:8081/api/user/acceptfriend';
  private rejectFriendURL = 'http://localhost:8081/api/user/rejectfriend';

  constructor(private http: HttpClient) { }

  getUserInfo(){
    return this.http.get<any>(this.getUserInfoURL, {headers: { 'type': 'json'}} )
  }

  findUsersByNickname(nickname: string){
    return this.http.post<any>(this.findUsersByNicknameURL, {"nickname": nickname}, {responseType: 'json'})
  }

  sendFriendRequest(nickname : string | undefined){
    return this.http.post<any>(this.sendFriendRequestURL, {"nickname": nickname}, {responseType: 'json'})
  }

  removeFriend(nickname : string | undefined){
    return this.http.post<any>(this.removeFriendURL, {"nickname": nickname}, {responseType: 'json'})
  }
  acceptFriend(nickname : string | undefined){
    return this.http.post<any>(this.acceptFriendURL, {"nickname": nickname} , {responseType: 'json'})
  } 
  rejectFriend(nickname : string | undefined){
    return this.http.post<any>(this.rejectFriendURL, {"nickname": nickname}, {responseType: 'json'})
  }
}
