import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {NgIcon} from '@ng-icons/core';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {CommentService} from '../../services/comment-service';
import {UserCommentsDto} from '../../dtos/user.dto';

@Component({
  selector: 'app-user-comment-item',
  imports: [
    JalaliDatePipe,
    NgIcon
  ],
  templateUrl: './user-comment-item.html',
  styleUrl: './user-comment-item.css',
})
export class UserCommentItem {

  constructor(private commentService: CommentService) {
  }
  @Input()
  comment!:UserCommentsDto;
  @Output()
  commentsChange = new EventEmitter();

  deleteComment(commentId:string){
    Swal.fire({
      text:'از حذف کامنت مطمعن هستید؟',
      icon:'warning',
      showCancelButton: true,
      confirmButtonText:'بله',
      cancelButtonText:'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteCommentById(commentId).subscribe({
          next:res=>{
            toast.fire({
              icon: 'success',
              text:'کامنت حذف شد'
            });
            this.commentsChange.emit();
          },
          error:err=>{
            toast.fire({
              icon: 'error',
              text:'خطا در حذف کامنت'
            });
          }
        })
      }
    })
  }
}
