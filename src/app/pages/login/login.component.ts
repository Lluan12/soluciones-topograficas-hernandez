import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  async loggIn() {
    const {email, password} = this.loginForm.value
    try {
      await this.authenticationService.login(email, password);
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.showToastify('Correo y/o contraseña incorrectos');
      this.loginForm.reset();
    }
  }

  showToastify(message: string) {
    Toastify({
      text: message,
      duration: 2000,
      newWindow: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "radial-gradient(circle at 10% 20%, rgb(221, 49, 49) 0%, rgb(119, 0, 0) 90%)"
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }
}
