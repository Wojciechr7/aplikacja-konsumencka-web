import {Component, OnInit, ViewChild} from '@angular/core';
import {AdvertisementService} from '../../../services/advertisement.service';
import {Advertisement} from '../../../models/advertisement/advertisement';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../../dialogs/confirm/confirm.dialog';
import {DialogData} from '../../../dialogs/edit-profile/edit-profile.dialog';
import {ImageService} from '../../../services/image.service';

@Component({
  selector: 'app-user-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {

  public advertisements: Array<Advertisement>;
  public displayedColumns: string[] = ['category', 'city', 'street', 'price', 'size', 'actions'];
  public dataSource = new MatTableDataSource(this.advertisements);
  public loading: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public adService: AdvertisementService, private router: Router, private adminService: AdminService,
              private toastr: ToastrService, private dialog: MatDialog) {
    this.advertisements = [];
    this.loading = true;
  }

  public removeAd(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `350px`,
      data: {message: 'Confirm Deletion Of The Advertisement'}
    });
    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        this.adminService.removeAdvertisement(id).subscribe(() => {
          this.toastr.success('Advertisement Has Been Deleted', 'Success!');
          this.advertisements = this.advertisements.filter(advertisement => advertisement.id !== id);
          this.dataSource = new MatTableDataSource(this.advertisements);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  public verifyAd(id, e) {
    this.adminService.validateAdvertisement(id).subscribe(() => {
      e.path[0].innerHTML = e.path[0].innerHTML === 'Verify' ? 'Unverify' : 'Verify';
    });
  }

  ngOnInit() {
    this.adminService.getAdvertisements().subscribe((ad: Array<Advertisement>) => {
      this.advertisements = [...ad];
      this.dataSource = new MatTableDataSource(this.advertisements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
