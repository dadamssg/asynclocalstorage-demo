import { getCurrentUser, getLogger } from "./contexts";

export async function doSomething() {
  const user = getCurrentUser();
  const logger = getLogger();

  logger.info(`${user?.username} is doing something!`);

  return new Promise((resolve) => setTimeout(resolve, 1000));
}
