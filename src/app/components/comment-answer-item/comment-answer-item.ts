import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AnswerDto} from '../../dtos/comment.dto';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {NgClass} from '@angular/common';
import {CommentService} from '../../services/comment-service';
import {toast} from '../../utilities/swal-toast-utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-answer-item',
  imports: [
    JalaliDatePipe,
    NgClass
  ],
  templateUrl: './comment-answer-item.html',
  styleUrl: './comment-answer-item.css',
})
export class CommentAnswerItem {
  constructor(private commentService: CommentService) { }
@Input({required:true}) answerData!: AnswerDto;

  @Output()
  answerCancelled = new EventEmitter<void>();

activeAnswer(){
  this.commentService.activeAnswerById(this.answerData._id)
    .subscribe({
      next: (result) => {
        toast.fire({
          icon: "success",
          text:'پاسخ تایید شد'
        })
        this.answerCancelled.emit();
      },
      error: (err) => {
        toast.fire({
          icon: "error",
          text:'خطا در تایید پاسخ'
        })
      }
    })
}
deleteAnswer(){
  Swal.fire({
    icon: "warning",
    title:"توجه",
    text:'پاسخ حذف شود.',
    showCancelButton: true,
    confirmButtonText:'بله',
    cancelButtonText:'خیر',
  }).then((result) => {
    if (result.isConfirmed) {
      this.commentService.deleteAnswerById(this.answerData._id)
        .subscribe({
          next: (result) => {
            toast.fire({
              icon: "success",
              text:'پاسخ حذف شد.'
            })
            this.answerCancelled.emit();
          },
          error: (err) => {
            toast.fire({
              icon: "error",
              text:'خطا در حذف پاسخ.'
            })
          }
        })
    }
  })
}
}
