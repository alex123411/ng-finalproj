import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/auth/service/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  user: User = {};
  friends: User[] = [];
  friendsToAdd : User[] = [];
  nicknameToFind : string = '';
  nickname = new FormControl('');
  

  constructor(private profileService : ProfileService) { }
  
  ngOnInit() {
    this.profileService.getUserInfo()
        .subscribe(
          res => {
            this.user = res.user
            this.friends = res.user.friendList
            console.log(res.user)
          },
          err => console.log(err)
        )
  }

  findFriends(){
    this.nicknameToFind = (<HTMLInputElement>document.getElementById('searchForFriendsInput')).value;
    if (this.nicknameToFind != ''){
      this.profileService.findUsersByNickname(this.nicknameToFind)
      .subscribe(
        res => {
          this.friendsToAdd = []
          res.users.forEach( (value: string) => {
            this.friendsToAdd.push({nickname: value})
          });
        },
        err => console.log(err)
      );
    }    
  }

  sendFriendRequest(nickname : string | undefined){
    if(nickname != this.user.nickname){
      this.profileService.sendFriendRequest(nickname)
      .subscribe(
        res => console.log(res),
        err => {alert(err.error.message)}
      )
    } else {alert('It`s YOU!')}
    
  }

  removeFriend(nickname : string | undefined){
    this.profileService.removeFriend(nickname)
      .subscribe(
        res => {
          console.log(res)
          let i = 0;
          this.friends.forEach(friend => {
            if(friend.nickname == nickname){this.friends.splice(i,1)}
            i++;
          });
        },
        err => {alert(err.error.message)}
      )
  }
  acceptFriend(nickname : string | undefined){
    this.profileService.acceptFriend(nickname)
      .subscribe(
        res => {
          console.log(res)
          this.friends.forEach(friend => {
            if(friend.nickname = nickname){friend.status = 'accepted'}
          });
        },
        err => {alert(err.error.message)}
      )
  }
  rejectFriend(nickname : string | undefined){
    this.profileService.rejectFriend(nickname)
      .subscribe(
        res => console.log(res),
        err => {alert(err.error.message)}
      )
  } 
}
