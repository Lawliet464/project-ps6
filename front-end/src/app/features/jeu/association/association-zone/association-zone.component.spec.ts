import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationZoneComponent } from './association-zone.component';

describe('AssociationZoneComponent', () => {
  let component: AssociationZoneComponent;
  let fixture: ComponentFixture<AssociationZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
