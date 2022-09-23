import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginButtonActive: boolean = true;
  eMail: string = '';
  confirmEmail: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //Sayfa yüklendiği an çalışır.
    this.createLoginForm();
    // console.log(this.isLoginButtonActive) Değeri Bu şekilde Kontrol edilebiliyor.
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoginButtonActive = false;
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (res) => {
          //console.log(res);
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.router.navigate(['']);
          }
          this.toastr.success(res.message, 'BAŞARILI');
          localStorage.setItem('token', res.data.token);
        },
        (err) => {
          this.isLoginButtonActive = true;
          this.toastr.error(err.error, 'HATA!');
        }
      );
    } else {
      this.toastr.error('Eksik Bilgileri Doldurunuz!', 'HATA!');
    }
  }

  changeClassEmailInput(text: string) {
    if (text.includes('@')) {
      return 'input-group input-group-outline is-valid my-3';
    } else {
      return 'input-group input-group-outline is-invalid my-3';
    }
  }

  changeClassPasswordInput(text: string) {
    if (text != '') {
      return 'input-group input-group-outline is-valid my-3';
    } else {
      return 'input-group input-group-outline is-invalid my-3';
    }
  }

  sendConfirmMail() {
    if (this.confirmEmail != '') {
      this.authService.sendConfirmEmail(this.confirmEmail).subscribe(
        (res) => {
          this.toastr.success(res.message);
        },
        (err) => {
          this.toastr.error(err.error);
        }
      );
    }
  }


  sendForgotPasswordMail() {
    if (this.confirmEmail != '') {
      this.toastr.warning("Şifre Sıfırlama Mailiniz Gönderiliyor...");
      this.authService.sendForgotPassword(this.confirmEmail).subscribe(
        (res) => {
          this.toastr.success(res.message);
        },
        (err) => {
          this.toastr.error(err.error);
        }
      );
    }
  }

}
