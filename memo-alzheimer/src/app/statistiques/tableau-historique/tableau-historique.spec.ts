import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauHistorique } from './tableau-historique';

describe('TableauHistorique', () => {
  let component: TableauHistorique;
  let fixture: ComponentFixture<TableauHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauHistorique],
    }).compileComponents();

    fixture = TestBed.createComponent(TableauHistorique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
