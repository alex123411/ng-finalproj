import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GamesComponent } from './components/games/games.component';
import { LibraryComponent } from './components/library/library.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './auth/service/auth.service';
import { GamesService } from './services/games/games.service';
import { TokenInterceptorService } from './services/tokenInterceptor/token-interceptor.service';
import { SharedModule } from './shared/shared.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesComponent,
    LibraryComponent,
    FriendsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    ClipboardModule,
    MatCheckboxModule,
  ],
  providers: [
    AuthService,
    GamesService, 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
