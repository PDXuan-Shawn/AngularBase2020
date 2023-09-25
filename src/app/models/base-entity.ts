export class BaseEntity {
    CreatedDate: Date ;
    CreatedBy!: string;
    ModifiedDate: Date;
    ModifiedBy!: string;
    EditMode: number = 1;
    constructor() {
        this.CreatedDate = this.ModifiedDate = new Date();
    }
}