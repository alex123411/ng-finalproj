import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './components/friends/friends.component';
import { GamesComponent } from './components/games/games.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'games', component: GamesComponent},
  { path: 'library', component: LibraryComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'friends', component: FriendsComponent},
  { path: '',   redirectTo: '/profile', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
