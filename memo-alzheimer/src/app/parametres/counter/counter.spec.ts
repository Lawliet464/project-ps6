import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamCounterComponent } from './counter';

describe('Counter', () => {
  let component: ParamCounterComponent;
  let fixture: ComponentFixture<ParamCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamCounterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
