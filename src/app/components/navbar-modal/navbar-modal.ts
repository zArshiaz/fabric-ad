import {Component, effect, inject, input, model, signal} from '@angular/core';
import {applyEach, Field, form, required, SchemaPathTree, submit} from '@angular/forms/signals';
import {NgIcon} from '@ng-icons/core';
import {NavbarService} from '../../services/navbar-service';
import {DropdownForm, NavbarForm, NavbarItem, NavbarList} from '../../dtos/navbar.dto';
import {toast} from '../../utilities/swal-toast-utility';


function dropdownValidation(sp: SchemaPathTree<DropdownForm>) {
  required(sp.title, {message: 'عنوان ضروری است.'});
  required(sp.href, {message: 'آدرس ضروری است.'});
}

@Component({
  selector: 'app-navbar-modal',
  imports: [
    NgIcon,
    Field
  ],
  templateUrl: './navbar-modal.html',
  styleUrl: './navbar-modal.css',
})
export class NavbarModal {
  navbarService = inject(NavbarService);
  navbarItems = model.required<NavbarList>()
  navbarItem = input<NavbarItem>()
  isOpen = model.required<boolean>();
  type = input.required<'add' | 'edit'>()

  loading = signal(false)
  navbarSignal = signal<NavbarForm>({
    title: '',
    href: '',
    order: 0,
    dropdownItems: []
  })

  navbarForm = form(this.navbarSignal, (schemaPathTree) => {
    required(schemaPathTree.title, {message: 'عنوان ضروری است'})
    required(schemaPathTree.href, {message: 'آدرس ضروری است'})
    required(schemaPathTree.order, {message: 'ردیف نمایش ضروری است'})

    applyEach(schemaPathTree.dropdownItems, dropdownValidation)
  })

  constructor() {
    effect(() => {
      const t = this.type();
      const item = this.navbarItem();

      if (t === 'edit' && item) {
        const { _id, __v, ...v } = item;
        this.initValueForm(v);
      }
    }, { allowSignalWrites: true });
  }


  initValueForm(value: NavbarForm) {
    this.navbarForm().reset(value)
  }

  closeModal() {
    this.isOpen.set(false);
  }

  addDropdownItem() {
    this.navbarForm.dropdownItems().value.update((p) => {
      let newList = [...p]
      newList.push({title: '', href: ''})
      return newList;
    })
  }

  removeDropdownItem(index: number) {
    this.navbarForm.dropdownItems().value.update((p) => {
      p.splice(index, 1)
      return [...p];
    })
  }

  onSubmit(e: Event) {
    e.preventDefault();
    submit(this.navbarForm, async () => {
      this.loading.set(true);
      if (this.type() === 'add') {
        this.navbarService.addNavbar(this.navbarForm().value()).subscribe({
          next: (value) => {
            toast.fire({
              icon: 'success',
              text: 'ناوبار جدید ثپت شد.'
            })
            console.log(value)

            this.navbarItems.update((p) => {
              let newList = [...p]
              newList.push(value)
              return newList.sort((a, b) => a.order - b.order);
            })
            this.closeModal()
          },
          error: (err) => {
            toast.fire({
              icon: 'error',
              text: 'خطا در ثبت ناوبار جدید'
            })
          },
          complete: () => {
            this.loading.set(false);
          }
        })
      }
      else {
        let id =this.navbarItem()?._id
        if(id) this.navbarService.editNavbar(id,this.navbarForm().value()).subscribe({
          next: (value) => {
            toast.fire({
              icon: 'success',
              text: 'ناوبار ویرایش شد.'
            })

            this.navbarItems.update((p) => {
              let newList = p.filter(item => item._id != id)
              newList.push(value)
              return newList.sort((a, b) => a.order - b.order);
            })
            this.closeModal()
          },
          error: (err) => {
            toast.fire({
              icon: 'error',
              text: 'خطا در ویرایش ناوبار'
            })
          },
          complete: () => {
            this.loading.set(false);
          }
        })
      }
    })
  }
}
