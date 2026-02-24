import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIcon} from '@ng-icons/core';
import {NgIf} from '@angular/common';
import {InputErrors} from '../../components/input-errors/input-errors';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    NgIcon,
    InputErrors
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService,private router: Router) {
  }
  showPass:WritableSignal<boolean>=signal(false)

  loginForm: FormGroup=new FormGroup({
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required,Validators.minLength(8)]),
  })
  changeShowPass():void {
    this.showPass.update(pre=>!pre)
  }

  ngOnInit() {
    console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) this.router.navigate(['/']);
  }

  onSubmit(){
    if (this.loginForm.valid) {
      console.log('Form Value:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: data => {
          alert(data.user.name+' خوش آمدی ');
          this.router.navigate(['/']);
        },
          error: (err) => {
            alert(err.message);
          }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
