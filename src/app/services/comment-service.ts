import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnswerDto, CommentDto, EditCommentForm} from '../dtos/comment.dto';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  likeCommentById(id: string): Observable<{likesCount:number,liked:boolean}> {
    return this.http.post<{likesCount:number,liked:boolean}>('/comment/' + id + '/like',{},{withCredentials: true});
  }
  answerCommentById(id: string,text:string): Observable<any> {
    return this.http.post<any>('/comment/' + id + '/answer',{text},{withCredentials: true});
  }
  deleteCommentById(id: string): Observable<CommentDto> {
    return this.http.delete<CommentDto>('/comment/' + id ,{withCredentials: true});
  }
  getAllComments(): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>('/comment/all',{withCredentials: true});
  }
  addCommentById(id:string,data:{text:string,stars:number}):Observable<any> {
    return this.http.post<CommentDto>('/comment/'+id,data,{withCredentials:true})
  }
  getAllAnswersComment(id:string): Observable<AnswerDto[]> {
    return this.http.get<AnswerDto[]>('/comment/answers/'+id,{withCredentials: true});
  }
  editCommentById(id:string,data:EditCommentForm): Observable<CommentDto> {
    return this.http.post<CommentDto>('/comment/edit/'+id,data,{withCredentials: true});
  }
  activeCommentById(id:string): Observable<CommentDto> {
    return this.http.post<CommentDto>('/comment/active/'+id,{},{withCredentials: true});
  }
  activeAnswerById(id:string): Observable<any> {
    return this.http.post<any>('/comment/answer/active/'+id,{},{withCredentials: true});
  }
  deleteAnswerById(id:string): Observable<any> {
    return this.http.delete<any>('/comment/answer/delete/'+id,{withCredentials: true});
  }
}
