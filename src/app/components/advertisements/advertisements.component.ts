import {Component, OnInit, ViewChild} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/ad';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {

  public advertisements: Array<Ad>;
  public displayedColumns: string[] = ['category', 'city', 'street', 'price', 'size'];
  public dataSource = new MatTableDataSource(this.advertisements);
  public loading: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public adService: AdService, private router: Router, private authenticationService: AuthService) {
    this.advertisements = [];
    this.loading = true;
  }

  public redirect(loc: string) {
    this.router.navigate([loc]);

  }

  ngOnInit() {
    this.adService.getUserAdvertisements(this.authenticationService.currentUserValue.id).subscribe((ad: Array<Ad>) => {
      this.advertisements = [...ad];
      this.dataSource = new MatTableDataSource(this.advertisements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
