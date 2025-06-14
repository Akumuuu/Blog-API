import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import config from '@/config';
import limiter from '@/lib/express_rate_limit';

import type { CorsOptions } from 'cors';

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITE_LIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false,
      );
      console.log(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression({ threshold: 1024 }));

app.use(helmet());

app.use(limiter);

(async () => {
  try {
    app.get('/', (req, res) => {
      res.json({
        message: 'Hello, World!',
      });
    });

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }

  if (config.NODE_ENV === 'production') {
    process.exit(1);
  }
})();
