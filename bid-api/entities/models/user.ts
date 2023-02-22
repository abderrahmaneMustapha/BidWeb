import Bid from "./bid";

interface AutoBid {
    amount: number;
    amountInitial: number;
    percentage: number;
    items: string[];
}
class User {
    username: string;
    password: string;
    email: string;
    is_admin: boolean;
    created_at: number;
    updated_at: number;
    autoBid: AutoBid;
    notifications?: string[];
    bills?: Bid[];

    constructor(
        username: string,
        password: string,
        email: string,
        is_admin: boolean,
        created_at: number,
        updated_at: number,
        autoBid: AutoBid,
        notifications: string[],
        bills?: Bid[],
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.is_admin = is_admin;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.autoBid = autoBid;
        this.notifications = notifications;
        this.bills = bills;
    }

    
    static getAttributes() {
        return [
            "username",
            "password",
            "email",
            "is_admin",
            "created_at",
            "updated_at",
            "autoBid",
        ];
    }

    static getUsernameValidation() {
        return {
            bsonType: "string",
            description: "'name' must be a string and is required",
            minLength: 3,
            maxLength: 100,
        };
    }

    static getPasswordValidation() {
        return {
            bsonType: "string",
            description: "'password' must be a string and is required",
            minLength: 8,
            maxLength: 400,
        };
    }

    static getEmailValidation() {
        return {
            bsonType: "string",
            description: "'email' must be a string and is required",
            minLength: 7,
            maxLength: 100,
        };
    }

    static getIsAdminValidation() {
        return {
            bsonType: "bool",
            description: "'is_admin' must be a boolean and is required",
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

    static getAutoBidValidation() {
        return {
            bsonType: "object",
            description: "'autoBid' must be an object and is required",
            properties: {
                "amount": { bsonType: "int" },
                "amountInitial": { bsonType: "int" },
                "percentage": { bsonType: "int", maximum: 100, minimum: 0 },
                "items": { bsonType: "array"}
            }
        };
    }

    
    static getNotificationsValidation() {
        return {
            bsonType: "array",
            description: "'notifications' must be an array",
        };
    }

    static getBillsValidation() {
         return { 
            bsonType: "array",
            description: "'bills' must be an array",
         }
    }

}

export default User;
