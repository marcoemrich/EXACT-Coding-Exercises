# Example Mapping: Score Card Zombie

## Story (yellow)

As a player, I want to know how many points my Zombie cards are worth,
so that I can calculate my total score.

## Rules (blue)

### Rule 1: Points follow a fixed table

The score depends on the number of Zombie cards and is given as a
lookup table on the card:

| Zombie count | Points |
|--------------|--------|
| 1            | 1      |
| 2            | 4      |
| 3            | 9      |
| 4            | 12     |
| 5            | 18     |
| 6            | 24     |

### Rule 2: No cards = no points

0 Zombie cards yield 0 points.

### Rule 3: Score is capped at 6 cards

There are 12 Zombie cards in the game, but the maximum score is 24 points
(equivalent to 6 cards). More than 6 Zombie cards do not grant additional points.

## Examples (green)

### For Rule 1: Lookup table

- 1 Zombie -> 1 point
- 2 Zombies -> 4 points
- 3 Zombies -> 9 points
- 4 Zombies -> 12 points
- 5 Zombies -> 18 points
- 6 Zombies -> 24 points

### For Rule 2: No cards

- 0 Zombies -> 0 points

### For Rule 3: Cap at 6

- 7 Zombies -> 24 points
- 12 Zombies -> 24 points

## Questions (red)

No open questions — all uncertainties have been resolved.
