import winston from 'winston';

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
      (entry) => `${entry.timestamp} ${entry.level}: ${entry.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;
