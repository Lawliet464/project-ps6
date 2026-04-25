import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamQcmComponent } from './param-qcm.component';

describe('ParamQcmComponent', () => {
  let component: ParamQcmComponent;
  let fixture: ComponentFixture<ParamQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamQcmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
