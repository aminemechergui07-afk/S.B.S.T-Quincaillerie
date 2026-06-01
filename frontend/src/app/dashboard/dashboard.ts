import { Component } from '@angular/core';
import { ListCarousel } from '../home/carousels/list-carousel/list-carousel';
import { ListProduct } from '../home/products/list-product/list-product';
import { ListNews } from '../home/news/list-news/list-news';
import { ListBlog } from '../home/blogs/list-blog/list-blog';

@Component({
  selector: 'app-dashboard',
  imports: [ListCarousel, ListProduct, ListNews, ListBlog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
