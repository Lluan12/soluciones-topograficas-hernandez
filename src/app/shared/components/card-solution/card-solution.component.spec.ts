import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSolutionComponent } from './card-solution.component';

describe('CardSolutionComponent', () => {
  let component: CardSolutionComponent;
  let fixture: ComponentFixture<CardSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
