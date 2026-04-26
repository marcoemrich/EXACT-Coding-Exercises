# Example Mapping: Cyclops Scores

## Story (yellow)

As a player, I want to calculate the points of my Cyclops cards in the army pile, so that my total score is determined correctly.

## Rules (blue)

### Rule 1: No Cyclops
0 cards in the army pile yield 0 points.

### Rule 2: Exactly one Cyclops (bonus)
Exactly 1 Cyclops in the army pile yields 6 points.

### Rule 3: Multiple Cyclops
More than 1 Cyclops in the army pile yields 2 points per card.

## Examples (green)

### For Rule 1: No Cyclops
- 0 Cyclops -> 0 points

### For Rule 2: Exactly one Cyclops (bonus)
- 1 Cyclops -> 6 points

### For Rule 3: Multiple Cyclops
- 2 Cyclops -> 4 points
- 3 Cyclops -> 6 points
- 5 Cyclops -> 10 points

## Questions (red)

No open questions — all uncertainties have been resolved.

## Additional info

- The function only receives the number of Cyclops cards (not the whole army pile)
- No interactions with other card types
- A maximum of 5 Cyclops cards exist in the game
