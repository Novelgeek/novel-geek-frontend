/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostModalComponent } from './post-modal.component';

describe('PostModalComponent', () => {
  let component: PostModalComponent;
  let fixture: ComponentFixture<PostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
