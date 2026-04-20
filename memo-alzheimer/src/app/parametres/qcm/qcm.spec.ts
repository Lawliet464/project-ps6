import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamQcmComponent } from './qcm';

describe('Qcm', () => {
  let component: ParamQcmComponent;
  let fixture: ComponentFixture<ParamQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamQcmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamQcmComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
