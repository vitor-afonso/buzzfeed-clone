import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { QuizData } from './interfaces';

import * as dotenv from 'dotenv'; //Allow us to use secrets from .env
dotenv.config();

const PORT = 8000;
const app = express();

app.get('/quiz-item', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const response: AxiosResponse = await axios.get(process.env.URL, {
      headers: {
        'X-Cassandra-Token': process.env.TOKEN,
        accept: 'application/json',
      },
    });

    if (response.status === 200) {
      const quizItem: QuizData = response.data.data['b2d54bb2-8c00-444c-b9a2-7017da0da604'];
      res.setHeader('Access-Control-Allow-Origin', 'https://buzzfeed-clone.netlify.app' || 'http://localhost:3000');
      res.send(quizItem);
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT || 'https://buzzfeed-clone.onrender.com', () => {
  console.log('Server listening on port: ' + PORT);
});
