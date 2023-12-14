import express from 'express';
import postgres from 'postgres';
import { getLastStreak, saveStreak, produceNewStreak } from './streaks.js'

const sql = postgres({
  hostname: 'localhost',
  port: 5433,
  database: 'streaks',
  user: 'postgres',
  password: 'password',
});

const app = express();

app.use(express.json())

const port = process.env.PORT || 5001;

app.post('/api/streaks', async (req, res) => {

  const currentTimestamp = new Date(req.body.currentTimestamp);

  const lastStreak = await getLastStreak(sql);

  const newStreak = produceNewStreak(lastStreak, currentTimestamp);
  if (!newStreak) {
    res.send({});
    return
  }

  await saveStreak(sql, newStreak);

  const tomorrow = new Date();
  tomorrow.setDate(currentTimestamp.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  res.send({ nextStreakDate: tomorrow, score: newStreak.score });
})

app.get('/api/streaks/summary', async (req, res) => {

  let score;
  let lastStreakDate;

  const lastStreak = await getLastStreak(sql);
  if (lastStreak) {
    score = lastStreak.score;
    lastStreakDate = lastStreak.timestamp;
  } else {
    score = 0;
    lastStreakDate = new Date();
    lastStreakDate.setDate(lastStreakDate.getDate() - 1);
  }

  const nextStreakDate = new Date();
  nextStreakDate.setDate(lastStreakDate.getDate() + 1);
  nextStreakDate.setHours(0, 0, 0, 0);

  res.send({ nextStreakDate, score });
})

app.listen(port);