import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPasswordDto } from '../models/dtos/forgotPasswordDto';
import { RegisterDto } from '../models/dtos/registerDto';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TermsAndConditionModel } from '../models/termsAndConditionModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string;

  constructor(private httpClient: HttpClient) {}

  register(registerDto: RegisterDto) {
    let api = 'https://localhost:7042/api/Auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      api,
      registerDto
    );
  }

  login(loginModel: LoginModel) {
    let api = 'https://localhost:7042/api/Auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      api,
      loginModel
    );
  }

  getTermsAndConditions() {
    let api = 'https://localhost:7042/api/TermsAndConditions/Get';
    return this.httpClient.get<SingleResponseModel<TermsAndConditionModel>>(
      api
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  sendConfirmEmail(email: string) {
    let api = 'https://localhost:7042/api/Auth/SendConfirmEmail?email=' + email;
    return this.httpClient.get<ResponseModel>(api);
  }

  confirmUser(value: string) {
    let api = 'https://localhost:7042/api/Auth/ConfirmUser?value=' + value;
    return this.httpClient.get<ResponseModel>(api);
  }

  sendForgotPassword(email: string) {
    let api = 'https://localhost:7042/api/Auth/ForgotPassword?email=' + email;
    return this.httpClient.get<ResponseModel>(api);
  }

  confirmForgotPasswordValue(value:string){
    let api = 'https://localhost:7042/api/Auth/ForgotPasswordLinkCheck?value=' + value;
    return this.httpClient.get(api);
  }

  changePasswordToForgotPassword(forgotPasswordDto:ForgotPasswordDto){
    let api = 'https://localhost:7042/api/Auth/ChangePasswordToForgetPassword';
    return this.httpClient.post<ResponseModel>(api,forgotPasswordDto);
  }
}
