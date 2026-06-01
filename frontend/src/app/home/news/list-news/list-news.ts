import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { News } from '../../../core/services/news';
import Swal from 'sweetalert2';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-list-news',
  imports: [RouterModule],
  templateUrl: './list-news.html',
  styleUrl: './list-news.css',
})
export class ListNews {
  news: any;
  user: any;

  constructor(
    private _news: News,
    private cdr: ChangeDetectorRef,
    private _auth: Auth
  ) {}

  ngOnInit(): void {
    this._news.all().subscribe({
      next: (res) => {
        this.news = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Team Not Delete',
          text: err.error.message,
        });
      },
    });
    this.user = this._auth.getDataFromToken()
  }

  deleteNews(id: any) {
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
        this._news.deleteNew(id).subscribe({
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
