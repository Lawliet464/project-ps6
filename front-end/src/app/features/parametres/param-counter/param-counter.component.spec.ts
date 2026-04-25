import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamCounterComponent } from './param-counter.component';

describe('ParamCounterComponent', () => {
  let component: ParamCounterComponent;
  let fixture: ComponentFixture<ParamCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
