# Overlords Singleplayer — User Stories

## Background

These stories describe a **simplified singleplayer variant** of the Overlords Card Game as an exercise for incrementally building a card-game UI with a clear domain/UI separation.

### Game Rules

- **Draw pile**: 20 cards with a fixed distribution
  - 7× Zombie
  - 3× Cyclops
  - 4× Chimera
  - 2× Three Point Undead Warrior
  - 2× Two Point Undead Warrior
  - 2× One Point Undead Warrior
- **Turns**: Exactly 7 turns per game
- **Hand size**: Decreasing
  - Turn 1 → 7 cards
  - Turn 2 → 6 cards
  - Turn 3 → 5 cards
  - Turn 4 → 4 cards
  - Turn 5 → 3 cards
  - Turn 6 → 2 cards
  - Turn 7 → 1 card (recruited automatically)
- **Reshuffle**: After each recruit, all non-recruited cards from the hand are returned to the remaining draw pile and the whole pile is **reshuffled completely**
- **Army pile**: Only the top card is visible; the score is calculated live with `scoreArmyPile()`
- **End of game**: After turn 7, the final score is shown

---

## Widget Stories (Building Blocks)

### Story W1: Hand Widget (recruitable cards)

> As a player, I want to see my current hand with all its cards and recruit one of them by clicking, so that I can add a card to my army pile.

**Rules:**

- All cards in the current hand are displayed side by side
- Each card is clickable
- Clicking a card triggers an `onPick(card, index)` callback
- The number of cards in the hand is visible (e.g. "Hand: 6 cards")
- When the hand is empty, the widget is not displayed
- Optional: On mouseover, a card is visually highlighted (e.g. border or highlight effect)

---

### Story W2: Army Pile Widget (top card + score)

> As a player, I want to see my army pile with the top card and the current score, so that I can assess my strategy.

**Rules:**

- Only the most recently recruited (top) card is visible
- The number of cards in the army pile is shown (e.g. "Pile: 3 cards")
- The current score is calculated with `scoreArmyPile()` and displayed
- When the pile is empty, a placeholder is shown ("No cards yet")

---

### Story W3: Draw Pile Widget (number of cards in draw pile)

> As a player, I want to see how many cards are left in the draw pile, so that I can gauge the progress of the game.

**Rules:**

- Display of the current card count in the draw pile (e.g. "Draw pile: 13 cards")
- Visual representation as a face-down card stack symbol
- When the draw pile is empty (0 cards), "Draw pile empty" is shown
- Updates after every turn (taking reshuffle into account)

---

## Game Flow Stories

### Story G1: Initialize the draw pile

> As the game master, I want a shuffled draw pile with a fixed card distribution to be created at game start, so that every game starts reproducibly.

**Rules:**

- The draw pile contains exactly 20 cards
- Distribution: 7×Zombie, 3×Cyclops, 4×Chimera, 2×Three Point Undead Warrior, 2×Two Point Undead Warrior, 2×One Point Undead Warrior
- The draw pile is shuffled randomly before game start
- The order differs on each game start (non-deterministic)

---

### Story G2: Deal the first hand (Turn 1)

> As a player, I want to receive 7 cards from the draw pile as my hand at game start, so that I can make my first recruit.

**Rules:**

- 7 cards are drawn from the top of the draw pile
- These 7 cards form the hand
- The draw pile contains 13 cards afterwards
- The hand cards are visible to the player

---

### Story G3: Recruit a card and reshuffle

> As a player, I want all non-recruited cards to be reshuffled back into the draw pile after I recruit a card, so that the next turn draws from a freshly shuffled pile.

**Rules:**

- The recruited card is placed on top of the army pile
- The non-recruited cards from the hand are combined with the remaining draw pile
- The resulting draw pile is reshuffled completely
- The score in the army pile widget is updated
- The draw pile widget shows the new card count

---

### Story G4: Subsequent turns with decreasing hand size

> As a player, I want a smaller hand on every turn, so that the game ends after 7 turns.

**Rules:**

- Turn 2 draws 6 cards from the draw pile
- Turn 3 draws 5 cards, turn 4 draws 4, ..., turn 7 draws 1 card
- A turn indicator shows the current turn (e.g. "Turn 3 of 7")
- On every turn, the recruit mechanic from Story G3 applies

---

### Story G5: Last turn is automatic

> As a player, I want the 7th turn to happen automatically, since only one card is left.

**Rules:**

- On turn 7, the last card is automatically added to the army pile without a click
- The card is briefly displayed visually before being placed on the pile
- After turn 7, the game ends automatically

---

### Story G6: End of game & final score

> As a player, I want to see my final score and the composition of my army at the end of the game, so that I can understand my result.

**Rules:**

- After turn 7, a game-over screen is shown
- The final score is calculated with `scoreArmyPile()` and displayed prominently
- The card composition is listed (e.g. "3× Zombie, 2× Cyclops, ...")
- A "New Game" button starts a new game with a fresh draw pile
- Hand widget and draw pile widget are hidden or shown empty
