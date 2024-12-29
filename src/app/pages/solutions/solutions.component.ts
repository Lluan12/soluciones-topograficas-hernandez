import { Component, signal } from '@angular/core';
import { Solution } from '../../shared/model/solution.model';
import { CardSolutionComponent } from '../../shared/components/card-solution/card-solution.component';
import solutions from '../../shared/data/services.json'

@Component({
	selector: 'app-solutions',
	imports: [CardSolutionComponent],
	templateUrl: './solutions.component.html',
	styleUrl: './solutions.component.css',
})
export class SolutionsComponent {
	solutions = signal<Solution[]>(solutions);
}
