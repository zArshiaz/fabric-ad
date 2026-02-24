import {Component, EventEmitter, Input, OnInit, Output, WritableSignal} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentDto, EditCommentForm} from '../../dtos/comment.dto';
import {toast} from '../../utilities/swal-toast-utility';
import {CommentService} from '../../services/comment-service';
import {comment} from 'postcss';

@Component({
  selector: 'app-edit-comment-modal',
  imports: [
    NgIcon,
    ReactiveFormsModule
  ],
  templateUrl: './edit-comment-modal.html',
  styleUrl: './edit-comment-modal.css',
})
export class EditCommentModal implements OnInit {
  constructor(private commentService: CommentService) { }

  @Input() showModal!: WritableSignal<boolean>;
  @Input() commentData!: CommentDto;

  editCommentForm: FormGroup = new FormGroup({
    'text': new FormControl('', [Validators.required]),
    'stars': new FormControl('', [Validators.required]),
    'status': new FormControl('', [Validators.required]),
  })


  @Output()
  commentChanged: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.editCommentForm.patchValue({
      text: this.commentData.text,
      status: this.commentData.status,
      stars: this.commentData.stars
    })
  }

  closeModal() {
    this.showModal.set(false)
  }

  submitComment() {
    if (this.editCommentForm.invalid) {
      this.editCommentForm.markAllAsTouched()
      return;
    }
    if (this.editCommentForm.pristine) {
      toast.fire({
        icon: 'info',
        text: 'تغییر یکی از فیلد ها الزامی'
      })
      return;
    }
    const data = this.editCommentForm.value as EditCommentForm
    if(data){
      this.commentService.editCommentById(this.commentData._id,data)
        .subscribe({
          next: ()=> {
            toast.fire({
              icon: 'success',
              text:'کامنت تغییر یافت.'
            })
            this.closeModal();
            this.commentChanged.emit()
          },
          error: ()=> {
            toast.fire({
              icon: 'error',
              text:'خطا در تغییر کامنت.'
            })
          }
        })
    }
  }
}
