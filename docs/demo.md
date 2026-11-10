# Lock Breaker · Short demo

Open [Lock Breaker](https://crazyphrog.github.io/Daily-LockBreaker/) before presenting.

1. **Introduce the game.** “Lock Breaker is a one-button arcade game. The goal is to open as many locks as possible by timing your presses.”
2. **Show the core loop.** Select Start. Press Space when the needle is in the green arc. Three hits open the lock. Select Next lock to show the smaller target and faster needle.
3. **Show recovery and storage.** Miss three times to jam the lock, select Retry, then reload the page to show that the best streak remains. Select Practice to show the slower needle and unlimited misses.
4. **Explain the code.** “The browser UI handles drawing and controls. A separate rules module decides whether a press counts and what state comes next. That separation lets me test the wraparound at zero degrees, progression, and invalid saves with Node.js. Local storage saves the best streak without requiring an account.”
5. **Show the repository.** Point out the setup instructions, test command, license, and release.
