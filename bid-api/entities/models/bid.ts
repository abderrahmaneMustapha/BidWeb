import Item from "./item";
import User from "./user";

class Bid {
    amount: number;
    user: User;
    item: Item;
    created_at: number;
    updated_at: number;

    constructor(
        amount: number,
        user: User,
        item: Item,
        created_at: number,
        updated_at: number
    ) {
        this.amount = amount;
        this.user = user;
        this.item = item;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static getAttributes() {
        return ["amount", "user", "item", "created_at", "updated_at"];
    }

    static getAmountValidation() {
        return {
            bsonType: "int",
            description: "'amount' must be a number and it is required",
        };
    }

    static getUserValidation() {
        return {
            bsonType: "object",
            description: "'user' is required",
        };
    }

    static getItemValidation() {
        return {
            bsonType: "object",
            description: "'item' is required",
        };
    }

    static getCreatedAtValidation() {
        return {
            bsonType: "double",
            description: "'created_at' must be a date and is required",
        };
    }

    static getUpdatedAtValidation() {
        return {
            bsonType: "double",
            description: "'updated_at' must be a date and is required",
        };
    }
}
export default Bid;
