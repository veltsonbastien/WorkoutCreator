import Redis from "ioredis";

declare global {
  var redis: Redis | undefined;
}

const redis =
  global.redis ||
  new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

if (process.env.NODE_ENV !== "production") global.redis = redis;

export default redis;
