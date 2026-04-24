import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPatient } from './profil-patient';

describe('ProfilPatient', () => {
  let component: ProfilPatient;
  let fixture: ComponentFixture<ProfilPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPatient],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
