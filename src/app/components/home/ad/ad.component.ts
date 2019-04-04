import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ad} from '../../../models/ad';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  @Input() ad: Ad;

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
