import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueCourbeComponent } from './graphique-courbe.component';

describe('GraphiqueCourbeComponent', () => {
  let component: GraphiqueCourbeComponent;
  let fixture: ComponentFixture<GraphiqueCourbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueCourbeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphiqueCourbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
