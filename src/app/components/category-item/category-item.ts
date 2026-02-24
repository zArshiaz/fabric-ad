import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {CategoryDto} from '../../dtos/product.dto';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {CategoryService} from '../../services/category-service';
import {CategoryModal} from '../category-modal/category-modal';

@Component({
  selector: 'app-category-item',
  imports: [
    CategoryModal
  ],
  templateUrl: './category-item.html',
  styleUrl: './category-item.css',
})
export class CategoryItem {
  constructor(private categoryService: CategoryService) {
  }

  showEditModalSignal=signal(false)

  showEditModal(){
    this.showEditModalSignal.set(true)
  }
  @Input() category!: CategoryDto;
  @Output() categoryReset = new EventEmitter();

  categoryEdited(){
    this.categoryReset.emit();
  }

  deleteHandler() {
    Swal.fire({
      title: 'از حذف دسته بندی (' + this.category.name + ') مطمعن هستید؟',
      text: 'از لیست دسته بندی محصول ها نیز حذف میشود',
      showCancelButton: true,
      cancelButtonText: 'لغو',
      confirmButtonText: 'بله',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryById(this.category._id)
          .subscribe({
            next: (res) => {
              toast.fire({
                icon: 'success',
                text:res.message,
              })
              this.categoryReset.emit()
            },
            error: (err) => {
              toast.fire({
                icon: 'error',
                text:err.message,
              })
            }
          })
      }
    })
  }
}
