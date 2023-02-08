interface AutoBid {
  amount: number;
  percentage: number;
  items: string[]
}
class User {
  username: string;
  password: string;
  is_admin: boolean;
  created_at: number;
  updated_at: number;
  autoBid: AutoBid
  constructor(username: string, password: string, is_admin: boolean, created_at: number, updated_at: number, autoBid: AutoBid) {
    this.username = username;
    this.password = password;
    this.is_admin = is_admin;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.autoBid = autoBid;
  }
}

export default User