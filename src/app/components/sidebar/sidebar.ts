import {Component, Input,} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private authService: AuthService,private router:Router) {
  }

  @Input('isShowSidebar')
  show: boolean = false;

  @Input('changeShowSidebar')
  changShow!: ()=>void;

  menuItems = [
    {icon: 'bootstrapLayoutWtf', label: "داشبورد", link: ''},
    {icon: 'heroShoppingCart', label: "سفارشات", link: 'orders'},
    {icon: 'bootstrapPaperclip', label: "محصولات", link: 'products'},
    {icon: 'bootstrapPlusCircle', label: "اضافه کردن محصول", link: 'addProduct'},
    {icon: 'bootstrapChatLeft', label: "کامنت ها", link: 'comments'},
    {icon: 'bootstrapLayoutWtf', label: "نوبار", link: 'navbar'},
    {icon: 'heroRectangleStack', label: "دسته بندی محصولات", link: 'category'},
    {icon: 'heroUserGroup', label: "کاربران", link: 'users'},
  ];


  logout() {
    this.authService.logout().subscribe(
      {
        next: (m) => {
          alert(m.message);
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err),
      });

  }


}
