import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Collapse, initFlowbite } from 'flowbite';
import type { CollapseInterface } from 'flowbite';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-header',
	imports: [RouterModule, NgClass],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
	private router = inject(Router);
	private authenticationService = inject(AuthenticationService);
	isAuthenticate = signal<boolean>(false);

	constructor() {
		this.authenticate();
	}

	ngOnInit(): void {
		initFlowbite();
	}

	hideMenu(): void {
		const $targetEl: HTMLElement =
			document.getElementById('navbar-default')!;

		const $triggerEl: HTMLElement =
			document.getElementById('navbar-button')!;

		const collapse: CollapseInterface = new Collapse($targetEl, $triggerEl);
		collapse.collapse();
	}

	isActive(clase: string, elemento: HTMLElement): boolean {
		return elemento.classList.contains(clase);
	}

	async logout(): Promise<void> {
		try {
			await this.authenticationService.logout();
			this.router.navigateByUrl('/auth/sign-in')
		} catch (error) {
			console.log(error);
		}
	}

	authenticate(): void {
		this.authenticationService.stateAuth.subscribe(auth => {
			if(!auth) this.isAuthenticate.set(false);
			else this.isAuthenticate.set(true);
		})
	}
}
