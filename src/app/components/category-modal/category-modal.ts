import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, WritableSignal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrors } from '../input-errors/input-errors';
import { CategoryService } from '../../services/category-service';
import { CategoryForm } from '../../dtos/category.dto';
import { toast } from '../../utilities/swal-toast-utility';
import { CategoryDto } from '../../dtos/product.dto';

@Component({
  selector: 'app-category-modal',
  imports: [
    NgIcon,
    ReactiveFormsModule,
    InputErrors
  ],
  templateUrl: './category-modal.html',
  styleUrls: ['./category-modal.css'],
})
export class CategoryModal implements OnChanges {
  constructor(private categoryService: CategoryService) {}

  @Input() showSignal!: WritableSignal<boolean>;
  @Output() categoryReset = new EventEmitter<void>();
  @Input() type: 'add' | 'edit' = 'add';
  @Input() category: CategoryDto | null = null;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && this.category) {
      this.categoryForm.patchValue({
        name: this.category.name,
        slug: this.category.slug,
        description: this.category.description
      });
    }

    if (changes['type'] && this.type === 'add') {
      this.categoryForm.reset();
    }
  }

  closeModal() {
    this.showSignal.set(false);
  }

  submitHandler() {
    if (!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const cat = this.categoryForm.value as CategoryForm;

    if (this.type === 'add') {
      this.categoryService.addCategory(cat).subscribe({
        next: (res) => {
          this.showSignal.set(false);
          toast.fire({ title: res.message, icon: 'success' });
          this.categoryReset.emit();
        },
        error: (err) => {
          toast.fire({ title: err.message, icon: 'error' });
        }
      });
    } else if (this.type === 'edit' && this.category) {
      this.categoryService.editCategoryById(this.category._id,cat).subscribe({
        next: (res) => {
          this.showSignal.set(false);
          toast.fire({ title: res.message, icon: 'success' });
          this.categoryReset.emit();
        },
        error: (err) => {
          toast.fire({ title: err.message, icon: 'error' });
        }
      });
    }
  }
}
