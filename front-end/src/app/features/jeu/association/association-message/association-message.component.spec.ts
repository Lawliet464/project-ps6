import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationMessageComponent } from './association-message.component';

describe('AssociationMessageComponent', () => {
  let component: AssociationMessageComponent;
  let fixture: ComponentFixture<AssociationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
