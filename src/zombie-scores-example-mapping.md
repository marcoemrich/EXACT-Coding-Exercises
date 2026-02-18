# Example Mapping: Score Card Zombie

## Story (gelb)

Als Spieler will ich wissen, wie viele Punkte meine Zombie-Karten wert sind,
damit ich meinen Gesamtscore berechnen kann.

## Rules (blau)

### Regel 1: Punkte folgen einer festen Tabelle

Die Punktzahl richtet sich nach der Anzahl der Zombie-Karten und ist als
Lookup-Tabelle auf der Karte angegeben:

| Anzahl Zombies | Punkte |
|----------------|--------|
| 1              | 1      |
| 2              | 4      |
| 3              | 9      |
| 4              | 12     |
| 5              | 18     |
| 6              | 24     |

### Regel 2: Keine Karten = Keine Punkte

0 Zombie-Karten ergeben 0 Punkte.

### Regel 3: Score ist bei 6 Karten gedeckelt

Es gibt 12 Zombie-Karten im Spiel, aber der maximale Score liegt bei 24 Punkten
(entspricht 6 Karten). Mehr als 6 Zombie-Karten bringen keine zusaetzlichen Punkte.

## Examples (gruen)

### Zu Regel 1: Lookup-Tabelle

- 1 Zombie -> 1 Punkt
- 2 Zombies -> 4 Punkte
- 3 Zombies -> 9 Punkte
- 4 Zombies -> 12 Punkte
- 5 Zombies -> 18 Punkte
- 6 Zombies -> 24 Punkte

### Zu Regel 2: Keine Karten

- 0 Zombies -> 0 Punkte

### Zu Regel 3: Deckelung bei 6

- 7 Zombies -> 24 Punkte
- 12 Zombies -> 24 Punkte

## Questions (rot)

Keine offenen Fragen - alle Unklarheiten wurden geklaert.
