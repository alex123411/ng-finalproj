import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/service/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {};

  constructor( private profileService : ProfileService) { 
  }

  ngOnInit() {
    this.profileService.getUserInfo()
        .subscribe(
          res => {
            this.user = res.user
            this.user.createdDate = this.user.createdDate?.split('T')[0]
          },
          err => console.log(err)
        )
  }

}
