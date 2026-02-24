import {Component, Input, OnInit, signal} from '@angular/core';
import {UserCommentsDto, UserDto} from '../../dtos/user.dto';
import {DatePipe} from '@angular/common';
import {TimeAgoPipe} from '../../pipes/time-ago-pipe';
import {UserService} from '../../services/user-service';
import {Loading} from '../loading/loading';
import {Alert} from '../alert/alert';
import {CommentItem} from '../comment-item/comment-item';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {NgIcon} from '@ng-icons/core';
import {CommentService} from '../../services/comment-service';
import Swal from 'sweetalert2';
import {toast} from '../../utilities/swal-toast-utility';
import {UserCommentItem} from '../user-comment-item/user-comment-item';

@Component({
  selector: 'app-user-comments',
  imports: [
    Loading,
    Alert,
    UserCommentItem
  ],
  templateUrl: './user-comments.html',
  styleUrl: './user-comments.css',
})
export class UserComments implements OnInit {
  constructor(private userService: UserService,private commentService: CommentService) {
  }
  ngOnInit() {
    this.getComments()
  }
@Input()
  userInfo!: UserDto;
  comments:UserCommentsDto[]=[];
  loading=signal(true)


  getComments(){
    if(!this.userInfo) return;
    this.userService.getUserCommentsById(this.userInfo._id)
      .subscribe({
        next:res=>{
          this.loading.set(false);
          this.comments=res
        },
        error:err=>{
          console.log(err)
          this.loading.set(false);
        }
      })
  }


}
