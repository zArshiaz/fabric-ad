import {Component, Input} from '@angular/core';
import {UserDto} from '../../dtos/user.dto';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-item',
  imports: [
    RouterLink
  ],
  templateUrl: './user-item.html',
  styleUrl: './user-item.css',
})
export class UserItem {
@Input() user!:UserDto
}
