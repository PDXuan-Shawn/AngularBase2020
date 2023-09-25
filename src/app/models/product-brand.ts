import { BaseEntity } from "./base-entity";
import { Product } from "./product";

export class ProductBrand extends BaseEntity {
    BrandID: number;
    BrandName!: string;
    ImageUrl!: string;
    Products!: Product[];
    IsIndentityAutoIncreate: boolean;
    constructor() {
        super();
        this.IsIndentityAutoIncreate = true;
    }
}
