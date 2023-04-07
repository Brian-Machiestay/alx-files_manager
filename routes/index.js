import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
  AppController.getStatus().then((val) => {
    res.send(val);
  });
});

app.get('/stats', (req, res) => {
  AppController.getStats().then((val) => {
    res.send(val);
  });
});

app.post('/users', (req, res) => {
  UsersController.postNew(req, res);
});

export default app;
