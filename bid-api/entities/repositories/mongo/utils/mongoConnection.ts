import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB } from "../../../../app/config";

class MongoConnection {
  private static instance: MongoConnection;
  private url = `mongodb+srv://${MONGODB.pass}@${MONGODB.host}/?retryWrites=true&w=majority`
  private db = MONGODB.db
  private constructor() { }

  public static async getInstance() {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    
    return MongoConnection.instance.connect();
  }

  public async connect() {
    const mongoClient = new MongoClient(this.url, {serverApi: ServerApiVersion.v1});
    await mongoClient.connect();
    const db = await mongoClient.db(this.db);
    return db
  }
}

export default MongoConnection
