import express from 'express';
import AppController from '../controllers/AppController';

console.log(AppController);
const app = express();

app.get('/status', (req, res) => {
  AppController.getStatus().then((val) => {
    res.send(JSON.stringify(val));
  });
});

app.get('/stats', (req, res) => {
  AppController.getStats().then((val) => {
    res.send(JSON.stringify(val));
  });
});

export default app;
