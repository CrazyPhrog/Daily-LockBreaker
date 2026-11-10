# Lock Breaker

Lock Breaker gives arcade players a quick timing challenge they can learn in one round. A needle spins around a dial. Press Space inside the green target three times to open the lock. Three misses jam it.
[Play Lock Breaker in your browser](https://crazyphrog.github.io/Daily-LockBreaker/)

## Run

Install the .NET 8 SDK or a newer SDK with the .NET 8 runtime. The game uses C# and MonoGame DesktopGL 3.8.1.303. NuGet restores MonoGame automatically. No content pipeline or external assets are needed.

From the repository root:

```sh
dotnet run --project src/LockBreaker
```

On Windows you can also open `src/LockBreaker/LockBreaker.csproj` in Visual Studio 2022 and press F5.

Press Space to start. When the white needle points into the green arc, tap Space. A hit lights a green progress square and moves the target. A miss removes an orange attempt square. After the result, press Space to return to the ready screen, then press it again to start. Esc exits.

## Check the rules

```sh
dotnet run --project tests/LockBreaker.Checks
```

The checks exercise the three-hit win, three-miss loss, angle wraparound, and inputs after a result. For a manual check, start a round, hold Space across multiple revolutions, and verify that only the initial press counts. Play to both results and verify retry resets all indicators.

## Structure

- `LockRound.cs` tracks timing, hits, attempts, and outcomes.
- `LockBreakerGame.cs` handles keyboard input and draws the dial and indicators.
- `tests/LockBreaker.Checks` runs the rules without opening a window.
- [Sprint 1 plan and issue drafts](docs/sprint-1.md)

ChatGPT assisted with drafting the prototype, checks, and documentation. The dial and interface are drawn in code.
