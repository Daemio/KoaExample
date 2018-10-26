const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.printf((info) => info.message),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'notifications.log' })
    ]
  });

  module.exports = logger;