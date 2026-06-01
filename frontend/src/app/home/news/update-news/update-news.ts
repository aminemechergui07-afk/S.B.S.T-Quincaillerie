import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../../core/services/news';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-news',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-news.html',
  styleUrl: './update-news.css',
})
export class UpdateNews {


newsForm: FormGroup;
image: any;
id:any;

constructor(private fb: FormBuilder, private _news: News, private _act: ActivatedRoute, private router: Router){

  let controle = {
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    blockquote: new FormControl('',[Validators.required])
  }
  this.newsForm = this.fb.group(controle)
}

selectImage(e: any){
  this.image = e.target.files[0];
}

ngOnInit(): void{
  this.id = this._act.snapshot.paramMap.get('id');
  this._news.byId(this.id).subscribe({
    next:(res)=>{
      this.newsForm.reset(res)
    }
  })
}

save(){
  let fd = new FormData();

  fd.append('title', this.newsForm.value.title);
  fd.append('description', this.newsForm.value.description);
  fd.append('blockquote', this.newsForm.value.blockquote);

  if(this.image){
    fd.append('image', this.image);
  }

  this._news.update(this.id ,fd).subscribe({
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
