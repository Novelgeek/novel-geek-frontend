/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

<<<<<<< HEAD:src/app/pages/sales/sales-info/sales-info.component.spec.ts
import { SalesInfoComponent } from './sales-info.component';

describe('SalesInfoComponent', () => {
  let component: SalesInfoComponent;
  let fixture: ComponentFixture<SalesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInfoComponent ]
=======
import { AuctionsHomeComponent } from './auctions-home.component';

describe('AuctionsHomeComponent', () => {
  let component: AuctionsHomeComponent;
  let fixture: ComponentFixture<AuctionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionsHomeComponent ]
>>>>>>> origin/Nadee-book:src/app/pages/auctions/auctions-home/auctions-home.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/pages/sales/sales-info/sales-info.component.spec.ts
    fixture = TestBed.createComponent(SalesInfoComponent);
=======
    fixture = TestBed.createComponent(AuctionsHomeComponent);
>>>>>>> origin/Nadee-book:src/app/pages/auctions/auctions-home/auctions-home.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
