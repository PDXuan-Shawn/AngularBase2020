import { BaseEntity } from "./base-entity";

export class StorageFile extends BaseEntity {
    FileID: string;
    ProductName!: string;
    FileName!: string;
    FilePath!: string;
    StorageType: string;
    FullPath!: string;
    constructor() {
        super();
    }
}
