namespace LockBreaker;

public enum RoundState { Ready, Playing, Opened, Jammed }

public sealed class LockRound
{
    public const int Limit = 3;
    public const float TargetHalfWidth = 16;
    private static readonly float[] Targets = { 75, 225, 355 };

    public float Angle { get; private set; }
    public int Hits { get; private set; }
    public int Attempts { get; private set; } = Limit;
    public float Target => Targets[Math.Min(Hits, Limit - 1)];
    public RoundState State { get; private set; }

    public void Advance(float seconds)
    {
        if (State == RoundState.Playing && float.IsFinite(seconds) && seconds > 0)
            Angle = (float)((Angle + 155d * seconds) % 360);
    }

    public void Press()
    {
        switch (State)
        {
            case RoundState.Ready:
                State = RoundState.Playing;
                break;
            case RoundState.Playing:
                float distance = Math.Abs(Angle - Target);
                if (Math.Min(distance, 360 - distance) <= TargetHalfWidth)
                {
                    Hits++;
                    if (Hits == Limit)
                        State = RoundState.Opened;
                }
                else
                {
                    Attempts--;
                    if (Attempts == 0)
                        State = RoundState.Jammed;
                }
                break;
            default:
                Angle = 0;
                Hits = 0;
                Attempts = Limit;
                State = RoundState.Ready;
                break;
        }
    }
}
