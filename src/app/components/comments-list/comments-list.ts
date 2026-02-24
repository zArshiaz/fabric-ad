import {Component, computed, EventEmitter, Output, signal, WritableSignal} from '@angular/core';
import {CommentDto} from '../../dtos/comment.dto';
import {CommentService} from '../../services/comment-service';
import {Loading} from '../loading/loading';
import {Alert} from '../alert/alert';
import {CommentsPageItem} from '../comments-page-item/comments-page-item';
import {Field, form} from '@angular/forms/signals';

@Component({
  selector: 'app-comments-list',
  imports: [
    Loading,
    Alert,
    CommentsPageItem,
    Field
  ],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css',
})
export class CommentsList {
  constructor(private commentService: CommentService) {
    this.getData();
  }

  comments: WritableSignal<CommentDto[]> = signal([]);
  commentsFiltered = computed(() =>
    this.comments().filter((comment: CommentDto) => {
      const text = this.filterForm.text().value();
      const selectedText = this.filterForm.select().value();

      const matchesText =
        !text ||
        comment.text.toLowerCase().includes(text.toLowerCase()) ||
        comment.user.name.toLowerCase().includes(text.toLowerCase()) ||
        comment.user.email.toLowerCase().includes(text.toLowerCase())||
        comment.product.name.toLowerCase().includes(text.toLowerCase()) ;

      const matchesSelectBox =
        selectedText === 'all' ||
        comment.status === selectedText ||
        (selectedText === 'hasDraftAnswer' && comment.hasDraftAnswer);

      return (matchesSelectBox && matchesText);
    }).sort((a, b) => {
      const sortedText = this.filterForm.sort().value();
      let aTime=new Date(a.createdAt).getTime();
      let bTime=new Date(b.createdAt).getTime();
      if (sortedText==='new') {
        return bTime-aTime
      }
      if (sortedText==='old') {
        return aTime-bTime
      }

      if (sortedText==='top') {
        return b.stars-a.stars
      }
      if (sortedText==='low') {
        return a.stars-b.stars
      }

      return 0
    })
  )
  loading = signal(true);
  error = signal(false);

  filterFields = signal({
    text: '',
    select: 'all',
    sort:'new'
  })
  filterForm = form(this.filterFields);

  getData() {
    this.commentService.getAllComments().subscribe({
      next: data => {
        this.comments.set(data);
        this.loading.set(false);
      },
      error: error => {
        this.error.set(true)
        this.loading.set(false);
      }
    })
  }
}
