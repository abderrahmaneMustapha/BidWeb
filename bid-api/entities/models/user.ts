class User {
  username: string;
  password: string;
  is_admin: boolean;
  created_at: number;
  updated_at: number;

  constructor(username: string, password: string, is_admin: boolean, created_at: number, updated_at: number) {
    this.username = username;
    this.password = password;
    this.is_admin = is_admin;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default User