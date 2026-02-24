import {Component, inject, signal} from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {NavbarService} from '../../services/navbar-service';
import {NgIcon} from '@ng-icons/core';
import {NavbarModal} from '../../components/navbar-modal/navbar-modal';
import {Loading} from '../../components/loading/loading';
import {Alert} from '../../components/alert/alert';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {NavbarItem, NavbarList} from '../../dtos/navbar.dto';

@Component({
  selector: 'app-management-navbar',
  imports: [
    PageHeader,
    NgIcon,
    NavbarModal,
    Loading,
    Alert
  ],
  templateUrl: './management-navbar.html',
  styleUrl: './management-navbar.css',
})
export class ManagementNavbar {
  loading = signal(true)
  error = signal(false)
  navbarItems=signal<NavbarList>([]);
  selectedItem=signal<NavbarItem|null>(null);
  isOpenAddModal=signal(false)
  isOpenEditModal=signal(false)

  navbarService=inject(NavbarService)

  constructor() {
    this.navbarService.getAllNavbar().subscribe({
      next: data => {
        this.navbarItems.set(data)
      },
      error: () => {
        this.error.set(true)
      },
      complete: () => {
        this.loading.set(false)
      }
    })
  }

  openAddModal(){
    this.isOpenAddModal.set(true);
  }
  openEditModal(){
    this.isOpenEditModal.set(true);
  }
  setItem(item: NavbarItem) {
    this.selectedItem.set(item)
  }

  deleteNavbar() {
    let selectedItem = this.selectedItem();
    if(selectedItem) {
      Swal.fire({
        text:'از حذف این ناوبار مطمعن هستید؟',
        icon:'question',
        showCancelButton: true,
        cancelButtonText:'خیر',
        confirmButtonText:'بله'
      }).then((result) => {
        if (result.isConfirmed) {
          this.navbarService.deleteNavbar(selectedItem._id).subscribe({
            next: () => {
              toast.fire({
                icon:'success',
                text:'ناوبار انتخابی حذف شد.'
              })
              this.navbarItems.update(prev=>{
                let newList=[...prev]
                let index =newList.findIndex(item=>item._id===selectedItem._id)
                newList.splice(index,1)
                return newList
              })
              this.selectedItem.set(null)
            },
            error: () => {
              toast.fire({
                icon:'error',
                text:'خطا در حذف ناوبار.'
              })
            }
          })
        }
      })
    }
  }
}
