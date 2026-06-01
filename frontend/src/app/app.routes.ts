import { Routes } from '@angular/router';
import { Products } from './home/products/products';
import { Carousels } from './home/carousels/carousels';
import { News } from './home/news/news';
import { Blogs } from './home/blogs/blogs';
import { AjoutProduct } from './home/products/ajout-product/ajout-product';
import { ListProduct } from './home/products/list-product/list-product';
import { UpdateProduct } from './home/products/update-product/update-product';
import { Notfound } from './notfound/notfound';
import { Register } from './users/register/register';
import { Login } from './users/login/login';
import { Profile } from './users/profile/profile';
import { AjoutCarousel } from './home/carousels/ajout-carousel/ajout-carousel';
import { ListCarousel } from './home/carousels/list-carousel/list-carousel';
import { UpdateCarousel } from './home/carousels/update-carousel/update-carousel';
import { AjoutNews } from './home/news/ajout-news/ajout-news';
import { ListNews } from './home/news/list-news/list-news';
import { UpdateNews } from './home/news/update-news/update-news';
import { AjoutBlog } from './home/blogs/ajout-blog/ajout-blog';
import { ListBlog } from './home/blogs/list-blog/list-blog';
import { UpdateBlog } from './home/blogs/update-blog/update-blog';
import { Dashboard } from './dashboard/dashboard';
import { OrderManagement } from './dashboard/order-management/order-management';
import { MyCart } from './home/my-cart/my-cart';
import { DetailProduct } from './home/products/detail-product/detail-product';
import { OrderSuccessComponent } from './home/order-success/order-success.component';
import { DetailNews } from './home/news/detail-news/detail-news';
import { DetailBlog } from './home/blogs/detail-blog/detail-blog';
import { adminGuard } from './core/guards/admin-guard';
import { loginGuard } from './core/guards/login-guard';
import { homeGuard } from './core/guards/home-guard';


export const routes: Routes = [

   {path: '', redirectTo:'home', pathMatch: 'full'},

  {path: 'home', component: Dashboard},
  {path: 'dashboard/orders', canActivate:[adminGuard],component: OrderManagement},

  {path:'products', component: Products, children: [

    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {path: 'ajout', canActivate:[adminGuard], component: AjoutProduct},
    {path: 'list', component: ListProduct},
    {path: 'update/:id', canActivate:[adminGuard],component: UpdateProduct},
    {path: 'detailProduct/:id', component: DetailProduct}

  ]},

  {path:'carousels', component: Carousels, children: [

    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {path: 'ajout', canActivate:[adminGuard],component: AjoutCarousel},
    {path: 'list', component: ListCarousel},
    {path: 'update/:id', canActivate:[adminGuard],component: UpdateCarousel},


  ]},


  {path:'news', component: News, children:[

    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {path: 'ajout', canActivate:[adminGuard],component: AjoutNews},
    {path: 'list', component: ListNews},
    {path: 'update/:id', canActivate:[adminGuard],component: UpdateNews},
    {path: 'detailNew/:id', component: DetailNews}

  ]},


  {path:'blogs', component: Blogs,children:[

    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {path: 'ajout', canActivate:[adminGuard],component: AjoutBlog},
    {path: 'list', component: ListBlog},
    {path: 'update/:id', canActivate:[adminGuard],component: UpdateBlog},
    {path: 'detailBlog/:id', component: DetailBlog}

  ]},


  {path: 'cart', component: MyCart},
  {path: 'order-success', component: OrderSuccessComponent},

  {path: 'register', canActivate:[loginGuard],component: Register},
  {path: 'login', canActivate:[loginGuard],component: Login},
  {path: 'profile', canActivate:[homeGuard], component: Profile},

  {path: '**', component: Notfound}

];
