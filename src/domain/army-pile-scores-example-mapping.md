# Example Mapping: Army Pile Scores

## Story (yellow)

As a player, I want to calculate the total score of my army pile,
where all cards are scored according to their respective type rules and summed up.

## Rules (blue)

### Rule 1: Input is an array of card strings

The function receives an array of string values. The union type is exhaustive:
`"zombie" | "cyclops" | "chimera" | "undead-warrior-1" | "undead-warrior-2" | "undead-warrior-3"`

### Rule 2: Each card type is scored by its own rules

- Zombies: Lookup table by count (scoreZombieCards)
- Cyclops: Solo bonus at 1, otherwise 2 per card (scoreCyclopsCards)
- Chimera: 2 per card + 6 bonus per set of 3 (scoreChimeraCards)
- Undead Warriors: Sum of card values + 6 bonus per complete 1-2-3 set (scoreUndeadWarriorCards)

### Rule 3: Total score = sum of all individual scores

No interactions or bonuses between different card types.
The total score is the simple sum of all type scores.

### Rule 4: Empty pile = 0 points

An empty array yields 0 points.

### Rule 5: Existing scoring functions are reused

The army pile function calls the existing functions:
- `scoreZombieCards(count: number)`
- `scoreCyclopsCards(count: number)`
- `scoreChimeraCards(count: number)`
- `scoreUndeadWarriorCards(cards: number[])`

## Examples (green)

### For Rule 4: Empty pile

- [] -> 0 points

### For Rules 2+3: Single card types

- ["zombie"] -> 1 point (1 Zombie = 1)
- ["cyclops"] -> 6 points (1 Cyclops = solo bonus 6)
- ["chimera", "chimera", "chimera"] -> 12 points (set of 3 Chimera)
- ["undead-warrior-1", "undead-warrior-2", "undead-warrior-3"] -> 12 points (base value 6 + set bonus 6)

### For Rule 3: Mixed pile (sum of individual scores)

- ["zombie", "zombie", "cyclops"] -> 10 points (2 Zombies=4 + 1 Cyclops=6)

## Questions (red)

No open questions — all uncertainties have been resolved.
