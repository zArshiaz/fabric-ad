import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import {PageHeader} from '../../components/page-header/page-header';
import {UserService} from '../../services/user-service';
import {UserDto} from '../../dtos/user.dto';
import {Loading} from '../../components/loading/loading';
import {Alert} from '../../components/alert/alert';
import {UserItem} from '../../components/user-item/user-item';
import {FormsModule} from '@angular/forms';
import {Field, form} from '@angular/forms/signals';

@Component({
  selector: 'app-users-page',
  imports: [
    PageHeader,
    Loading,
    Alert,
    UserItem,
    FormsModule,
    Field
  ],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
})
export class UsersPage {
  users:WritableSignal<UserDto[]>=signal([])
  filteredUsers = computed(() =>
    this.users().filter(user => {
      const text = this.filterForm.text().value().trim().toLowerCase();
      const role = this.filterForm.role().value()

      const matchesText =
        !text ||
        user.name.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text);

      const matchesRole =
        role === 'all' || user.role.toLowerCase() === role.toLowerCase();

      return matchesText && matchesRole;
    }).sort((a,b)=>{
      const sort=this.filterForm.sort().value();
      let aTime = new Date(a.createdAt).getTime();
      let bTime = new Date(b.createdAt).getTime();

      if (sort==='new') {
        return bTime-aTime
      }
      if (sort==='old') {
        return aTime-bTime
      }
      return 0;
    })
  );

  error=signal(false)
  loading=signal(true)

  filterSignal=signal({
    role:'all',
    text:'',
    sort:'new'
  })
  filterForm=form(this.filterSignal)

  constructor(private userService:UserService) {
    this.userService.getAllUsers().subscribe({
      next:res=>{
        this.users.set(res);
        this.loading.set(false)
      },
      error:err=>{
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
