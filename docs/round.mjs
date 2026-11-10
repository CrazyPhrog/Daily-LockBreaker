export function start(practice = false) {
    return { practice, angle: 0, target: 75, hits: 0, attempts: 3, opened: 0, state: "playing" };
}

export function width(round) {
    return round.practice ? 22 : Math.max(8, 16 - round.opened * 2);
}

export function advance(round, seconds) {
    if (round.state !== "playing" || !Number.isFinite(seconds) || seconds <= 0) return;
    const speed = round.practice ? 110 : Math.min(300, 155 + round.opened * 18);
    round.angle = (round.angle + speed * Math.min(seconds, 0.05)) % 360;
}

export function attempt(round) {
    if (round.state !== "playing") return "";
    const distance = Math.abs(round.angle - round.target);
    if (Math.min(distance, 360 - distance) > width(round)) {
        if (!round.practice && --round.attempts === 0) round.state = "jammed";
        return "Miss";
    }
    round.hits++;
    if (round.hits === 3) {
        round.opened++;
        round.state = "opened";
        return "Lock opened";
    }
    round.target = (round.target + (round.hits === 1 ? 150 : 130)) % 360;
    return "Hit";
}

export function nextLock(round) {
    if (round.state !== "opened") return round;
    return { ...start(round.practice), opened: round.opened };
}

const BestScoreKey = "lock-breaker.best";

export function readBest(storage) {
    try {
        const value = storage().getItem(BestScoreKey);
        if (typeof value !== "string" || !/^\d+$/.test(value)) return 0;
        const score = Number(value);
        return Number.isSafeInteger(score) && score >= 0 ? score : 0;
    } catch {
        return 0;
    }
}

export function saveBest(storage, score) {
    if (!Number.isSafeInteger(score) || score < 0) return false;
    try {
        storage().setItem(BestScoreKey, String(score));
        return true;
    } catch {
        return false;
    }
}
