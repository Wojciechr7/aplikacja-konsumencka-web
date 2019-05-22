import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdvertisementsComponent } from './advertisements.component';

describe('UserAdvertisementsComponent', () => {
  let component: UserAdvertisementsComponent;
  let fixture: ComponentFixture<UserAdvertisementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvertisementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
