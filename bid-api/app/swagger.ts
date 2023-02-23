import swagger from "swagger-autogen";
import { createBid } from "../use-cases/bid";

const doc = {
    info: {
        title: "Bid Web API",
        description: "Description",
    },
    tryItOutEnabled: false,
    host: "localhost:3000",
    schemes: ["http"],
    securityDefinitions: {
        BasicAuth: {
            type: "basic",
        },
    },
    definitions: {
        bidListSuccess: {
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/Bids",
            },
        },
        getUserBidListSuccess: { 
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/StateBids"
            }
        },
        getBidSuccess: {
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/Bid",
            },
        },
        itemListSuccess: {
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/Items",
            },
        },
        getItemSuccess: {
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/ItemMiliseconds",
            },
        },
        userRegisteredSuccess: {
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/UserMiliseconds",
            },
        },
        notificationsSuccess: {
            success: true,
            code: 200,
            data: {
                $ref: "#/components/schemas/Notifications",
            },
        },
        unAuthorized: {
            success: false,
            code: 401,
            error: {
                description: "error message",
            },
        },
        badRequest: {
            success: false,
            code: 400,
            error: {
                description: "error message",
            },
        },
        ResponseSuccess: {
            success: true,
            code: 200,
            data: true,
        },
    },
    components: {
        schemas: {
            Bid: {
                type: "object",
                properties: {
                    amount: {
                        type: "integer",
                        format: "int32",
                        description: "The amount of the bid to be created.",
                    },
                    user: {
                        $ref: "#/components/schemas/User",
                    },
                    item: {
                        $ref: "#/components/schemas/Item",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        description: "The creation date and time of the bid",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description:
                            "The date and time when the bid was updated",
                    },
                },
            },
            User: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        description:
                            "Username, used a unique identifier for each user.",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        description: "User password",
                    },
                    email: {
                        type: "string",
                        format: "email",
                        description: "User password",
                    },
                    is_admin: {
                        type: "boolean",
                        description:
                            "Specify whether the user is an administrator or not.",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        description: "The creation date and time of the user",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description:
                            "The date and time when the user was updated",
                    },
                    autoBid: {
                        $ref: "#/components/schemas/AutoBid",
                    },
                    notifications: {
                        $ref: "#/components/schemas/Notifications",
                    },
                    bills: {
                        $ref: "#/components/schemas/Bids",
                    },
                },
            },
            UserMiliseconds: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        description:
                            "Username, used a unique identifier for each user.",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        description: "User password",
                    },
                    email: {
                        type: "string",
                        format: "email",
                        description: "User password",
                    },
                    is_admin: {
                        type: "boolean",
                        description:
                            "Specify whether the user is an administrator or not.",
                    },
                    created_at: {
                        type: "number",
                        description: "The creation date and time of the user in milliseconds.",
                    },
                    updated_at: {
                        type: "number",
                        description:
                            "The date and time when the user was updated in milliseconds.",
                    },
                    autoBid: {
                        $ref: "#/components/schemas/AutoBid",
                    },
                    notifications: {
                        $ref: "#/components/schemas/Notifications",
                    },
                    bills: {
                        $ref: "#/components/schemas/Bids",
                    },
                },
            },
            Item: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description:
                            "Item name, used a unique identifier for each item.",
                    },
                    description: {
                        type: "string",
                        description: "Item description and extra details",
                    },
                    image: {
                        type: "string",
                        description: "An Image url of the item",
                    },
                    close_at: {
                        type: "string",
                        format: "date-time",
                        description:
                            "After this date and time users will not be able to bid on thie item anymore",
                    },
                    created_by: {
                        $ref: "#/components/schemas/User",
                    },
                    highest_bid: {
                        type: "number",
                        description: "The highest bid on the item",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        description: "The creation date and time of the Item",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description:
                            "The date and time when the Item was updated",
                    },
                },
            },
            ItemMiliseconds: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description:
                            "Item name, used a unique identifier for each item.",
                    },
                    description: {
                        type: "string",
                        description: "Item description and extra details",
                    },
                    image: {
                        type: "string",
                        description: "An Image url of the item",
                    },
                    close_at: {
                        type: "number",
                        description:
                            "After this date and time users will not be able to bid on thie item anymore (date is in milliseconds)",
                    },
                    created_by: {
                        $ref: "#/components/schemas/UserMiliseconds",
                    },
                    highest_bid: {
                        type: "number",
                        description: "The highest bid on the item",
                    },
                    created_at: {
                        type: "number",
                        description: "The creation date and time of the Item in milliseconds",
                    },
                    updated_at: {
                        type: "number",
                        description:
                            "The date and time when the Item was updated in milliseconds",
                    },
                },
            },
            Items: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/ItemMiliseconds",
                },
            },
            ItemCreate: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description:
                            "Item name, used a unique identifier for each item.",
                    },
                    description: {
                        type: "string",
                        description: "Item description and extra details",
                    },
                    image: {
                        type: "string",
                        description: "An Image url of the item",
                    },
                    close_at: {
                        type: "number",
                        description:
                            "After this date and time users will not be able to bid on thie item anymore (date is in milliseconds)",
                    },
                },
            },
            ItemUpdate: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description:
                            "Item name, used a unique identifier for each item.",
                    },
                    description: {
                        type: "string",
                        description: "Item description and extra details",
                    },
                    image: {
                        type: "string",
                        description: "An Image url of the item",
                    },
                    close_at: {
                        type: "string",
                        format: "date-time",
                        description:
                            "After this date and time users will not be able to bid on thie item anymore (date is in milliseconds)",
                    },
                },
            },
            AutoBid: {
                type: "object",
                properties: {
                    amount: {
                        type: "number",
                        description: "The amount left for auto bid",
                    },
                    amountInitial: {
                        type: "number",
                        description:
                            "The initial amount that was set by the user",
                    },
                    percentage: {
                        type: "number",
                        description:
                            "When the mount get to this percentage notify the user",
                    },
                    items: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                        description:
                            "A list of item names that the user has actived auto bid on",
                    },
                },
            },
            Notifications: {
                type: "array",
                items: {
                    type: "string",
                },
                description:
                    "Contains a list of notifications for the user in text format",
            },
            Bids: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/Bid",
                },
            },
            StateBids: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        amount: {
                            type: "integer",
                            format: "int32",
                            description: "The amount of the bid to be created.",
                        },
                        maxAmount: {
                            type: "integer",
                            format: "int32",
                            description: "The maximum amount made by all the users in this item",
                        },
                        state: {
                            type: "string",
                            enum: ["Lost", "Won", "In Progress"],
                        },
                        item: {
                            $ref: "#/components/schemas/ItemMiliseconds",
                        },
                        created_at: {
                            type: "number",
                            description:
                                "The creation date and time of the bid in milliseconds",
                        },
                        updated_at: {
                            type: "number",
                            description:
                                "The date and time when the bid was updated milliseconds",
                        },
                    },
                },
            },
        },
    },
};

const outputFile = "docs/swagger.json";

const endpointsFiles = [
    "dist/routes/bid.routes.js",
    "dist/routes/image.routes.js",
    "dist/routes/item.routes.js",
    "dist/routes/user.routes.js",
];

swagger(outputFile, endpointsFiles, doc);
