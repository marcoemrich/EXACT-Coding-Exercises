# Overlords: 2 KI-Gegner mit Drafting-Mechanik

## Rahmenbedingungen

- **Kartentypen**: Nur die bereits implementierten (Zombie, Cyclops, Chimera, Undead Warrior 1/2/3)
- **Scoring**: Wie im Code implementiert (unverändert)
- **Deck**: 36 Karten (angepasst, damit es für 3 Spieler aufgeht)
- **Format**: 2 Runden à 6 Karten pro Hand (jeder Spieler hat am Ende 12 Karten)
- **Drafting**: Karte wählen → Rest immer nach links weitergeben (keine Richtungswechsel)
- **KI**: Wählt zufällig aus der Hand
- **Sichtbarkeit**: Nur die oberste Karte der Gegner-Piles ist sichtbar
- **Spielende**: Rangliste mit Details (Score + Kartenzusammensetzung, sortiert nach Punktzahl)

---

## Story 1: Kartendeck erstellen

> Als Spielleiter will ich ein gemischtes Kartendeck aus 36 Karten der vorhandenen Monstertypen erstellen, damit Karten fair an alle Spieler ausgeteilt werden können.

**Akzeptanzkriterien:**
- [ ] Das Deck enthält genau 36 Karten
- [ ] Das Deck enthält nur die vorhandenen Kartentypen in folgender Verteilung:
  - 12× Zombie
  - 5× Cyclops
  - 7× Chimera
  - 3× Undead Warrior 1
  - 6× Undead Warrior 2
  - 3× Undead Warrior 3
- [ ] Die Verteilung der Kartentypen ist festgelegt und reproduzierbar
- [ ] Das Deck ist zufällig gemischt (unterschiedliche Reihenfolge bei jedem Spiel)

---

## Story 2: Karten austeilen

> Als Spielleiter will ich zu Beginn einer Runde das Deck in 3 gleichgroße Hände aufteilen, damit jeder Spieler seine Starthand für das Drafting bekommt.

**Akzeptanzkriterien:**
- [ ] Jeder der 3 Spieler (Mensch + 2 KI) erhält eine Hand mit genau 6 Karten
- [ ] Die 18 ausgeteilten Karten kommen vom gemischten Deck
- [ ] Die restlichen 18 Karten bleiben im Deck für Runde 2
- [ ] Kein Spieler sieht die Karten der anderen Spieler

---

## Story 3: Spieler draftet eine Karte

> Als Spieler will ich eine Karte aus meiner Hand auswählen und meinem Army Pile hinzufügen, damit ich meine Armee aufbauen kann.

**Akzeptanzkriterien:**
- [ ] Der Spieler sieht alle Karten seiner aktuellen Hand
- [ ] Der Spieler kann eine Karte per Klick auswählen
- [ ] Die gewählte Karte wird dem Army Pile des Spielers hinzugefügt
- [ ] Die gewählte Karte ist nicht mehr in der Hand
- [ ] Der aktuelle Score wird nach der Auswahl aktualisiert

---

## Story 4: KI-Gegner draftet zufällig

> Als Spieler will ich, dass die 2 KI-Gegner gleichzeitig mit mir jeweils eine zufällige Karte aus ihrer Hand wählen, damit alle Spieler am Drafting teilnehmen.

**Akzeptanzkriterien:**
- [ ] Jeder KI-Gegner wählt genau eine zufällige Karte aus seiner Hand
- [ ] Die Auswahl der KI geschieht gleichzeitig mit der Auswahl des Spielers
- [ ] Die gewählte Karte wird dem jeweiligen KI-Pile hinzugefügt
- [ ] Die gewählte Karte ist nicht mehr in der KI-Hand

---

## Story 5: Hände nach links weitergeben

> Als Spieler will ich nach jeder Kartenauswahl die restliche Hand des Spielers rechts von mir erhalten, damit mir neue Karten zur Auswahl stehen.

**Akzeptanzkriterien:**
- [ ] Nach dem Drafting aller 3 Spieler rotieren die Resthände nach links
- [ ] Der Spieler erhält die Resthand des rechten Nachbarn
- [ ] Die Handgröße nimmt pro Drafting-Schritt um 1 ab
- [ ] Wenn nur noch 1 Karte in der Hand ist, wird sie automatisch gedraftet (Ende der Runde)

---

## Story 6: Gegner-Piles anzeigen

> Als Spieler will ich links und rechts vom Spielbereich die oberste Karte der Gegner-Piles sehen, damit ich ihre Strategie einschätzen kann.

**Akzeptanzkriterien:**
- [ ] Links und rechts vom Spieler wird jeweils ein KI-Gegner-Bereich angezeigt
- [ ] Nur die oberste (zuletzt gelegte) Karte des Gegner-Piles ist sichtbar
- [ ] Die Anzahl der Karten im Gegner-Pile ist sichtbar
- [ ] Wenn der Pile leer ist, wird kein Kartenbild angezeigt

---

## Story 7: Rundenübergang

> Als Spieler will ich nach Runde 1 automatisch neue Karten für Runde 2 ausgeteilt bekommen, damit das Spiel mit frischen Händen weitergeht.

**Akzeptanzkriterien:**
- [ ] Nach dem Drafting aller 6 Karten in Runde 1 beginnt automatisch Runde 2
- [ ] In Runde 2 werden die restlichen 18 Karten des Decks als 3 neue Hände à 6 Karten ausgeteilt
- [ ] Die Rundenanzeige zeigt "Runde 2 von 2" an
- [ ] Die bestehenden Army Piles bleiben erhalten

---

## Story 8: Spielende & Rangliste

> Als Spieler will ich am Ende des Spiels eine Rangliste mit allen Scores und Kartendetails sehen, damit ich weiß, wer gewonnen hat.

**Akzeptanzkriterien:**
- [ ] Nach Runde 2 wird das Spiel beendet und die Rangliste angezeigt
- [ ] Alle 3 Spieler-Scores werden mit `scoreArmyPile()` berechnet
- [ ] Die Rangliste zeigt 1., 2. und 3. Platz, sortiert nach Score
- [ ] Zu jedem Spieler wird die Kartenzusammensetzung angezeigt
- [ ] Der Gewinner wird visuell hervorgehoben
- [ ] Bei Gleichstand wird die Platzierung geteilt
