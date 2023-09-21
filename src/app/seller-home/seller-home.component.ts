import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: Product[] | undefined;
  productMessage: undefined | string;
  deteleIcon = faTrash;
  editIcon = faEdit;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getListProduct();
  }

  deleteProduct(id: number) {
    const response = confirm("Are you sure you want to delete this item?");

    if (response) {
      this.product.deleteProduct(id).subscribe((result) => {
        if (result) {
          this.productMessage = 'Product is deleted';
          this.getListProduct();
        }
      })
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000)
    } else { }
  }
  getListProduct() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    })
  }
}
