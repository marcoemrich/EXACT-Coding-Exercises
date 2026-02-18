# Example Mapping: Army Pile Scores

## Story (gelb)

Als Spieler moechte ich den Gesamtpunktwert meiner Army Pile berechnen,
indem alle Karten nach ihren jeweiligen Typ-Regeln gewertet und aufsummiert werden.

## Rules (blau)

### Regel 1: Input ist ein Array von Karten-Strings

Die Funktion erhaelt ein Array von String-Werten. Der Union Type ist abschliessend:
`"zombie" | "cyclops" | "chimera" | "undead-warrior-1" | "undead-warrior-2" | "undead-warrior-3"`

### Regel 2: Jeder Kartentyp wird nach seinen eigenen Regeln gewertet

- Zombies: Lookup-Tabelle nach Anzahl (scoreZombieCards)
- Cyclops: Solo-Bonus bei 1, sonst 2 pro Karte (scoreCyclopsCards)
- Chimera: 2 pro Karte + 6 Bonus pro 3er-Set (scoreChimeraCards)
- Undead Warriors: Summe der Kartenwerte + 6 Bonus pro vollstaendiges 1-2-3 Set (scoreUndeadWarriorCards)

### Regel 3: Gesamtscore = Summe aller Einzelwertungen

Keine Interaktionen oder Boni zwischen verschiedenen Kartentypen.
Der Gesamtscore ergibt sich aus der einfachen Addition aller Typ-Scores.

### Regel 4: Leere Pile = 0 Punkte

Ein leeres Array ergibt 0 Punkte.

### Regel 5: Bestehende Scoring-Funktionen werden wiederverwendet

Die Army Pile Funktion ruft die bestehenden Funktionen auf:
- `scoreZombieCards(count: number)`
- `scoreCyclopsCards(count: number)`
- `scoreChimeraCards(count: number)`
- `scoreUndeadWarriorCards(cards: number[])`

## Examples (gruen)

### Zu Regel 4: Leere Pile

- [] -> 0 Punkte

### Zu Regel 2+3: Einzelne Kartentypen

- ["zombie"] -> 1 Punkt (1 Zombie = 1)
- ["cyclops"] -> 6 Punkte (1 Cyclops = Solo-Bonus 6)
- ["chimera", "chimera", "chimera"] -> 12 Punkte (3er-Set Chimera)
- ["undead-warrior-1", "undead-warrior-2", "undead-warrior-3"] -> 12 Punkte (Grundwert 6 + Set-Bonus 6)

### Zu Regel 3: Gemischte Pile (Summe der Einzelwertungen)

- ["zombie", "zombie", "cyclops"] -> 10 Punkte (2 Zombies=4 + 1 Cyclops=6)

## Questions (rot)

Keine offenen Fragen - alle Unklarheiten wurden geklaert.
