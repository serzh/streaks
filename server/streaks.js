import { v4 as uuidv4} from 'uuid';

const STREAKS_NUMBER = 7;
const COINS_PER_STREAK = 10;
const DAY_MS = 24 * 60 * 60 * 1000;

export async function getLastStreak(sql) {
  const streaks = await sql`SELECT * FROM streaks ORDER BY timestamp DESC LIMIT 1`;
  if (streaks.length == 0) {
    return null;
  }
  return streaks[0];
}

export async function saveStreak(sql, streak) {
  await sql`
    INSERT INTO streaks
      (id, timestamp, step, score)
    VALUES
      (${uuidv4()}, ${streak.timestamp}, ${streak.step}, ${streak.score})
  `;
}

export function produceNewStreak(lastStreak, currentTimestamp) {
  let nextStep = 0;

  if (lastStreak) {
    const distance = (currentTimestamp - lastStreak.timestamp) / DAY_MS;

    if (distance >= 1 && distance < 2) {
      nextStep = lastStreak.step + 1;

    } else if (distance < 1) {
      return null;
    }
  }

  const period_number = Math.floor(nextStep / STREAKS_NUMBER);

  let deltaScore = COINS_PER_STREAK * (period_number + 1);

  if (nextStep % STREAKS_NUMBER == 0) {
    deltaScore += COINS_PER_STREAK * period_number;
  }

  const newScore = (lastStreak?.score || 0) + deltaScore;

  const newStreak = {
    timestamp: currentTimestamp,
    score: newScore,
    step: nextStep,
  }

  return newStreak;
}