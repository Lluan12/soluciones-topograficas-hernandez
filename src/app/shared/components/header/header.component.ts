import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Collapse } from 'flowbite';
import type { CollapseInterface } from 'flowbite';

@Component({
	selector: 'app-header',
	imports: [RouterModule, NgClass],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent {
	private router = inject(Router);

  hideMenu() {
    const $targetEl: HTMLElement =
			document.getElementById('navbar-default')!;

		const $triggerEl: HTMLElement =
			document.getElementById('navbar-button')!;

		const collapse: CollapseInterface = new Collapse($targetEl, $triggerEl);
    collapse.collapse()
  }

	getUrl(): string {
		return this.router.url.split('/')[1];
	}
}
