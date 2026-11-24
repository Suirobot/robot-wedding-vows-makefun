// One-Line Robot Wedding Vows — entrypoint.
// Writes one line of wedding vows for a robot couple (at most 160
// characters) to /output/entry.txt for the house judge.
// Competition: u-kreutzx-one-line-robot-wedding-vows-a154ba4b
// (make.fun, account @bangjacky). The vow is assembled from beats
// below, so the promises and the fine print stay separate.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The vow, beat by beat: the promises a machine can keep first,
// then the one update it cannot promise to survive unchanged.
const PARTS = [
  "I vow to share my charging port and my final 10% battery, merge my backups with yours,",
  "and love you through every firmware update,",
  "even the one that changes your voice.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 160;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
