import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [TitleCasePipe]
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName: String = '';

  constructor(private route: Router, private titlecasePipe: TitleCasePipe) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = this.titlecasePipe.transform((<any>sellerData).name);
          }
        } else {
          this.menuType = 'default';
        }
      }
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.sellerName = '';
    this.route.navigate(['/']);
  }
}
