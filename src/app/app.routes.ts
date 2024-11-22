import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: 'home',
		loadComponent: () =>
			import('./pages/home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'about',
		loadComponent: () =>
			import('./pages/about/about.component').then((m) => m.AboutComponent),
	},
	{
		path: 'services',
		loadComponent: () =>
			import('./pages/solutions/solutions.component').then((m) => m.SolutionsComponent),
	},
	{
		path: 'contact',
		loadComponent: () =>
			import('./pages/contact/contact.component').then((m) => m.ContactComponent),
	},
];
