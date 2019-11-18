import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandPage } from './expand.page';

describe('ExpandPage', () => {
  let component: ExpandPage;
  let fixture: ComponentFixture<ExpandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
