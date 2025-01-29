import winston from "winston";

export const createRequestLogger = (url: string, username = "anonymous") => {
  const route = urlToFilename(url);
  const filename = `logs/${new Date().getTime()}.${username}.${route}.log`;

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename })],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }
  return logger;
};

function urlToFilename(reqUrl: string) {
  // Normalize URL to remove query params and special characters
  let parsedUrl = reqUrl.split("?")[0]?.replace(/\/+$/, ""); // Trim trailing slashes
  if (!parsedUrl || parsedUrl === "/") {
    parsedUrl = "index"; // Handle root case
  }

  // Replace slashes with underscores to create valid filename paths
  return parsedUrl.replace(/[^a-zA-Z0-9]/g, "_");
}

export const logger = {
  log: (...args: any[]) => {},
};
