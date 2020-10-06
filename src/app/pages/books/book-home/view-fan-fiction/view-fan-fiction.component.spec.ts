import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFanFictionComponent } from './view-fan-fiction.component';

describe('ViewFanFictionComponent', () => {
  let component: ViewFanFictionComponent;
  let fixture: ComponentFixture<ViewFanFictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFanFictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFanFictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
