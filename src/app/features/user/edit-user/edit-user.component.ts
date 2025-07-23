import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {DeleteUserComponent} from '../delete-user/delete-user.component';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDto} from '../models/userDto';
import {UpdateUserForm} from '../models/update-user';
import {AuthService} from '../../../core/services/auth.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatButton,
    ChangePasswordComponent,
    DeleteUserComponent,
    MatTabsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  userId!: number;
  updateUserForm!: UpdateUserForm;
  userDto!: UserDto;
  editUserForm!: FormGroup;
  message = '';
  messageSuccess = '';

  constructor(
    private userService: UserService,
    private _authService: AuthService,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
  ) {
    this.editUserForm = this._fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      pseudo: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.userId = Number(this._route.snapshot.paramMap.get('id'));
    // console.log(this.userId);

    this.userService.getUser(this.userId).subscribe({
      next: (data) => {
        this.userDto = data
        this.editUserForm.get('name')?.patchValue(this.userDto.name);
        this.editUserForm.get('firstName')?.patchValue(this.userDto.firstName);
        this.editUserForm.get('email')?.patchValue(this.userDto.email);
        this.editUserForm.get('birthdate')?.patchValue(this.userDto.birthdate);
        this.editUserForm.get('pseudo')?.patchValue(this.userDto.pseudo);
        this.editUserForm.get('street')?.patchValue(this.userDto.street);
        this.editUserForm.get('city')?.patchValue(this.userDto.city);
        this.editUserForm.get('zipCode')?.patchValue(this.userDto.zipCode);
        },
      error: (err) => {
        console.log('Erreur de recup', err);
      }
    })

  }

  onSubmitEditProfile() {

    this.editUserForm.markAsTouched();

    if (this.editUserForm.invalid) {
      return;
    }

    let editUser: UpdateUserForm = {
      name: this.editUserForm.get('name')?.value,
      firstName: this.editUserForm.get('firstName')?.value,
      birthdate: this.editUserForm.get('birthdate')?.value,
      pseudo: this.editUserForm.get('pseudo')?.value,
      email: this.editUserForm.get('email')?.value,
      street: this.editUserForm.get('street')?.value,
      city: this.editUserForm.get('city')?.value,
      zipCode: this.editUserForm.get('zipCode')?.value
    }

    this.userService.editUser(this.userId, editUser).subscribe({
      next: (data) => {
        this.updateUserForm = data;
        this.editUserForm.patchValue(this.updateUserForm)
        this._authService.updateUserFirstname(editUser.firstName); //Change firstname button
        this.messageSuccess = 'La mise à jour du profil a été effectuée avec succès.'
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

  }

}
