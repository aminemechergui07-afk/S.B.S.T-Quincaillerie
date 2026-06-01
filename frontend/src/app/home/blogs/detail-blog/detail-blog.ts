import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Blog } from '../../../core/services/blog';

@Component({
  selector: 'app-detail-blog',
  imports: [RouterModule],
  templateUrl: './detail-blog.html',
  styleUrl: './detail-blog.css',
})
export class DetailBlog {

blogs: any;
id: any;

constructor(private _blog: Blog, private cdr: ChangeDetectorRef){}

ngOnInit():void{
  this._blog.all().subscribe({
  next: (res)=>{
    this.blogs = res;
    this.cdr.detectChanges();
  }
  })
}

}
