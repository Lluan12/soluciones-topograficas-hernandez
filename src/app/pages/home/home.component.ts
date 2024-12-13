import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutSectionComponent } from "../../shared/components/about-section/about-section.component";
import { SolutionsComponent } from "../solutions/solutions.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, AboutSectionComponent, SolutionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
}
