import {Component, effect, EventEmitter, input, Input, Output, signal} from '@angular/core';
import {CommentDto} from '../../dtos/comment.dto';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {NgClass} from '@angular/common';
import {PrintStar} from '../print-star/print-star';
import {RouterLink} from '@angular/router';
import {EditCommentModal} from '../edit-comment-modal/edit-comment-modal';
import {CommentService} from '../../services/comment-service';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {CommentAnswerModal} from '../comment-answer-modal/comment-answer-modal';

@Component({
  selector: 'app-comments-page-item',
  imports: [
    JalaliDatePipe,
    NgClass,
    PrintStar,
    RouterLink,
    EditCommentModal,
    CommentAnswerModal
  ],
  templateUrl: './comments-page-item.html',
  styleUrl: './comments-page-item.css',
})
export class CommentsPageItem {
  constructor(private commentService :CommentService) {

  }
  comment = input.required<CommentDto>();
  @Output()
  commentChanged: EventEmitter<void> = new EventEmitter();
  isShowEditCommentModal = signal(false);
  isShowCommentAnswerModal = signal(false);

  showEditCommentModal() {
    this.isShowEditCommentModal.set(true)
  }
  showCommentAnswerModal() {
    this.isShowCommentAnswerModal.set(true)
  }

  activeComment() {
    this.commentService.activeCommentById(this.comment()._id)
      .subscribe(comment => {
        this.commentChanged.emit()
      })
  }

  deleteComment() {
    Swal.fire({
      text:'از حذف این کامنت مطمعن هستید؟',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'خیر',
      confirmButtonText:'بله',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteCommentById(this.comment()._id)
          .subscribe({
            next: (res) => {
              toast.fire({
                icon:'success',
                text:'کامنت حذف شد.'
              })
             this.commentChanged.emit();
            },
            error: () => {
              toast.fire({
                icon:'error',
                text:'خطا در حذف  کامنت.'
              })
            }
          })
      }
    })
  }

}
