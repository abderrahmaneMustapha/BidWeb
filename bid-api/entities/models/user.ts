class User {
  id: string;
  username: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(id: string, username: string, password: string, is_admin: boolean, created_at: Date, updated_at: Date) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.is_admin = is_admin;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default User