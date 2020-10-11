import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanFictionComponent } from './fan-fiction.component';

describe('FanFictionComponent', () => {
  let component: FanFictionComponent;
  let fixture: ComponentFixture<FanFictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanFictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanFictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
