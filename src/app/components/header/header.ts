import {Component, Input, Signal, signal, WritableSignal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AuthService} from '../../services/auth-service';
import {UserInfo} from '../../dtos/auth.dto';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [
    NgIcon
  ]
})
export class Header {
  @Input() showSidebar!: WritableSignal<boolean>;
  userInfo: Signal<UserInfo | null>;

  constructor(private authService: AuthService) {
    this.userInfo = authService.userInfo;
    console.log(this.userInfo())
  }

  toggleSidebar() {
    this.showSidebar.update(v => !v);
  }
}

