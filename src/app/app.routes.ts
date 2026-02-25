import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';
import { MainLayout } from './main-layout/main-layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login-page/login-page').then(m => m.LoginPage),
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page').then(m => m.HomePage),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders-page/orders-page').then(m => m.OrdersPage),
      },
      {
        path: 'order/:id',
        loadComponent: () =>
          import('./pages/order-details-page/order-details-page').then(
            m => m.OrderDetailsPage,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products-page/products-page').then(m => m.ProductsPage),
      },
      {
        path: 'addProduct',
        loadComponent: () =>
          import('./pages/add-product-page/add-product-page').then(
            m => m.AddProductPage,
          ),
      },
      {
        path: 'editProduct/:slug',
        loadComponent: () =>
          import('./pages/edit-product-page/edit-product-page').then(
            m => m.EditProductPage,
          ),
      },
      {
        path: 'productDetails/:slug',
        loadComponent: () =>
          import('./pages/product-details-page/product-details-page').then(
            m => m.ProductDetailsPage,
          ),
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('./pages/comments-page/comments-page').then(
            m => m.CommentsPage,
          ),
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./pages/category-page/category-page').then(m => m.CategoryPage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users-page/users-page').then(m => m.UsersPage),
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./pages/details-user-page/details-user-page').then(
            m => m.DetailsUserPage,
          ),
      },
      {
        path: 'navbar',
        loadComponent: () =>
          import('./pages/management-navbar/management-navbar').then(
            m => m.ManagementNavbar,
          ),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
