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
  transports: [new transports.Console()],
});

export default logger;
