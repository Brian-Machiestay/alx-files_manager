import { createClient } from 'redis';

// A redis instance class for managing storage

class RedisClient {

  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.client.connect;
  }

  isAlive() {
    let alive = false;
    this.client.on('connect', () => alive = true)
    return alive;
  }

  async get(key) {
    const val = await this.client.get(key)
    return val;
  }

  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
