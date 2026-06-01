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
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct {

  productForm: FormGroup;
  images: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private _product: Product,
    private router: Router,
    private _act: ActivatedRoute
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

  ngOnInit():void{
    this.id = this._act.snapshot.paramMap.get('id');
    this._product.byId(this.id).subscribe({
      next:(res)=>{
        this.productForm.reset(res);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Product',
          text: err.error.message,
        });
      },
    })
  }

  save() {
    let fd = new FormData();

    fd.append('name', this.productForm.value.name);
    fd.append('prix', this.productForm.value.prix);
    fd.append('description', this.productForm.value.description);
    fd.append('status', this.productForm.value.status);

   if (this.images && this.images.length > 0) {
  for (let image of this.images) {
    fd.append('images', image);
  }
}


    this._product.update(this.id, fd).subscribe({
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
