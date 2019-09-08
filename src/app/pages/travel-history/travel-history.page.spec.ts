import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelHistoryPage } from './travel-history.page';

describe('TravelHistoryPage', () => {
  let component: TravelHistoryPage;
  let fixture: ComponentFixture<TravelHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
