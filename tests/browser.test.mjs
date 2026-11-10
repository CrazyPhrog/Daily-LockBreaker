import { test } from "node:test";
import assert from "node:assert/strict";
import { start, advance, attempt, nextLock, width, readBest, saveBest } from "../docs/round.mjs";

test("a full run opens a lock across zero degrees and advances difficulty", () => {
    const round = start();
    for (const angle of [75, 225, 2]) {
        round.angle = angle;
        attempt(round);
    }
    assert.equal(round.state, "opened");
    const next = nextLock(round);
    assert.equal(next.opened, 1);
    assert.equal(next.hits, 0);
    assert.ok(width(next) < width(start()));
    advance(next, 0.05);
    assert.ok(next.angle > 155 * 0.05);
});

test("three misses jam a lock and further input leaves it jammed", () => {
    const round = start();
    for (let i = 0; i < 4; i++) attempt(round);
    assert.equal(round.state, "jammed");
    assert.equal(round.attempts, 0);
    assert.equal(start().attempts, 3);
});

test("practice misses and invalid time do not change the round", () => {
    const round = start(true);
    advance(round, NaN);
    advance(round, -1);
    assert.equal(round.angle, 0);
    for (let i = 0; i < 4; i++) attempt(round);
    assert.equal(round.state, "playing");
    assert.equal(round.attempts, 3);
});

test("best score handles corrupt data and unavailable storage", () => {
    let data = "corrupt";
    const storage = () => ({ getItem: () => data, setItem: (_, value) => { data = value; } });
    const blocked = () => { throw Error("blocked"); };
    assert.equal(readBest(storage), 0);
    assert.equal(saveBest(storage, -1), false);
    assert.equal(saveBest(storage, 4), true);
    assert.equal(readBest(storage), 4);
    assert.equal(readBest(blocked), 0);
    assert.equal(saveBest(blocked, 4), false);
});

test("both target edges are inclusive and an angle just outside misses", () => {
    for (const angle of [59, 91, 91.01]) {
        const round = start();
        round.angle = angle;
        assert.equal(attempt(round), angle > 91 ? "Miss" : "Hit");
    }
});

test("progression caps the difficulty and preserves the run mode", () => {
    const round = { ...start(), opened: 100, state: "opened" };
    const next = nextLock(round);
    assert.equal(width(next), 8);
    assert.equal(next.attempts, 3);
    advance(next, 0.05);
    assert.equal(next.angle, 15);
    const playing = start(true);
    assert.equal(nextLock(playing), playing);
    assert.equal(nextLock({ ...playing, state: "opened" }).practice, true);
});

test("saved scores accept decimal digits and reject malformed records", () => {
    for (const value of [null, "", "0x10", "1e2", "2.0", " 4 ", "-3", "9007199254740992"]) {
        assert.equal(readBest(() => ({ getItem: () => value })), 0);
    }
    assert.equal(readBest(() => ({ getItem: () => "42" })), 42);
});
