import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createRequestLogger } from "./logger";
import type { User } from "./types";
import {
  getCurrentUser,
  getLogger,
  LoggerContext,
  UserContext,
} from "./contexts";
import { doSomething } from "./stuff";
import { provide } from "@ryanflorence/async-provider";

const app = express();

app.use(async (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: "123",
    username: "dadamssg",
  };
  // const user = null as User | null

  const logger = createRequestLogger(req.url, user?.username);

  // Wrap the rest of the request handling in the context
  await provide(
    [
      [LoggerContext, logger],
      [UserContext, user],
    ],
    next,
  );
});

app.get("/hello", (req, res) => {
  console.log("/hello");
  res.send("Hello World!");
});

app.get("/profile", async (req, res) => {
  const user = getCurrentUser();
  const logger = getLogger();
  if (!user) {
    logger.info("unauthorized request");
    res.status(401).json({ error: "Not authenticated" });
  } else {
    await doSomething();
    logger.info("serving profile: ", { user });
    res.json({
      userId: user.id,
      username: user.username,
    });
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
