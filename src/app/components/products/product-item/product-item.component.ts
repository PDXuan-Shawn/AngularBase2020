import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() clickEdit = new EventEmitter<Product>();
  @Output() clickDelete = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }


  onEdit() {
    this.clickEdit.emit(this.product);
  }

  onDelete() {
    this.clickDelete.emit(this.product);
  }


}
