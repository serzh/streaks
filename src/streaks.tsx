import React from 'react';

export const Streaks: React.FC<{}> = (props) => {
  const [nextStreakDate, setNextStreakDate] = React.useState<Date | null>(null)
  const [score, setScore] = React.useState<number | null>(null);

  const [currentTimestamp, setCurrentTimestamp] = React.useState<Date>(new Date());

  React.useEffect(() => {

    const fetchData = async () => {
      const res = await fetch('/api/streaks/summary?' + new URLSearchParams({
        currentTimestamp: new Date().toString(),
      }), { method: "GET" });
      const json = await res.json();

      setNextStreakDate(new Date(json.nextStreakDate));
      setScore(json.score);
    }

    fetchData();

  }, [])

  const sendStreak = React.useCallback(async () => {
    const body = JSON.stringify({ 
      currentTimestamp: currentTimestamp.toDateString()
    });

    const response = await fetch('/api/streaks', { 
      method: 'POST', 
      headers: { "content-type": "application/json" }, 
      body
    });

    const json = await response.json();

    if (json.nextStreakDate) {
      setNextStreakDate(new Date(json.nextStreakDate));
      setScore(json.score);
    }
  }, [currentTimestamp]);

  const disabled = !nextStreakDate || currentTimestamp < nextStreakDate;

  const setNextDay = React.useCallback(() => {
    const nextDay = new Date(currentTimestamp.getTime());
    nextDay.setDate(currentTimestamp.getDate() + 1);
    setCurrentTimestamp(nextDay);
  }, [currentTimestamp]);

  const setPrevDay = React.useCallback(() => {
    const prevDay = new Date(currentTimestamp.getTime());
    prevDay.setDate(currentTimestamp.getDate() - 1);
    setCurrentTimestamp(prevDay);
  }, [currentTimestamp])

  return (
    <div className='flex flex-col items-center m-[120px] gap-4'>
      <button onClick={() => sendStreak()}
              disabled={disabled}
              title={disabled ? 'You have used your streak today! Come tomorrow!' : undefined}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
        Streak
      </button>
      <div>
        Score: <b>{score}</b>
      </div>

      <div className='fixed bottom-0 flex flex-col gap-2'>
        <div className='text-xl text-center'>Dev Section</div>
        <div className='flex flex-row gap-4'>
          <button onClick={setPrevDay}>Prev Day</button>
          <input
            type='datetime-local'
            value={currentTimestamp.toISOString().slice(0, 16)}
            onChange={(e) => {
              setCurrentTimestamp(new Date(e.target.value));
            }} />
          <button onClick={setNextDay}>Next Day</button>
        </div>
        </div>
    </div>
  )
}