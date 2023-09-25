import { BaseEntity } from "./base-entity";
import { ProductBrand } from "./product-brand";

export class Product extends BaseEntity {
    ProductID: string;
    ProductName!: string;
    ProductLink!: string;
    Price!: string;
    ImageUrl: string;
    DisCount: number;
    ShortLink: string;
    BrandID: number;
    Description: string;
    ProductBrand: ProductBrand;
    constructor() {
        super();
        this.BrandID = 0;
    }
}
