# Lock Breaker

Lock Breaker gives arcade players a quick timing challenge they can learn in one round. A needle spins around a dial. Press Space inside the green target three times to open the lock. Three misses jam it.
[Play Lock Breaker in your browser](https://crazyphrog.github.io/Daily-LockBreaker/)

## Play in a browser

Open the link above with JavaScript enabled. Choose **Start**, then press **Space** or tap **Tap** while the white needle points inside the green arc. Land three hits, then choose **Next lock** to continue. Each new lock starts with three attempts and gets harder until the difficulty caps. **Retry** starts a fresh streak after a jam.

Choose **Practice** for a slower needle and unlimited misses. Practice does not update your best streak. Normal-mode records are stored in the current browser. If storage is blocked, your record lasts for the current session.

### Run the web build locally

Install Python 3 and run this from the repository root. On macOS or Linux, use `python3` in place of `py`.

```powershell
py -m http.server 8000
```

Open [localhost:8000/docs/](http://localhost:8000/docs/). This serves the JavaScript modules over HTTP.

### Test the browser rules

Install Node.js 20 or newer and run this from the repository root.

```sh
node --test tests/browser.test.mjs
```

For a manual check, start a game, hold Space and confirm it registers only one attempt. Open a lock, advance, lose three attempts, and retry. Reload and check that your best streak persisted. Open Practice and confirm that repeated misses leave it playable.

## Run the C# desktop prototype

Install the .NET 8 SDK or a newer SDK with the .NET 8 runtime. The game uses C# and MonoGame DesktopGL 3.8.1.303. NuGet restores MonoGame automatically. No content pipeline or external assets are needed.

From the repository root:

```sh
dotnet run --project src/LockBreaker
```

On Windows you can also open `src/LockBreaker/LockBreaker.csproj` in Visual Studio 2022 and press F5.

Press Space to start. When the white needle points into the green arc, tap Space. A hit lights a green progress square and moves the target. A miss removes an orange attempt square. After the result, press Space to return to the ready screen, then press it again to start. Esc exits.

## Check the desktop rules

```sh
dotnet run --project tests/LockBreaker.Checks
```

The checks exercise the three-hit win, three-miss loss, angle wraparound, and inputs after a result. For a manual check, start a round, hold Space across multiple revolutions, and verify that only the initial press counts. Play to both results and verify retry resets all indicators.

## Structure

- `docs/index.html` is the GitHub Pages entry point.
- `docs/play.mjs` handles browser input, drawing, and on-screen feedback.
- `docs/round.mjs` contains the browser rules and score storage helpers.
- `tests/browser.test.mjs` exercises the browser rules without a DOM.

- `LockRound.cs` tracks timing, hits, attempts, and outcomes.
- `LockBreakerGame.cs` handles keyboard input and draws the dial and indicators.
- `tests/LockBreaker.Checks` runs the rules without opening a window.
- [Sprint 1 plan and issue drafts](docs/sprint-1.md)

ChatGPT assisted with drafting the prototype, checks, and documentation. The dial and interface are drawn in code.
