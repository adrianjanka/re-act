# re:act - interaktive LAT-Lights Installation

## Kurzbeschrieb

Eine interaktive LAT-Lights-Installation für die SGKM-Tagung, die über Auto- und Manual-Mode gesteuert wird. In Auto-Mode reagieren LAT-Lights per Kamera-Input und färben die Lights nach der Farbe des Oberteils der Besucher. Im Manual-Mode lassen sie sich per Web-Interface mit Color-Picker und vordefinierten Animationen steuern. Ausserdem gibt es eine History welche die gespeicherten Farb-Presets aus der Datenbank lädt und diese in einem Chart darstellt.

## Reproduzierbarkeit (Adrian)

verständliche Schritt-für-Schritt-Anleitung, um  das Projekt nachzubauen

### für User

#### 1. Start & Idle-Screen
1. **Touch the Mousepad**, um das Overlay auszublenden und zur Modus-Auswahl zu gelangen.

---

#### 2. Auto Mode  
1. Klicke oben auf **Auto Mode**, um das Panel zu öffnen.  
2. **Warte**, bis die Kamera dich erkennt.
4. Gib dem System Zeit, die LED-Röhren automatisch einzustellen.

---

#### 3. Manual Mode  
1. Klicke oben auf **Manual Mode**, um das Panel zu öffnen.  
2. **Farbwahl**  
   - Zu jeder der 6 Röhren gehört ein Color-Picker direkt darunter.  
   - Klicke auf einen Picker und wähle deine Wunschfarbe.  
   - Die Röhre färbt sich sofort.
3. **Farbanimationen**
   - Animationen (Rainbow, Heartbeat, Impulse, Mint, SGKM) auswählen.
   - Die gewählte Animationen erscheint auf den Röhren.
4. **Reset Colors**  
   - Klick auf **Reset Colors**, um alle Picker auf Schwarz zurück­zusetzen und die Röhren grau zu machen.  
5. **Save to DB**  
   - Klick auf **Save to DB**, um die aktuellen Farben in der Datenbank zu speichern.  
   - **Tipp:** Nach dem Klick wird das Chart automatisch aktualisiert.  
6. **History**  
   - Klick auf **History**, um das Chart mit den zuletzt gespeicherten Presets anzuzeigen.
   - Klick erneut auf **History**, um das Chart auszublenden.  

---

#### 4. Abschliessen
- Zum Neustarten des Idle-Screens 10 Sekunden lang keine Eingabe tätigen.


### für Entwickler

## Flussdiagramm (Lukas)

Screen-Flow
<img width="927" alt="Image" src="https://github.com/user-attachments/assets/5cbfb2a4-f3b5-4c08-aee6-6ad892fe5d22" />

## Komponentenplan (Adrian)

Verbindungsschema der digitalen und haptischen Komponenten bzw. Kommunikationswege

![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/komponentenplan.png)

### Legende der Komponenten

#### Clients
**Browser UI**: Benutzeroberfläche im Webbrowser, gesteuert via Touchpad<br>
**TouchDesigner App**: Lokale TouchDesigner-Datei mit eingebautem Webserver<br>
**Camera**: liefert Farbe/Video-Input an TouchDesigner

#### Netzwerk
**Router**: verbindet Clients, Server und DMX-Hardware<br>
**DMX512-Decoder → dxtSeries/NodeIV/Euro Lite → LAT Lights**: Lichtsteuerungs-Chain

#### Server
**Webserver (PHP + MySQL)**: Host für Frontend, PHP-APIs (save_colors.php, get_colors.php)<br>
**MariaDB**: speichert Farb-Presets mit Zeitstempel und Name


## Steckschema (Adrian)

Wir haben kein Breadboard benutzt, aus diesem Grund haben wir kein Steckschema.

## Screenshots / Bilder / ggf. GIFs (Lukas)

Demogruppenbild Re:act
![Image](https://github.com/user-attachments/assets/191ad0cc-ac8f-4a8d-87e6-286e4f79e11f)

TouchDesigner
[![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/TouchDesigner_1)
[![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/TouchDesigner_2)

Frontend
[![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/Screenshot_Frontend.png)

## Bericht zum Umsetzungsprozess (Adrian) (Lukas)

Entwicklungsprozess, verworfene Lösungsansätze, Designentscheidungen, Inspirationen, Fehlschläge und Umplanung, Challenges, Lerneffekt, Known Bugs, Planung, Aufgaben- verteilung, Hilfsmittel (KI-Hilfsmittel erlaubt, erwünscht -> erwähnen)


## Video-Dokumentation (Lukas)
Download Demovideo Re:act
https://github.com/user-attachments/assets/35be8a68-be1a-4026-98fe-d847e1191600


## Lernfortschritt

 ergibt sich vor allem aus dem Engagement in Präsenz ?
