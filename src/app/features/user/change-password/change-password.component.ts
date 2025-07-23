import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from '@angular/material/icon';
import {ChangePasswordForm} from '../models/change-password';
import {UserService} from '../service/user.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatSuffix,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  hidePassword = true; // Control password visibility (true = hidden)
  editPasswordForm: FormGroup;
  userId: number | undefined;
  message = '';
  messageSuccess = '';

  constructor(
    private _userService: UserService,
    private authService: AuthService,
    private readonly _fb: FormBuilder
  ) {
    this.editPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], //TODO , Validators.minLength(8)
      comparePassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    })

  }

  onSubmitChangePassword() {
    this.message = '';
    this.messageSuccess = '';

    this.editPasswordForm.markAllAsTouched();

    if (this.editPasswordForm.invalid) {
      return;
    }

    this._userService.changePassword(this.userId, this.editPasswordForm.value).subscribe({
      next: () => {
        this.messageSuccess = 'Le mot de passe a bien été modifié!';
      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur lors de la mise à jour';
        }
      }
    })
  }


}
