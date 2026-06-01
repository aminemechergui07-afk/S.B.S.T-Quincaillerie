import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { News } from '../../../core/services/news';

@Component({
  selector: 'app-detail-news',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail-news.html',
  styleUrl: './detail-news.css',
})
export class DetailNews {

  news: any;


constructor(private _news: News, private cdr: ChangeDetectorRef){}

ngOnInit():void{
  this._news.all().subscribe({
  next: (res)=>{
    this.news = res;
    this.cdr.detectChanges();
  }
  })
}

}
