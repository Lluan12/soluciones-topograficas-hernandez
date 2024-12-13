import { Routes } from '@angular/router';
import { publicGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: 'auth/sign-in',
		canActivate: [publicGuard],
		loadComponent: () =>
			import('./pages/login/login.component').then(
				(m) => m.LoginComponent
			),
	},
	{
		path: '',
		loadComponent: () =>
			import('./shared/ui/layout/layout.component').then(
				(m) => m.LayoutComponent
			),
		children: [
			{
				path: 'home',
				loadComponent: () =>
					import('./pages/home/home.component').then(
						(m) => m.HomeComponent
					),
			},
			{
				path: 'about',
				loadComponent: () =>
					import('./pages/about/about.component').then(
						(m) => m.AboutComponent
					),
			},
			{
				path: 'services',
				loadComponent: () =>
					import('./pages/solutions/solutions.component').then(
						(m) => m.SolutionsComponent
					),
			},
			{
				path: 'contact',
				loadComponent: () =>
					import('./pages/contact/contact.component').then(
						(m) => m.ContactComponent
					),
			},
			{
				path: 'projects',
				loadComponent: () =>
					import('./pages/proyects/proyects.component').then(
						(m) => m.ProyectsComponent
					),
			},
			{
				path: 'projects/:id',
				loadComponent: () =>
					import(
						'./pages/project-section/project-section.component'
					).then((m) => m.ProjectSectionComponent),
			},
		],
	},
	{
		path: '**',
		loadComponent: () =>
			import('./pages/not-found/not-found.component').then(
				(m) => m.NotFoundComponent
			),
	},
];
