import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {ThemeService} from '../../../core/services/theme.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatDatepickerInput,
    NgClass,
    MatIconButton,
    MatSuffix,
    MatError
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  isDarkMode = false; // Store dark mode state (true or false)
  hidePassword = true; // Control password visibility (true = hidden)
  registerForm!: FormGroup; // Registration form
  message = '';
  messageSuccess = '';

  // Inject the theme service (for dark mode)
  constructor(
    private themeService: ThemeService,
    private readonly _autService: AuthService,
    private readonly _fb: FormBuilder,
    private readonly _router: Router) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode(); // Get current theme (dark or light)
    this.themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)

    // Create a form for registration a user
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pseudo: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
      birthdate: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    })
  }

  onSubmitRegister() {
    // Show all validation errors if any
    this.registerForm.markAllAsTouched(); // Mark all form fields as "touched" to show errors
    if (!this.registerForm.valid) { // Stop if form is invalid
      return
    }

    // Create an account for user using the auth service
    this._autService.register(this.registerForm.value).subscribe({
      next: () => {
        this.messageSuccess = "Veuillez vérifier votre boîte email pour activer votre compte."
        this._router.navigate(['/']);
      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur d\'inscription;';
        }

      }
    })

    this.registerForm.reset();

  }

}
