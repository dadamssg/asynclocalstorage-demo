import { createContext, pull } from "@ryanflorence/async-provider";
import type { Logger } from "winston";
import type { User } from "./types";

export const UserContext = createContext<User>();
export const LoggerContext = createContext<Logger>();

export function getCurrentUser() {
  try {
    return pull(UserContext);
  } catch (e) {
    return null;
  }
}

export function getLogger() {
  return pull(LoggerContext);
}
