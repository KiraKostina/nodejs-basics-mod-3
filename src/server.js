// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import studentsRouter from './routers/students.js'; // Імпортуємо роутер
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Читаємо змінну оточення PORT
const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Маршрут для обробки GET-запитів на '/'
  app.get('/', (req, res) => {
    // тіло функції-обробника
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(studentsRouter); // Додаємо роутер до app як middleware

  app.use('*', notFoundHandler);
  // В notFoundHandler.js
  // app.app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  app.use(errorHandler);
  // Middleware для обробких помилок (приймає 4 аргументи) в errorHandler.js
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
