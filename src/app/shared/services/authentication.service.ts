import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private auth: Auth = inject(Auth);

	register(email: string, password: string) {
		return createUserWithEmailAndPassword(this.auth, email, password);
	}

	login(email: string, password: string) {
		return signInWithEmailAndPassword(this.auth, email, password);
	}

	logout() {
		return signOut(this.auth);
	}

	get stateAuth(): Observable<any> {
		return authState(this.auth)
	}
}
