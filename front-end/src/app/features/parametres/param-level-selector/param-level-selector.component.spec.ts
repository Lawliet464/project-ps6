import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamLevelSelectorComponent } from './param-level-selector.component';

describe('ParamLevelSelectorComponent', () => {
  let component: ParamLevelSelectorComponent;
  let fixture: ComponentFixture<ParamLevelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamLevelSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamLevelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
