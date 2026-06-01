import { ChangeDetectorRef, Component } from '@angular/core';
import { Carousel } from '../../../core/services/carousel';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-list-carousel',
  imports: [RouterModule],
  templateUrl: './list-carousel.html',
  styleUrl: './list-carousel.css',
})
export class ListCarousel {

  constructor(private _carousel: Carousel, private _auth: Auth,private cdr: ChangeDetectorRef){}

  carousels: any;
  user: any

  ngOnInit():void{
    this._carousel.all().subscribe({
      next: (res)=>{
        this.carousels = res;
        this.cdr.detectChanges()
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Carousel',
          text: err.error.message,
        });
      },
    })

    this.user = this._auth.getDataFromToken()
  };


      deleteCarousel(id: any) {
         Swal.fire({
           title: 'Are you sure?',
           text: "You won't be able to revert this!",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes, delete it!',
         }).then((result) => {
           if (result.isConfirmed) {
             this._carousel.deleteCarousel(id).subscribe({
               next: (res) => {
                 this.ngOnInit();
               },
               error: (err) => {
                 Swal.fire({
                 icon: 'error',
                 title: "Team Not Delete",
                 text: err.error.message,
                });
               },
             });
           }
         });
       }

}
