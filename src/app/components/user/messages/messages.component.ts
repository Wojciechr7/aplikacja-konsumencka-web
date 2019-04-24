import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public step: number;

  constructor() {
    this.step = null;

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  sendEmail() {
    window.open('mailto:test@example.com');
  }



  ngOnInit() {
  }

}
