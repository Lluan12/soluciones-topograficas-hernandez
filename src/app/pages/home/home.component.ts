import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactSectionComponent } from "../../shared/components/contact-section/contact-section.component";
import { AboutSectionComponent } from "../../shared/components/about-section/about-section.component";
import { ServicesSectionComponent } from "../../shared/components/services-section/services-section.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, ContactSectionComponent, AboutSectionComponent, ServicesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
}
