import Item from "./item";
import User from "./user";

class Bid {
  amount: number;
  user: User;
  item: Item;
  date: number;
  created_at: number;
  updated_at: number;

  constructor(amount: number, user: User, item: Item, date: number, created_at: number, updated_at: number) {
    this.amount = amount;
    this.user = user;
    this.item = item;
    this.date = date;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
export default Bid