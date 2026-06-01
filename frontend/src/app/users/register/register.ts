import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../core/services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  private returnUrl: string | null;

  constructor(
    private fb: FormBuilder,
    private _user: User,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    const controle = {
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    };
    this.registerForm = this.fb.group(controle);
  }

  save() {
    const credentials = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this._user.register(this.registerForm.value).subscribe({
      next: () => {
        this._user.login(credentials).subscribe({
          next: (loginRes: any) => {
            localStorage.setItem('token', loginRes.myToken);
            this.router.navigateByUrl(this.returnUrl || '/profile');
          },
          error: () => {
            Swal.fire({
              icon: 'warning',
              title: 'Compte cree',
              text: 'Votre compte est cree, mais la connexion automatique a echoue.',
            }).then(() => {
              this.router.navigate(['/login'], {
                queryParams: this.returnUrl
                  ? { returnUrl: this.returnUrl }
                  : undefined,
              });
            });
          },
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Account !!',
          text: err.error.message,
        });
      },
    });
  }
}
