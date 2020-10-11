import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderCardComponent } from './bidder-card.component';

describe('BidderCardComponent', () => {
  let component: BidderCardComponent;
  let fixture: ComponentFixture<BidderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
