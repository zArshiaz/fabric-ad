import {Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {AnswerDto, CommentDto} from '../../dtos/comment.dto';
import {CommentService} from '../../services/comment-service';
import {CommentAnswerItem} from '../comment-answer-item/comment-answer-item';
import {Loading} from '../loading/loading';
import {Alert} from '../alert/alert';
import {Field, form, minLength, required} from '@angular/forms/signals';
import {toast} from '../../utilities/swal-toast-utility';

@Component({
  selector: 'app-comment-answer-modal',
  imports: [
    FormsModule,
    NgIcon,
    CommentAnswerItem,
    Loading,
    Alert,
    Field
  ],
  templateUrl: './comment-answer-modal.html',
  styleUrl: './comment-answer-modal.css',
})
export class CommentAnswerModal implements OnInit {
  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.getData()
  }

  @Input({required: true}) commentId!: string;
  @Input({required: true}) showModal!: WritableSignal<boolean>;

  @Output() commentChanged = new EventEmitter<void>();

  answers: WritableSignal<AnswerDto[]> = signal([])
  loading = signal(true);
  isShowAnswerForm=signal(false)
  answerModel=signal({
    text:''
  })
  answerForm =form(this.answerModel,(schemaPath)=>{
    required(schemaPath.text,{message:"متن پاسخ الزامی."});
    minLength(schemaPath.text,5,{message:"متن پاسخ باید حداقل 5کاراکتر باشد."});
  })

  closeModal() {
    this.showModal.set(false);
    this.commentChanged.emit();
  }
  closeForm(){
    this.isShowAnswerForm.set(false);
  }
  showForm(){
    this.isShowAnswerForm.set(true);
  }

  getData() {
    this.commentService.getAllAnswersComment(this.commentId)
      .subscribe({
        next: (result) => {
          this.loading.set(false);
          this.answers.set(result)
        }
      })
  }

  submit(e:Event) {
    e.preventDefault();
     this.answerForm.text().markAsTouched();
    if(this.answerForm().invalid()) return;
    this.commentService.answerCommentById(this.commentId,this.answerForm.text().value())
      .subscribe({
        next: () => {
          toast.fire({
            icon: 'success',
            text:'پاسخ ثبت شد.'
          })
          this.getData();
          this.answerForm.text().value.set('')
          this.closeForm();
        },
        error: () => {
          toast.fire({
            icon: 'error',
            text:'خطا در ثبت پاسخ.'
          })
        }
      })
  }

}
