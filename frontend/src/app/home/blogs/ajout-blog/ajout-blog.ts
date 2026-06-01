import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Blog } from '../../../core/services/blog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajout-blog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout-blog.html',
  styleUrl: './ajout-blog.css',
})
export class AjoutBlog {


blogForm: FormGroup;
image: any;

constructor(private fb: FormBuilder, private _blog: Blog, private router: Router){

  let controle = {
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    blockquote: new FormControl('',[Validators.required])
  }
  this.blogForm = this.fb.group(controle)
}

selectImage(e: any){
  this.image = e.target.files[0];
}

save(){
  let fd = new FormData();

  fd.append('title', this.blogForm.value.title),
  fd.append('description', this.blogForm.value.description),
  fd.append('blockquote', this.blogForm.value.blockquote),
  fd.append('image', this.image)

  this._blog.create(fd).subscribe({
    next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Your Blog has been saved',
          showConfirmButton: false,
          timer: 1500,
          background: '#1c2128',
          color: '#fff',
        });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Blog',
          text: err.error.message,
        });
      },
  })
}

}
