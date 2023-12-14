# Streaks
Simple implementation of streaks feature.

## How to run

```bash
# run container with database
docker compose up -d

# install dependencies
npm i

# initialize database
npm run init-db

# run tests
npm run test

# run server
npm run serv

# run frontend
npm run start

# go to http://localhost:3000
open 'http://localhost:3000'
```

## Design Decisions and Comments

1. I have implemented the server and client together in one project for simplicity. In real-world cases, those would be separate projects.

1. Brief description of directory structure:
   * `src/` - frontend sources
   * `server/` - backend sources
   * `server/streaks.test.js` - tests to check streaks logic
   * `schema.sql` - database schema
   
1. Since we have decided to use the user's local time zone during Streak click, I have decided to send "current" time with a request. I would not do this in a real-life project since that opens a gate for users to get as many streaks in a row as they want. In a real-life project, I would use the timezone that was used for account creation, treat all of the timestamps in that time zone and always calculate a timestamp of Streak on the backend. 

1. Since we don't have a notion of a user, I have created just one table for storing streaks. Each row has:
    * `uuid` - id of a streak
    * `timestamp` - moment of clicking on a Streak button
    * `score` - the overall score, including this Streak
    * `step` - shows the index of this Streak in the sequence of consecutive streaks. If users miss a day, the step resets to 0

1. I have used the PostgreSQL database as main storage. There are no particular reasons, but it fits this use case perfectly and is a database I am most familiar with.
