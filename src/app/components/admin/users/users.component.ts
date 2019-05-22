import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user/user';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users: Array<User>;
  private cols: Array<string>;
  constructor(private adminService: AdminService) {
    this.users = [
      {email: 'email1@gmail.com', firstName: 'Mateusz', lastName: 'fefdfsfsf' , phoneNumber: '434332453', status: 'blocked'},
      {email: 'fewffs@gmail.com', firstName: 'Rychu', lastName: 'fsfsfsfgrg' , phoneNumber: '3324253456', status: 'unblocked'}
    ];
    this.cols = ['Email', 'FirstName', 'LastName', 'PhoneNumber', 'Status', 'actions'];
  }

  ngOnInit() {
    this.adminService.getUsers().subscribe((users) => {
      console.log(users);
    })
  }

}
