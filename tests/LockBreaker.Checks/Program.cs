using LockBreaker;

var round = new LockRound();
round.Press();
round.Advance(float.NaN);
Check(round.Angle == 0, "Invalid elapsed time is ignored.");

round.Advance(75f / 155);
round.Press();
round.Advance(150f / 155);
round.Press();
round.Advance(135f / 155);
round.Press();
Check(round.State == RoundState.Opened && round.Attempts == 3,
    "Three hits open the lock, including a hit across zero degrees.");

round.Press();
Check(round.State == RoundState.Ready && round.Hits == 0 && round.Angle == 0,
    "Retry resets the round.");
round.Press();
for (int i = 0; i < 3; i++)
    round.Press();
Check(round.State == RoundState.Jammed && round.Attempts == 0,
    "Three misses jam the lock.");

Console.WriteLine("All 4 rule checks passed.");

static void Check(bool condition, string message)
{
    if (!condition)
        throw new InvalidOperationException(message);
}
