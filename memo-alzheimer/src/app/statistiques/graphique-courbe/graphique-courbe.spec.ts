import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueCourbe } from './graphique-courbe';

describe('GraphiqueCourbe', () => {
  let component: GraphiqueCourbe;
  let fixture: ComponentFixture<GraphiqueCourbe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueCourbe],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphiqueCourbe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
