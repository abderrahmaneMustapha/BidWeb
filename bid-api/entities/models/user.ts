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
}

export default User;
