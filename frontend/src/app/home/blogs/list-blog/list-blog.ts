import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Blog } from '../../../core/services/blog';
import Swal from 'sweetalert2';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-list-blog',
  imports: [RouterModule],
  templateUrl: './list-blog.html',
  styleUrl: './list-blog.css',
})
export class ListBlog {
  constructor(
    private _blog: Blog,
    private cdr: ChangeDetectorRef,
    private _auth: Auth
  ) {}

  blogs: any;
  user: any;

  ngOnInit(): void {
    this._blog.all().subscribe({
      next: (res) => {
        this.blogs = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Not save Blog',
          text: err.error.message,
        });
      },
    });

    this.user = this._auth.getDataFromToken()
  }

  deleteBlog(id: any) {
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
        this._blog.deleteBlog(id).subscribe({
          next: (res) => {
            this.ngOnInit();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Team Not Delete',
              text: err.error.message,
            });
          },
        });
      }
    });
  }
}
