import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService) { }

  showLogin = true;
  authError = '';

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signup(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  login(data: SignUp): void {
    // console.log(data)
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct"
      }
    })
  }

  openLogin() {
    this.showLogin = !this.showLogin
  }
}
