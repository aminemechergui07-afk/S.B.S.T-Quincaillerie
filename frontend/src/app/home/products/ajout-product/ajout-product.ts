import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Product } from '../../../core/services/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout-product.html',
  styleUrl: './ajout-product.css',
})
export class AjoutProduct {

  productForm: FormGroup;
  images: any;

  constructor(
    private fb: FormBuilder,
    private _product: Product,
    private router: Router,
  ) {
    let controle = {
      name: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    };
    this.productForm = this.fb.group(controle);
  }

  selectImage(e: any) {
    this.images = e.target.files;
  }

  save() {
    let fd = new FormData();

    fd.append('name', this.productForm.value.name);
    fd.append('prix', this.productForm.value.prix);
    fd.append('description', this.productForm.value.description);
    fd.append('status', this.productForm.value.status);

    for(let image of this.images){
      fd.append('images', image);
    }

    this._product.create(fd).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Your Product has been saved',
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
          title: 'Error Not save Product',
          text: err.error.message,
        });
      },
    });
  }
}
