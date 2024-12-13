import { Component, inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	private authenticationService = inject(AuthenticationService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	private snackBar = inject(MatSnackBar);
	loginForm!: FormGroup;

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	async loggIn() {
		const { email, password } = this.loginForm.value;
		try {
			await this.authenticationService.login(email, password);
			this.router.navigateByUrl('/home');
		} catch (error) {
			this.showSnackBar('Correo y/o contraseña incorrectos');
			this.loginForm.reset();
		}
	}

	showSnackBar(message: string) {
		this.snackBar.open(message, '', {
      panelClass: 'error-snackbar',
			duration: 3000,
		});
	}
}
