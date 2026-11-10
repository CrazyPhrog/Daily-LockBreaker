using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace LockBreaker;

public sealed class LockBreakerGame : Game
{
    private static readonly Vector2 Center = new(360, 255);
    private static readonly Color Green = new(98, 232, 176);
    private static readonly Color Orange = new(255, 166, 94);
    private static readonly Color Muted = new(55, 71, 88);

    private readonly LockRound round = new();
    private SpriteBatch batch = null!;
    private Texture2D pixel = null!;
    private bool spaceWasDown;

    public LockBreakerGame()
    {
        _ = new GraphicsDeviceManager(this)
        {
            PreferredBackBufferWidth = 720,
            PreferredBackBufferHeight = 540
        };
        IsMouseVisible = true;
    }

    protected override void LoadContent()
    {
        batch = new SpriteBatch(GraphicsDevice);
        pixel = new Texture2D(GraphicsDevice, 1, 1);
        pixel.SetData(new[] { Color.White });
        UpdateTitle();
    }

    protected override void Update(GameTime gameTime)
    {
        var keys = Keyboard.GetState();
        if (keys.IsKeyDown(Keys.Escape))
            Exit();

        bool spaceDown = keys.IsKeyDown(Keys.Space);
        if (IsActive)
        {
            if (spaceDown && !spaceWasDown)
            {
                round.Press();
                UpdateTitle();
            }

            round.Advance((float)gameTime.ElapsedGameTime.TotalSeconds);
        }

        spaceWasDown = spaceDown;
        base.Update(gameTime);
    }

    private void UpdateTitle()
    {
        Window.Title = round.State switch
        {
            RoundState.Ready => "Lock Breaker | SPACE to start",
            RoundState.Playing => $"Lock Breaker | SPACE at the green arc | {round.Hits}/3 hits | {round.Attempts} attempts",
            RoundState.Opened => "Lock Breaker | LOCK OPENED | SPACE to retry",
            _ => "Lock Breaker | LOCK JAMMED | SPACE to retry"
        };
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(new Color(16, 25, 37));
        batch.Begin();

        Color ring = round.State switch
        {
            RoundState.Opened => Green,
            RoundState.Jammed => Orange,
            _ => Muted
        };

        for (int angle = 0; angle < 360; angle += 2)
            Line(Point(angle, 156), Point(angle + 2, 156), 5, ring);

        for (int angle = 0; angle < 360; angle += 15)
            Line(Point(angle, 140), Point(angle, 149), 2, Muted);

        float first = round.Target - LockRound.TargetHalfWidth;
        for (int step = 0; step < LockRound.TargetHalfWidth * 2; step++)
            Line(Point(first + step, 156), Point(first + step + 1, 156), 10, Green);

        Line(Center, Point(round.Angle, 152), 5, Color.White);
        batch.Draw(pixel, new Rectangle(353, 248, 14, 14), Color.White);

        for (int i = 0; i < LockRound.Limit; i++)
        {
            batch.Draw(pixel, new Rectangle(256 + i * 32, 462, 22, 12), i < round.Hits ? Green : Muted);
            batch.Draw(pixel, new Rectangle(378 + i * 32, 462, 22, 12), i < round.Attempts ? Orange : Muted);
        }

        batch.End();
        base.Draw(gameTime);
    }

    private static Vector2 Point(float angle, float radius)
    {
        float radians = MathHelper.ToRadians(angle);
        return Center + new Vector2(MathF.Sin(radians), -MathF.Cos(radians)) * radius;
    }

    private void Line(Vector2 start, Vector2 end, float width, Color color)
    {
        Vector2 offset = end - start;
        batch.Draw(pixel, start, null, color, MathF.Atan2(offset.Y, offset.X),
            new Vector2(0, 0.5f), new Vector2(offset.Length(), width), SpriteEffects.None, 0);
    }
}
