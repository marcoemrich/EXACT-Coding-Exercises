# Example Mapping: Army Pile Builder UI

## Story (gelb)

Als Spieler möchte ich mir eine Army Pile zusammenklicken, indem ich aus jeweils 7 zufällig angezeigten Karten eine auswähle und danach 7 neue Karten bekomme, damit ich einen Kartenstapel mit Punktewertung aufbauen kann.

## Rules (blau)

### Regel 1: Kartenauswahl (7 Karten pro Runde)
Am unteren Rand werden 7 zufällige Karten als horizontale Reihe angezeigt. Jede Karte wird als Bild dargestellt (Kartenbilder aus `cards/`-Ordner).

### Regel 2: Karte wählen und neue Karten
Klick auf eine der 7 Karten legt sie auf den Stapel. Danach erscheinen 7 neue zufällige Karten.

### Regel 3: 5 Runden
Das Spiel hat genau 5 Runden. Pro Runde wählt man eine Karte. Nach 5 gewählten Karten ist Schluss.

### Regel 4: Stapel-Anzeige
Der Stapel zeigt die zuletzt gewählte Karte (als Bild), darunter die aktuelle Anzahl der Karten im Stapel und die aktuelle Punktzahl.

### Regel 5: Leerer Stapel
Am Anfang (bevor eine Karte gewählt wurde) zeigt der Stapel einen leeren Platzhalter.

### Regel 6: Scoring
Die Punkte werden mit der bestehenden Scoring-Logik aus `army-pile-scores.ts` berechnet. Die Berechnung erfolgt über alle bisher gesammelten Karten.

### Regel 7: Rundenzähler
Ein Rundenzähler zeigt "Runde X von 5" an, damit der Spieler weiß, wie viele Runden noch übrig sind.

### Regel 8: Spielende
Nach Runde 5 wird die Gesamtpunktzahl angezeigt (keine Aufschlüsselung nach Kartentyp).

### Regel 9: Kartentypen
Es gibt 6 Kartentypen: zombie, cyclops, chimera, undead-warrior-1, undead-warrior-2, undead-warrior-3. Bilder liegen in `cards/` (zombie.png, cyclops.png, chimera.png, undead-warrior-1pt.png, undead-warrior-2pt.png, undead-warrior-3pt.png).

## Examples (gruen)

### Zu Regel 1: Kartenauswahl
- Spielstart -> 7 Karten werden als horizontale Reihe am unteren Rand angezeigt
- Jede Karte zeigt ihr Kartenbild (z.B. zombie.png für Zombie)

### Zu Regel 2: Karte wählen und neue Karten
- Spieler klickt auf Karte 3 von 7 -> Karte 3 geht auf den Stapel, 7 neue zufällige Karten erscheinen

### Zu Regel 3: 5 Runden
- Nach 5 Klicks -> keine neuen Karten mehr, Spielende

### Zu Regel 4: Stapel-Anzeige
- Nach 1. Wahl (z.B. Zombie) -> Stapel zeigt: Zombie-Bild, "1 Karte", aktuelle Punkte
- Nach 3. Wahl (z.B. Chimera) -> Stapel zeigt: Chimera-Bild, "3 Karten", aktuelle Punkte

### Zu Regel 5: Leerer Stapel
- Spielstart -> Stapel zeigt leeren Platzhalter, Anzahl 0, Punkte 0

### Zu Regel 6: Scoring
- Scoring-Logik ist bereits implementiert und getestet in `army-pile-scores.ts`
- UI ruft die bestehende Funktion mit den gesammelten Karten auf

### Zu Regel 7: Rundenzähler
- Spielstart -> "Runde 1 von 5"
- Nach 1. Wahl -> "Runde 2 von 5"
- Nach 4. Wahl -> "Runde 5 von 5"

### Zu Regel 8: Spielende
- Nach 5. Wahl -> Kartenauswahl verschwindet, Gesamtpunktzahl wird angezeigt

## Questions (rot)

- Wie genau werden die 7 zufälligen Karten generiert? Gleichverteilung über alle 6 Typen oder gewichtete Verteilung? (auf später verschoben)
- Animation/visueller Effekt beim Kartenklick? (auf später verschoben)
