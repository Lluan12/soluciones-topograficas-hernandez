import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardSolutionComponent } from '../../shared/components/card-solution/card-solution.component';
import { Solution } from '../../shared/model/solution.model';
import solutions from '../../shared/data/services.json';

@Component({
	selector: 'app-home',
	imports: [RouterModule, CardSolutionComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
	solutions = signal<Solution[]>(solutions);

	ngOnInit(): void {}
}
