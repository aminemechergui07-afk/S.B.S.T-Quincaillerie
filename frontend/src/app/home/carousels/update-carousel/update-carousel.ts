import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Carousel } from '../../../core/services/carousel';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-carousel',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-carousel.html',
  styleUrl: './update-carousel.css',
})
export class UpdateCarousel {


carouselForm: FormGroup;
image: any;
id: any

constructor(private fb: FormBuilder, private _carousel: Carousel, private _act: ActivatedRoute, private router: Router){

  let controle = {
    title: new FormControl('',[Validators.required]),
    text: new FormControl('',[Validators.required])
  }
  this.carouselForm = this.fb.group(controle)
}

selectImage(e: any){
  this.image = e.target.files[0];
}

ngOnInit():void{
  this.id = this._act.snapshot.paramMap.get('id');
  this._carousel.byId(this.id).subscribe({
    next: (res:any)=>{
      this.carouselForm.reset(res)
    }
  })
}

save(){
  let fd = new FormData();

  fd.append('title', this.carouselForm.value.title),
  fd.append('text', this.carouselForm.value.text)

  if(this.image){
    fd.append('image', this.image)
  }

  this._carousel.update(this.id ,fd).subscribe({
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
          title: 'Error Not save Carousel',
          text: err.error.message,
        });
      },
  })
}

}
