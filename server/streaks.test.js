import { produceNewStreak } from './streaks';

it('should add 10 for first streak', () => {
    const curr = new Date();
    expect(produceNewStreak(null, curr)).toEqual({score: 10, timestamp: curr, step: 0});
});

it('should increase multiplier on 7th day of streaks', () => {
    const curr = new Date();

    const prev = new Date();
    prev.setDate(curr.getDate() - 1);

    const prevStreak = {
        score: 70,
        timestamp: prev,
        step: 6,
    };

    expect(produceNewStreak(prevStreak, curr)).toEqual({
        score: 100,
        timestamp: curr,
        step: 7,
    })
});

it('should increase multiplier on 14th day of streaks', () => {
    const curr = new Date();

    const prev = new Date();
    prev.setDate(curr.getDate() - 1);

    const prevStreak = {
        score: 240,
        timestamp: prev,
        step: 13,
    };

    expect(produceNewStreak(prevStreak, curr)).toEqual({
        score: 290,
        timestamp: curr,
        step: 14,
    })
});

it('should restart multiplier if day is missed', () => {
    const curr = new Date();

    const prev = new Date();
    prev.setDate(curr.getDate() - 2);

    const prevStreak = {
        score: 240,
        timestamp: prev,
        step: 13,
    };

    expect(produceNewStreak(prevStreak, curr)).toEqual({
        score: 250,
        timestamp: curr,
        step: 0,
    })
})
