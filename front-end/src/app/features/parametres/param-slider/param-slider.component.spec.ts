import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { ParamSliderComponent } from './param-slider.component';

describe('ParamSliderComponent', () => {
  let component: ParamSliderComponent;
  let fixture: ComponentFixture<ParamSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamSliderComponent ],
      imports: [ FormsModule ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ParamSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
