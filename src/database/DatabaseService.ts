import mongoose from "mongoose";

class DatabaseService {
  private static instance: DatabaseService;
  private connection: null | any;
  
  constructor() {
    if (DatabaseService.instance === null) {
      return DatabaseService.instance;
    }

    this.connection = null;
  }

  async connect() {
    const pass = process.env.DATABASE_PASSWORD;
    const connection = await mongoose.connect(`mongodb+srv://render:${pass}@memonice.2zvaxvz.mongodb.net/?retryWrites=true&w=majority`);
    this.connection = connection;
    return connection;
  }
}

test();
async function test() {
  console.log("-- start");
  const db = new DatabaseService();
  db.connect()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}
