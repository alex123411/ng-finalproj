import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/service/auth.service';
import { Game } from 'src/app/services/games/games.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  games : Game[] = []
  user: User = {};
  constructor(private profileService : ProfileService ) {}

  ngOnInit() {
    this.profileService.getUserInfo()
        .subscribe(
          res => {
            this.games = res.user.gamesList
            console.log(this.games)
          },
          err => console.log(err)
        )
  }

  download(){
    alert('download started!')
  }
  share(gameName : string){
    alert('Share this game with others!' + gameName)
  }
  
}
