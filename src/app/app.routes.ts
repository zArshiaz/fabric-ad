import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {ProductsPage} from './pages/products-page/products-page';
import {AuthLayout} from './auth-layout/auth-layout';
import {LoginPage} from './pages/login-page/login-page';
import {MainLayout} from './main-layout/main-layout';
import {authGuard} from './guards/auth-guard';
import {AddProductPage} from './pages/add-product-page/add-product-page';
import {EditProductPage} from './pages/edit-product-page/edit-product-page';
import {CategoryPage} from './pages/category-page/category-page';
import {ProductDetailsPage} from './pages/product-details-page/product-details-page';
import {UsersPage} from './pages/users-page/users-page';
import {DetailsUserPage} from './pages/details-user-page/details-user-page';
import {CommentsPage} from './pages/comments-page/comments-page';
import {OrdersPage} from './pages/orders-page/orders-page';
import {OrderDetailsPage} from './pages/order-details-page/order-details-page';
import {ManagementNavbar} from './pages/management-navbar/management-navbar';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [{ path: '', component: LoginPage }]
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomePage },
      { path: 'orders', component: OrdersPage },
      { path: 'order/:id', component: OrderDetailsPage },
      { path: 'products', component: ProductsPage },
      { path: 'addProduct', component: AddProductPage },
      { path: 'editProduct/:slug', component: EditProductPage },
      { path: 'productDetails/:slug', component: ProductDetailsPage },
      { path: 'comments', component: CommentsPage },
      { path: 'category', component: CategoryPage },
      { path: 'users', component: UsersPage },
      { path: 'user/:id', component: DetailsUserPage },
      { path: 'navbar', component: ManagementNavbar },
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

