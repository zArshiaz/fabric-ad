import {Component, Input, signal} from '@angular/core';
import {CommentDto} from '../../dtos/comment.dto';
import {Alert} from '../alert/alert';
import {PrintStar} from '../print-star/print-star';
import {NgIcon} from '@ng-icons/core';
import {CommentItem} from '../comment-item/comment-item';
import {AddCommentModal} from '../add-comment-modal/add-comment-modal';

@Component({
  selector: 'app-comment-list',
  imports: [
    Alert,
    CommentItem,
    AddCommentModal
  ],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css',
})
export class CommentList {
  @Input() comments!: CommentDto[];
  @Input() productId!: string;

  isShowAddModal=signal(false)

  showAddModal(){
    this.isShowAddModal.set(true);
  }
}
