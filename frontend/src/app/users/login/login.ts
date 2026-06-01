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
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  private returnUrl: string | null;

  constructor(
    private fb: FormBuilder,
    private _user: User,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    let controle = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    };
    this.loginForm = this.fb.group(controle);
  }

  login() {
    this._user.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.myToken);
        this.router.navigateByUrl(this.returnUrl || '/home');
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'email or password invalid',
          text: err.error.message,
        });
      },
    });
  }
}
