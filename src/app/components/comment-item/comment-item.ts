import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {CommentDto} from '../../dtos/comment.dto';
import {PrintStar} from '../print-star/print-star';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';
import {TimeAgoPipe} from '../../pipes/time-ago-pipe';
import {CommentService} from '../../services/comment-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputErrors} from '../input-errors/input-errors';
import {toast} from '../../utilities/swal-toast-utility';

@Component({
  selector: 'app-comment-item',
  imports: [
    PrintStar,
    NgIcon,
    NgClass,
    TimeAgoPipe,
    ReactiveFormsModule,
    InputErrors
  ],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
})
export class CommentItem implements OnInit {
  @Input() comment!: CommentDto;
  commentLikedByCurrentUser: WritableSignal<boolean> = signal(false)
  showAnswer: WritableSignal<boolean> = signal(false)
  showAnswerForm: WritableSignal<boolean> = signal(false)
  likeCount: WritableSignal<number> = signal(0)

  commentForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });


  constructor(private commentService: CommentService) {
  }

  handleShowAnswer() {
    this.showAnswer.update(p => !p)
  }

  handleShowAnswerForm() {
    this.showAnswerForm.update(p => !p)
  }

  ngOnInit() {
    this.commentLikedByCurrentUser.set(this.comment.likedByCurrentUser);
    this.likeCount.set(this.comment.likesCount)
  }

  likeHandler() {
    this.commentService.likeCommentById(this.comment._id)
      .subscribe(res => {
        console.log(res)
        this.likeCount.set(res.likesCount)
        this.commentLikedByCurrentUser.set(res.liked);
      });
  }


  sendAnswer() {
    const text=this.commentForm.get('text')?.value
    if (!this.commentForm.invalid && text) {
      this.commentService.answerCommentById(this.comment._id,text).subscribe({
        next: () => {
          toast.fire({
            icon: 'success',
            text:'پاسخ شما ثبت شد.'
          })
          this.commentForm.reset();
          this.showAnswerForm.set(false)
        },
        error: () => {
          toast.fire({
            icon: 'error',
            text:'خطا در ثبت پاسخ'
          })
        }
      })
    }else {
      this.commentForm.markAllAsTouched();
    }
  }

}
