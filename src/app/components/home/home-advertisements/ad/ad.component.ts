import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Advertisement} from '../../../../models/advertisement/advertisement';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  @Input() ad: Advertisement;

  constructor(private router: Router) { }

  public redirect(loc: string) {
    this.router.navigate([loc]);
  }

  public noImage(i: string): boolean {
    return i.indexOf('base64') > 0;
  }

  ngOnInit() {
  }

}
