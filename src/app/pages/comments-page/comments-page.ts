import { Component } from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {CommentsList} from '../../components/comments-list/comments-list';

@Component({
  selector: 'app-comments-page',
  imports: [
    PageHeader,
    CommentsList
  ],
  templateUrl: './comments-page.html',
  styleUrl: './comments-page.css',
})
export class CommentsPage {

}
