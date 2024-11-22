import { Component, input, OnInit } from '@angular/core';
import { Solution } from '../../model/solution.model';

@Component({
  selector: 'app-card-solution',
  imports: [],
  templateUrl: './card-solution.component.html',
  styleUrl: './card-solution.component.css'
})
export class CardSolutionComponent implements OnInit {
  data = input.required<Solution>();

  ngOnInit(): void {
    
  }
}
