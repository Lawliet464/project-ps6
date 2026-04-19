import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamPlateauComponent } from './plateau';

describe('Plateau', () => {
  let component: ParamPlateauComponent;
  let fixture: ComponentFixture<ParamPlateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamPlateauComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamPlateauComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
