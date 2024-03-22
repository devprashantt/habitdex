import winston, { level } from "winston";

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    label({
      label: "backend",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
      utc: true,
      timezone: "Europe/London",
    }),
    colorize({
      all: true,
      colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        debug: "blue",
      },
    }),
    printf(({ level, message, label, timestamp, meta }) => {
      return `${timestamp} [${label}] ${level}: ${message} ${
        meta ? JSON.stringify(meta) : ""
      }`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "./../../../logs/error.log",
      level: "error",
    }),
    new transports.File({ filename: "./../../../logs/combined.log" }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "./../../../exceptions.log" }),
  ],
  exitOnError: false,
  silent: false,
  handleExceptions: true,
  rejectionHandler: (err, req, res, next) => {
    logger.log({
      level: "error",
      message: "unhandled exception",
      meta: {
        label: "app.js",
        error: err,
        req: req,
        res: res,
        next: next,
        timestamp: new Date().toISOString(),
        stack: err.stack,
        message: err.message,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        ip: req.ip,
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
      },
    });
  },
  defaultMeta: {
    label: "backend",
    id: 1,
  },
});

export default logger;
