import { logger } from "./logger";

class PersonRepository {
  getPeople(currentUserId: string) {
    const query = "SELECT * FROM people";
    logger.log(`User ${currentUserId} is executing query`, { query });
    return [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: 2,
        firstName: "Joseph",
        lastName: "Doe",
      },
    ];
  }
}
