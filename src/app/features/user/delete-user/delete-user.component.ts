import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UserService} from '../service/user.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {

  message: string = '';
  messageSuccess: string = '';

  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private router: Router,
  ) {
  }

  onDeleteAccount() {
    const userId = this._authService.getCurrentUserId();

    if (userId && confirm('Êtes vous sure de supprimer votre compte ?')) {
      this._userService.deleteUser(userId).subscribe({
        next: () => {
          this.messageSuccess = 'Votre compte a bien été supprimé.';
          this._authService.logout();
          this.router.navigate(['/']);
        },
        error: () => {
          this.message = 'Erreur lors de la supprimer de votre compte.';
        }
      })
    }
  }

}
