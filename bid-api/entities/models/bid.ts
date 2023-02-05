import Item from "./item";
import User from "./user";

class Bid {
  id: string;
  amount: number;
  user: User;
  item: Item;
  date: Date;
  created_at: Date;
  updated_at: Date;

  constructor(id: string, amount: number, user: User, item: Item, date: Date, created_at: Date, updated_at: Date) {
    this.id = id;
    this.amount = amount;
    this.user = user;
    this.item = item;
    this.date = date;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
export default Bid