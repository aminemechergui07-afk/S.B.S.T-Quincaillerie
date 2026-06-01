import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Blog } from '../../../core/services/blog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-blog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-blog.html',
  styleUrl: './update-blog.css',
})
export class UpdateBlog {

blogForm: FormGroup;
image: any;
id: any;

constructor(private fb: FormBuilder, private _blog: Blog, private _act: ActivatedRoute, private router: Router){

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

ngOnInit():void{
  this.id = this._act.snapshot.paramMap.get('id');
  this._blog.byId(this.id).subscribe({
    next:(res)=>{
      this.blogForm.reset(res);
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: "Error Not save Team",
        text: err.error.message,
      });
    },
  })
}

save(){
  let fd = new FormData();

  fd.append('title', this.blogForm.value.title);
  fd.append('description', this.blogForm.value.description);
  fd.append('blockquote', this.blogForm.value.blockquote);

  if(this.image){
    fd.append('image', this.image)
  }

  this._blog.update(this.id ,fd).subscribe({
          next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Your Team has been saved',
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
