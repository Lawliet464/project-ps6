import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauHistoriqueComponent } from './tableau-historique.component';

describe('TableauHistoriqueComponent', () => {
  let component: TableauHistoriqueComponent;
  let fixture: ComponentFixture<TableauHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauHistoriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableauHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
