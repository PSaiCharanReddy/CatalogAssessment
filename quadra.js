const fs = require("fs");

function decode(value, base) {
    let result = 0n;
    for (let char of value) {
        let digit;
        if (/[0-9]/.test(char)) digit = BigInt(char);
        else digit = BigInt(char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 10);
        result = result * BigInt(base) + digit;
    }
    return result;
}

function solveQuadratic(points) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    const [x3, y3] = points[2];

    const A1 = x1 * x1, B1 = x1, C1 = 1n;
    const A2 = x2 * x2, B2 = x2, C2 = 1n;
    const A3 = x3 * x3, B3 = x3, C3 = 1n;

    const D  = A1*(B2*C3 - B3*C2) - B1*(A2*C3 - A3*C2) + C1*(A2*B3 - A3*B2);
    const Dc = A1*(B2*y3 - B3*y2) - B1*(A2*y3 - A3*y2) + y1*(A2*B3 - A3*B2);


    if (D === 0n) throw new Error("Determinant is zero. Cannot solve.");
    const c = Dc / D;
    return c;
}

function main() {
    const raw = fs.readFileSync("input.json", "utf8");
    const data = JSON.parse(raw);

    const n = parseInt(data.keys.n);
    const k = parseInt(data.keys.k);

    const points = [];
    for (let key of Object.keys(data)) {
        if (key === "keys") continue;
        const x = BigInt(key);
        const base = parseInt(data[key].base);
        const yValue = data[key].value;
        const y = decode(yValue, base);
        points.push([x, y]);
        if (points.length === k) break;
    }

    const c = solveQuadratic(points);
    console.log("The value of c is:", c.toString());
}

main();
