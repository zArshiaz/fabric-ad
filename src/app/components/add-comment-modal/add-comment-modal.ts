import {Component, inject, Input, input, signal, WritableSignal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {Field, form, max, min, minLength, required} from '@angular/forms/signals';
import {PrintStar} from '../print-star/print-star';
import {CommentService} from '../../services/comment-service';
import {ActivatedRoute} from '@angular/router';
import {toast} from '../../utilities/swal-toast-utility';

@Component({
  selector: 'app-add-comment-modal',
  imports: [
    NgIcon,
    Field,
    PrintStar
  ],
  templateUrl: './add-comment-modal.html',
  styleUrl: './add-comment-modal.css',
})
export class AddCommentModal {
  constructor(private commentService: CommentService,private route:ActivatedRoute) {
  }

  @Input({required: true})
  isShowModal!: WritableSignal<boolean>;
  @Input({required: true})
  productId!: string;


  commentModel = signal({
    text: '',
    stars: 0
  })

  commentForm = form(this.commentModel, (schemaPath) => {
    required(schemaPath.text, {message: 'متن کامنت ضروری.'});
    required(schemaPath.stars, {message: 'امتیاز ضروری.'});
    minLength(schemaPath.text, 5, {message: 'متن باید حداقل 5کاراکتر باشد.'});
    min(schemaPath.stars, 0, {message: 'امتیاز باید یه مقدار مثبت باشد.'});
    max(schemaPath.stars, 5, {message: 'امتیاز باید کمتر از 5باشد.'});

  });

  closeModal() {
    this.isShowModal.set(false);
  }

 async submitHandler(event: Event) {
    event.preventDefault();
    const data=this.commentForm().value()
    if(data){
      this.commentService.addCommentById(this.productId,data).subscribe({
        next: ()=>{
          toast.fire({
            icon: 'success',
            text:'کامنت ثبت شد.'
          })
          this.closeModal()
        },
        error: ()=>{
          toast.fire({
            icon: 'error',
            text:'خطا در ثبت کامنت.'
          })
        }
      })
    }
  }
}
