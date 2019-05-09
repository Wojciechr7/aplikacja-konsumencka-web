import {Component, OnInit, ViewChild} from '@angular/core';
import {AdvertisementService} from '../../../services/advertisement.service';
import {Advertisement} from '../../../models/advertisement/advertisement';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class UserAdvertisementsComponent implements OnInit {

  public advertisements: Array<Advertisement>;
  public displayedColumns: string[] = ['category', 'city', 'street', 'price', 'size'];
  public dataSource = new MatTableDataSource(this.advertisements);
  public loading: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public adService: AdvertisementService, private router: Router, private authenticationService: AuthService) {
    this.advertisements = [];
    this.loading = true;
  }

  public redirect(loc: string) {
    this.router.navigate([loc]);

  }

  ngOnInit() {
    this.adService.getUserAdvertisements(this.authenticationService.currentUserValue.id).subscribe((ad: Array<Advertisement>) => {
      this.advertisements = [...ad];
      this.dataSource = new MatTableDataSource(this.advertisements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
