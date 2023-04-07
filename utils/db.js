import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = 'localhost';
    this.port = '27017';
    this.db = 'files_manager';
    this.alive = false;
    if (process.env.DB_HOST) this.host = process.env.DB_HOST;
    if (process.env.DB_PORT) this.port = process.env.DB_PORT;
    if (process.env.DB_DATABASE) this.db = process.env.DB_DATABASE;
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}/${this.db}`);
    this.client.connect((err, db) => {
      if (err) console.log(err);
      this.alive = true
      this.db = db;
    })
  }

  isAlive() {
    return this.alive;
  }

  async nbUsers() {
    try {
      const count = await this.db.collection('users').find({});
      return count;
    } catch(e) {
      throw e;
    }
  }

  async nbFiles() {
    try {
      const fileCount = await this.db.collection('files').find({});
    } catch(e) {
      throw e;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
