import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { GamesService, Game } from 'src/app/services/games/games.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  price : number = 60
  allGames: Game [] =[]
  games : Game[] = []
  filteredGames : Game[] = []
  ganresToSee : string[] = []
  logged: boolean = false;
  ganres : string[] = []

  constructor(private gamesService: GamesService, private authService: AuthService) { }

  ngOnInit() {
    this.logged = this.authService.loggedIn();
    this.gamesService.getGames()
      .subscribe(
        res => {
          this.games = res.games;
          this.allGames = res.games;
          this.games.forEach(game => {
            this.ganres.push(game.ganre)
          });
          this.ganres = this.ganres.filter((v, i, a) => a.indexOf(v) === i)
        },
        err => console.log(err)  
      )
  }

  addToLibrary(game: Game){
    this.gamesService.addGameToUserLibrary(game)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        alert(err.error.message)
      } 
    )
  }

  getGames() {
    this.gamesService.getGames()
      .subscribe(
        res => {
          this.games = res.games;
        },
        err => console.log(err)  
      )
  }

  priceChange(value: string){
    this.price = +value*5; 
    
  }

  filterGames(event: any , ganre : string){
    this.filteredGames = []
    if(event.checked){
      this.ganresToSee.push(ganre)
      this.allGames.forEach(element1 => {
        this.ganresToSee.forEach(element2 => {
          if(element1.ganre == element2){this.filteredGames.push(element1)}
        });
      });
      this.games = this.filteredGames
    } else{
      let i = 0;
      this.ganresToSee.forEach(elem => {
        if(elem == ganre){this.ganresToSee.splice(i,1)}
        i++
      })
      
      if(this.ganresToSee.length == 0){this.getGames()}
      else{
        this.allGames.forEach(element1 => {
          this.ganresToSee.forEach(element2 => {
            if(element1.ganre == element2){this.filteredGames.push(element1)}
          });
        });
        this.games = this.filteredGames
      }
    }
  }
}
