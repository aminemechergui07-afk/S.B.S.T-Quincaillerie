import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../core/services/user';
import { Auth } from '../../core/auth/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {


profileForm: FormGroup;

image: any;

users: any

id: any;


constructor(private fb: FormBuilder, private _user: User, private _auth: Auth, private router: Router){

let controle = {
  name: new FormControl('',[Validators.required]),
  lastName: new FormControl('',[Validators.required]),
  tel: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required, Validators.email]),
  password: new FormControl('',[])
}
this.profileForm = this.fb.group(controle)
}

selectImage(e: any){
  this.image = e.target.files[0];
}


ngOnInit():void{

this.users = this._auth.getDataFromToken();

  if (!this.users?._id) {
    this.router.navigate(['/login']);
    return;
  }

  this.id = this.users._id;

  if (this.id) {
    this._user.byId(this.id).subscribe({
      next: (res: any) => {
        this.users = res;
        this.profileForm.patchValue({
          name: res.name,
          lastName: res.lastName,
          tel: res.tel,
          email: res.email,
        });
      },
      error: (err) => {
      Swal.fire({
        icon: 'error',
        title: "Error Not save User",
        text: err.error.message,
      });
    },
    });
  }

}


save(){
  let fd = new FormData();

fd.append('name', this.profileForm.value.name),
fd.append('lastName', this.profileForm.value.lastName),
fd.append('tel', this.profileForm.value.tel),
fd.append('email', this.profileForm.value.email)

  if(this.profileForm.value.password?.length > 0){
    fd.append('password', this.profileForm.value.password);
  }

  if(this.image){
    fd.append('image', this.image)
  }

  this._user.update(this.id,fd).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Your User has been saved',
            showConfirmButton: false,
            timer: 1500,
            background: '#1c2128',
            color: '#fff'
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: "Error Not save User",
            text: err.error.message,
          });
        },
  })


}





  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
