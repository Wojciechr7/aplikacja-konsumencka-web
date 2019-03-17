import {Component, OnInit, ViewChild} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/ad';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {

  public advertisements: Array<Ad>;
  public displayedColumns: string[] = ['id', 'category', 'city', 'street', 'price', 'size'];
  public dataSource = new MatTableDataSource(this.advertisements);
  public loading: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public adService: AdService, private router: Router) {
    this.advertisements = [];
    this.loading = true;
  }

  public redirect(loc: string) {
    this.router.navigate([loc]);

  }

  ngOnInit() {
    this.adService.getAdvertisements().subscribe((ad: Array<Ad>) => {

      this.advertisements = [...ad];
      this.advertisements.map(el => {
        el.id = 1;
        return el;
      });
      this.dataSource = new MatTableDataSource(this.advertisements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
