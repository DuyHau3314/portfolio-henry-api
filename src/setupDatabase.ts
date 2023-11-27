import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@root/config';
import { redisConnection } from '@service/redis/redis.connection';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Successfully connected to database.');
        redisConnection.connect();

        // Enable Mongoose debug mode in development environment
        if (config.NODE_ENV === 'development') {
          mongoose.set('debug', (collectionName, method, query, doc) => {
            log.debug({
              collectionName,
              method,
              query,
              doc
            });
          });
        }
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
