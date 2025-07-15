import {Component, inject, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogActions,
  MatDialogContent, MatDialogTitle, MatDialogRef
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-login',
  imports: [

    MatButton,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // LoginForm
  message = ''; // Message to show success or error
  hidePassword = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Catch data's dialogue from nav
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<LoginComponent>, // Catch data's dialogue from nav
    private readonly fb: FormBuilder, // Create a Form
    private readonly _authServ: AuthService, // service to manage auth
    private readonly _router: Router, // Tool to navigate
  ) {
  }

  ngOnInit(): void {
    // Create the form with 2 fields: pseudo and password
    this.loginForm = this.fb.group({
      pseudo: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  /**
   * Submit login form
   */
  sign() {
    // Show all validation errors if any
    this.loginForm.markAllAsTouched(); // Mark all form fields as "touched" to show errors
    if (!this.loginForm.valid) { // Stop if form is invalid
      return
    }

    // Try to login using the auth service
    this._authServ.login(this.loginForm.value).subscribe({
      next: (user) => { //If the connection is successful, the response contains the user
        this.message = "Bienvenu sur la plateforme";
        localStorage.setItem('authToken', user.token); // Save token in browser
        localStorage.setItem('authFirstname', user.firstName); // Save the first name in browser
        this._router.navigate(['/dashboard']);
        this.dialogRef.close();
      }
      ,
      error: (error) => { // Login error
        // Try to get message from backend
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur de connexion'; // Default message
          // console.log(error);
        }
      }
    })
  }

}
