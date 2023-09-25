import { BaseEntity } from "./base-entity";

export class User extends BaseEntity {
    Email!: string;
    DisplayName!: string;
    Token!: string;
    constructor() {
        super();
    }
}
