import User from "./user";

class Item {
    id: string;
    name: string;
    description: string;
    image: string;
    close_at: Date;
    created_by: User;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: string,
        name: string,
        description: string,
        image: string,
        close_at: Date,
        created_by: User,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.close_at = close_at;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static getAttributes() {
        return [
            "id",
            "name",
            "description",
            "image",
            "close_at",
            "created_by",
            "created_at",
            "updated_at",
        ];
    }

    static getNameValidation() {
        return {
            bsonType: "string",
            description: "'name' must be a string and is required",
            minLength: 3,
            maxLength: 40,
        };
    }

    static getDescriptionValidation() {
        return {
            bsonType: "string",
            description: "'description' must be a string and is required",
            minLength: 10,
            maxLength: 2000,
        };
    }

    static getImageValidation() {
        return {
            bsonType: "string",
            description: "'image' must be a string and is required",
            minLength: 10,
            maxLength: 1500,
        };
    }

    static getCloseAtValidation() {
        return {
            bsonType: "date",
            description: "'closed_at' must be a date and is required",
        };
    }

    static getCreatedByValidation() {
        return {
            bsonType: "object",
            description: "'closed_at' must be a date and is required",
        };
    }

    static getCreatedAtValidation() {
        return {
            bsonType: "date",
            description: "'created_at' must be a date and is required",
        };
    }

    static getUpdatedAtValidation() {
        return {
            bsonType: "date",
            description: "'updated_at' must be a date and is required",
        };
    }
}

export default Item;
