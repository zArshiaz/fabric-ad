import {Component, input} from '@angular/core';
import {UserDto} from '../../dtos/user.dto';

@Component({
  selector: 'app-customer-details',
  imports: [],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css',
})
export class CustomerDetails {
user=input.required<UserDto>()
}
