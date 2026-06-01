import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Carousel } from '../../../core/services/carousel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-carousel',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout-carousel.html',
  styleUrl: './ajout-carousel.css',
})
export class AjoutCarousel {

carouselForm: FormGroup;
image: any;

constructor(private fb: FormBuilder, private _carousel: Carousel, private router: Router){

  let controle = {
    title: new FormControl('',[Validators.required]),
    text: new FormControl('',[Validators.required])
  }
  this.carouselForm = this.fb.group(controle)
}

selectImage(e: any){
  this.image = e.target.files[0];
}

save(){
  let fd = new FormData();

  fd.append('title', this.carouselForm.value.title),
  fd.append('text', this.carouselForm.value.text),
  fd.append('image', this.image)

  this._carousel.create(fd).subscribe({
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
