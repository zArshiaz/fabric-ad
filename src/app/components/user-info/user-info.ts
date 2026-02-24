import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
  WritableSignal,
  EventEmitter, Output
} from '@angular/core';
import {DatePipe} from "@angular/common";
import {TimeAgoPipe} from "../../pipes/time-ago-pipe";
import {UserDto, UserForm} from '../../dtos/user.dto';
import {JalaliDatePipe} from '../../pipes/jalali-date-pipe';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputErrors} from '../input-errors/input-errors';
import {toast} from '../../utilities/swal-toast-utility';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-user-info',
  imports: [
    TimeAgoPipe,
    JalaliDatePipe,
    ReactiveFormsModule,
    InputErrors
  ],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo implements OnInit, OnChanges {
  constructor(private userService: UserService) {
  }

  @Input()
  userInfo!: UserDto;
  @Output()
  userInfoChange: EventEmitter<null> = new EventEmitter();


  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/09\d{9}/m)]),
    role: new FormControl('', [Validators.required]),
  });

  showFormEdit = signal(false);

  ngOnInit() {
    this.formInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo']) {
      this.formInit();
    }
  }

  changeShowFormEdit() {
    this.showFormEdit.update(p => !p);
    this.formInit()
  }

  formInit() {
    if (!this.userInfo) return;

    this.userForm.patchValue({
      name: this.userInfo.name,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      role: this.userInfo.role,
    });

    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }

  submitHandler() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      toast.fire({
        icon: "warning",
        text: 'مقادیر فرم نامعتبر'
      });
      return;
    }

    if (this.userForm.pristine) {
      toast.fire({
        icon: "info",
        text: "تغییر یکی از مقادیر الزامی می‌باشد."
      });
      return;
    }

    const data = this.userForm.value as UserForm;

    this.userService.editUserById(this.userInfo._id, data).subscribe({
      next: (res) => {
        toast.fire({
          icon: "success",
          text: 'اطلاعات تغییر یافت'
        });
        this.userInfoChange.emit();
        this.userInfo = res;
        this.formInit();
        this.showFormEdit.set(false);
      },
      error: () => {
        toast.fire({
          icon: "error",
          text: 'خطا در تغییر اطلاعات'
        });
      }
    });
  }
}
