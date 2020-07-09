import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollModelComponent } from './poll-model.component';

describe('PollModelComponent', () => {
  let component: PollModelComponent;
  let fixture: ComponentFixture<PollModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
