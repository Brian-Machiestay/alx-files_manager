import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus() {
    const status = new Promise((resolve, reject) => {
      let i = 0;
      const repeatFct = async () => {
        await setTimeout(() => {
          i += 1;
          if (i >= 10) {
            reject();
          } else if (!(dbClient.isAlive() && redisClient.isAlive())) {
            repeatFct();
          } else {
            resolve();
          }
        }, 1000);
      };
      repeatFct();
    });
    await status;
    return { redis: redisClient.isAlive(), db: dbClient.isAlive() };
  }

  static async getStats() {
    return {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
  }
}

export default AppController;
