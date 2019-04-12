import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userId: string;
  public userInfo: User;
  public loading: boolean;

  constructor(public userService: UserService, public authService: AuthService) {
    this.loading = true;
    this.userId = authService.currentUserValue.id;
  }

  ngOnInit() {
    this.userService.getUserInfo(this.userId).subscribe((user: User) => {
      this.userInfo = user;
      this.loading = false;
    });
  }

}
