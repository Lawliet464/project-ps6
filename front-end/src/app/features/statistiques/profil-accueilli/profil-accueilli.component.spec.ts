import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAccueilliComponent } from './profil-accueilli.component';

describe('ProfilAccueilliComponent', () => {
  let component: ProfilAccueilliComponent;
  let fixture: ComponentFixture<ProfilAccueilliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilAccueilliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilAccueilliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
