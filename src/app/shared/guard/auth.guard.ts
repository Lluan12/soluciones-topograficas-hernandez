import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs';

export const privateGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authenticationService = inject(AuthenticationService);
	return authenticationService.stateAuth.pipe(
		map((state) => {
			if (!state) {
				router.navigateByUrl('/auth/sign-in');
				return false;
			}
			return true;
		})
	);
};

export const publicGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authenticationService = inject(AuthenticationService);
	return authenticationService.stateAuth.pipe(
		map((state) => {
			if (state) {
				router.navigateByUrl('/home');
				return false;
			}
			return true;
		})
	);
};
