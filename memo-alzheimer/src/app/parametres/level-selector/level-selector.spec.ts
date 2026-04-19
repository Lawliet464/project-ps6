import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamLevelComponent } from './level-selector';

describe('LevelSelector', () => {
  let component: ParamLevelComponent;
  let fixture: ComponentFixture<ParamLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamLevelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamLevelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
