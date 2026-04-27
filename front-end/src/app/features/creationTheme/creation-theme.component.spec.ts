import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationThemeComponent } from './creation-theme.component';

describe('CreationThemeComponent', () => {
  let component: CreationThemeComponent;
  let fixture: ComponentFixture<CreationThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationThemeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreationThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
