import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdvertisementsComponent } from './home-advertisements.component';

describe('HomeAdvertisementsComponent', () => {
  let component: HomeAdvertisementsComponent;
  let fixture: ComponentFixture<HomeAdvertisementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAdvertisementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
