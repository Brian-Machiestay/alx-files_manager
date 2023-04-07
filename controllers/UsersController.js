import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    if (!req.body.email) {
      res.status(400).send(
        { error: 'Missing email' },
      );
    } else if (!req.body.password) res.status(400).send({ error: 'Missing password' });
    else if (await dbClient.findUser({ email: req.body.email }) > 0) {
      res.status(400).send({ error: 'Already exist' });
    } else {
      const hash = crypto.createHash('sha1');
      const ob = {
        email: req.body.email,
        password: hash.update(req.body.password).digest('hex'),
      };
      const { ops } = await dbClient.insertUser(ob);
      res.status(201).send({
        id: ops[0]._id,
        email: req.body.email,
      });
    }
  }
}

export default UsersController;
