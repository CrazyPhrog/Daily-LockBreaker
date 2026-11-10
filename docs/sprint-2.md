# Sprint 2 · Core Implementation

**Goal** Deliver a browser MVP where a player can open or jam a lock, retry,
practice, and see their best streak across visits.

| Issue draft | Acceptance criteria |
|---|---|
| Connect the dial and timing rules | Space and the Tap button submit an attempt. Three hits open the lock and three misses jam it. |
| Add progression and practice | The next lock spins faster and has a narrower target. Practice misses leave attempts intact. |
| Persist best streak safely | A valid streak survives reload. Corrupt data loads as zero and blocked storage keeps the current session playable. |
| Verify and publish the browser MVP | Rules tests pass. Demo checklist is complete and the README links to the live GitHub Pages URL. |

## Branch and pull request

Branch `sprint-2/browser-mvp`
PR title **Add the playable Lock Breaker browser MVP**

Open the issues above, link them in the pull request, and include the test
output and the demo result. After merging to main, publish the main branch
from the /docs folder in GitHub Pages. Copy the displayed Pages URL into the README.

## End-to-end demo checklist

1. Start a normal game and hit three targets.
2. Continue to the next lock and observe the higher speed and smaller arc.
3. Miss three times and confirm Retry starts a fresh streak.
4. Open Practice and confirm repeated misses leave it playable.
5. Reload and confirm the normal-mode best streak still appears.
6. Hold Space during a round and confirm only one attempt registers.
