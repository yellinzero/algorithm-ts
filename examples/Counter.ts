import { Counter } from "../common";

// Counter 类的用例，模拟T次掷硬币
export function Flips(times: number) {
    const heads: Counter = new Counter("heads"),
        tails: Counter = new Counter("tails");
    for (let t: number = 0; t < times; t++) {
        if (Math.round(Math.random())) {
            heads.increment();
        } else {
            tails.increment();
        }
    }
    console.log(heads.toString());
    console.log(tails.toString());
    const d = heads.tally() - tails.tally();
    console.log("delta: " + Math.abs(d));
}

// Counter 类的用例，模拟T次掷骰子
export function Rolls(times: number) {
    const SIDES: number = 6,
        rolls: Array<Counter> = [];
    for (let i: number = 0; i < SIDES; i++) {
        rolls.push(new Counter(i + '\'s'));
    }
    for (let t: number = 0; t < times; t++) {
        rolls[Math.floor(Math.random() * 6)].increment();
    }
    for (let n: number = 0; n < SIDES; n++) {
        console.log(rolls[n].toString());
    }
}