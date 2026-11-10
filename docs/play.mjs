import { start, advance, attempt, nextLock, width, readBest, saveBest } from "./round.mjs";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const stats = document.querySelector("#stats");
const status = document.querySelector("#status");
const action = document.querySelector("#action");
const practice = document.querySelector("#practice");
const reset = document.querySelector("#reset");
const storage = () => window.localStorage;
let best = readBest(storage);
let round = null;
let lastTime = performance.now();

function refresh(message) {
    stats.textContent = round
        ? `Hits ${round.hits}/3 · ${round.practice ? "Practice" : `Attempts ${round.attempts}`} · Opened ${round.opened} · Best ${best}`
        : `Best streak ${best}`;
    status.textContent = message;
    action.textContent = { playing: "Tap", opened: "Next lock", jammed: "Retry" }[round?.state] ?? "Start";
    practice.hidden = Boolean(round);
    reset.hidden = !round;
}

function begin(isPractice) {
    round = start(isPractice);
    refresh("Watch the green target.");
}

function activate() {
    if (!round || round.state === "jammed") {
        begin(false);
    } else if (round.state === "opened") {
        round = nextLock(round);
        refresh("Next lock ready.");
    } else {
        let message = attempt(round);
        if (round.state === "jammed") message = "Lock jammed. Try again.";
        if (!round.practice && round.opened > best) {
            best = round.opened;
            if (!saveBest(storage, best)) message += ". Best saved for this session only.";
        }
        refresh(message);
    }
}

function radians(degrees) {
    return (degrees - 90) * Math.PI / 180;
}

function arc(from, to, color, weight) {
    ctx.beginPath();
    ctx.arc(170, 170, 130, radians(from), radians(to));
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function frame(now) {
    if (round) advance(round, (now - lastTime) / 1000);
    lastTime = now;
    ctx.clearRect(0, 0, 340, 340);
    arc(0, 360, "#455872", 8);
    if (round) arc(round.target - width(round), round.target + width(round), "#70e7b0", 14);
    const angle = radians(round?.angle ?? 0);
    ctx.beginPath();
    ctx.moveTo(170, 170);
    ctx.lineTo(170 + Math.cos(angle) * 119, 170 + Math.sin(angle) * 119);
    ctx.strokeStyle = "#f1f5ff";
    ctx.lineWidth = 5;
    ctx.stroke();
    requestAnimationFrame(frame);
}

if (ctx) {
    action.addEventListener("click", activate);
    practice.addEventListener("click", () => begin(true));
    reset.addEventListener("click", () => {
        round = null;
        refresh("Choose Start or Practice.");
        action.focus();
    });
    document.addEventListener("keydown", event => {
        if (event.code !== "Space") return;
        event.preventDefault();
        if (event.repeat) return;
        if (event.target === practice || event.target === reset) event.target.click();
        else activate();
    });
    refresh("Choose Start or Practice.");
    requestAnimationFrame(frame);
} else {
    status.textContent = "This browser could not open the game canvas.";
    action.disabled = practice.disabled = true;
}
