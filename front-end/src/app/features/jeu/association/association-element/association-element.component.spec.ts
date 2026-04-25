import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationElementComponent } from './association-element.component';

describe('AssociationElementComponent', () => {
  let component: AssociationElementComponent;
  let fixture: ComponentFixture<AssociationElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
