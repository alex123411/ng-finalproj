import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Game{
  name: string;
  price: number;
  ganre: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private getGamesURL = 'http://localhost:8081/api/games/all';
  private addGameToUserLibraryUrl = 'http://localhost:8081/api/user/addgame'

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<any>(this.getGamesURL)
  }
  addGameToUserLibrary(game: Game){
    return this.http.post<any>(this.addGameToUserLibraryUrl, game)
  }
}
