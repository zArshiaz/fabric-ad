import {Component, Signal, signal, WritableSignal} from '@angular/core';
import {Alert} from '../../components/alert/alert';
import {Loading} from '../../components/loading/loading';
import {UserDto} from '../../dtos/user.dto';
import {UserService} from '../../services/user-service';
import {ActivatedRoute} from '@angular/router';
import {UserInfo} from '../../components/user-info/user-info';
import {UserComments} from '../../components/user-comments/user-comments';

@Component({
  selector: 'app-details-user-page',
  imports: [
    Alert,
    Loading,
    UserInfo,
    UserComments
  ],
  templateUrl: './details-user-page.html',
  styleUrl: './details-user-page.css',
})
export class DetailsUserPage {
  constructor(private userService: UserService,private route:ActivatedRoute) {
    this.getData();
  }
error=signal(false)
  loading=signal(true)
  userInfo:WritableSignal<UserDto|null>=signal(null)


  getData(){
    const id= this.route.snapshot.paramMap.get('id')
    if (id){
      this.userService.getUserInfoById(id).subscribe({
        next:(user:UserDto)=> {
          this.userInfo.set(user);
          this.loading.set(false);
        },
        error:error=>{
          this.error.set(true);
          this.loading.set(false);
        }
      })
    }
  }

  protected readonly UserInfo = UserInfo;
}
