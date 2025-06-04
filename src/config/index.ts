import doteenv from 'dotenv';

doteenv.config();

const config = {
  PORT: process.env.POERT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITE_LIST_ORIGINS: ['https://docs.blog-api.akumuuu.com'],
};

export default config;
