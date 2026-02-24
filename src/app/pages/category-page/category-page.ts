import {Component, signal, WritableSignal} from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {CategoryDto} from '../../dtos/product.dto';
import {CategoryService} from '../../services/category-service';
import {Alert} from '../../components/alert/alert';
import {Loading} from '../../components/loading/loading';
import {DatePipe} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {CategoryModal} from '../../components/category-modal/category-modal';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {CategoryItem} from '../../components/category-item/category-item';



@Component({
  selector: 'app-category-page',
  imports: [
    PageHeader,
    Alert,
    Loading,
    NgIcon,
    CategoryModal,
    CategoryItem
  ],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage {
  constructor(private categoryService:CategoryService ) {
    this.getData()
  }
  loading=signal(true)
  error=signal(false)
  showAddModal=signal(false)
  categories:CategoryDto[]=[];

  showingAddModal(){
    this.showAddModal.set(true)
  }

  getData(){
   this.categoryService.getAllCategories().subscribe({
      next:res => {
        this.categories = res;
        this.loading.set(false)
      },
      error:err => {
        this.loading.set(false)
        this.error.set(true)
      }
    });
  }

}
