import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user/user';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<User>;
  public cols: Array<string>;
  public dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private adminService: AdminService, private toastr: ToastrService) {
    this.cols = ['Email', 'FirstName', 'LastName', 'PhoneNumber', 'Status', 'actions'];
  }

  ngOnInit() {
    this.adminService.getUsers().subscribe((users: Array<User>) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  public changeStatus(targetUser: User) {
    this.adminService.blockUser(targetUser.id).subscribe(() => {
      if (targetUser.blocked) {
        this.toastr.success('User has been unblocked', 'Success!');
      }
      if (!targetUser.blocked) {
        this.toastr.success('User has been blocked', 'Success!');
      }
      targetUser.blocked = !targetUser.blocked;
    });
  }

}
