import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamPlateauComponent } from './param-plateau.component';

describe('ParamPlateauComponent', () => {
  let component: ParamPlateauComponent;
  let fixture: ComponentFixture<ParamPlateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamPlateauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamPlateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
