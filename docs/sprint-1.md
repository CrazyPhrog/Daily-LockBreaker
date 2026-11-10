# Sprint 1 · Planning and Setup

**Owner** Axel Carmona  
**Timebox** Seven days  
**Goal** A new player can launch the game, open or jam one lock, and retry without restarting the application.

**Problem and users** Arcade players who want a short timing challenge need a game with simple controls and fast retries.

**In scope** One rotating dial, one moving target, three hits to win, three misses to lose, and a retry flow. The prototype tracks hits and attempts in memory.

**Later sprints** Difficulty progression, practice mode, persistent high scores, and sound.

## GitHub issue drafts

| Priority | Day | Issue title | Acceptance criteria |
|---|---|---|---|
| 1 | 1 | Define the one-lock prototype | README identifies the problem, players, rules, and setup. |
| 2 | 1–2 | Set up the C# and MonoGame project | A fresh checkout restores dependencies and opens the game window. |
| 3 | 2–3 | Implement the timing rules | Hits advance the lock, misses consume attempts, and the round ends at either limit. |
| 4 | 4–5 | Draw the dial and connect keyboard input | Space starts, submits a single attempt per tap, and returns from the result. |
| 5 | 6–7 | Verify the prototype and publish it | Run automated checks and manually confirm both outcomes and retry. Push to a public GitHub repository and create these issues. |
