# re:act - interaktive LAT-Lights Installation

## Kurzbeschrieb

Eine interaktive LAT-Lights-Installation für die SGKM-Tagung, die über Auto- und Manual-Mode gesteuert wird. In Auto-Mode reagieren LAT-Lights per Kamera-Input und färben die Lights nach der Farbe des Oberteils der Besucher. Im Manual-Mode lassen sie sich per Web-Interface mit Color-Picker und vordefinierten Animationen steuern. Ausserdem gibt es eine History welche die gespeicherten Farb-Presets aus der Datenbank lädt und diese in einem Chart darstellt.

## Reproduzierbarkeit (Adrian)

verständliche Schritt-für-Schritt-Anleitung, um  das Projekt nachzubauen

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

## Bericht zum Umsetzungsprozess (Adrian) (Lukas)

Entwicklungsprozess, verworfene Lösungsansätze, Designentscheidungen, Inspirationen, Fehlschläge und Umplanung, Challenges, Lerneffekt, Known Bugs, Planung, Aufgaben- verteilung, Hilfsmittel (KI-Hilfsmittel erlaubt, erwünscht -> erwähnen)


## Video-Dokumentation (Lukas)
Download Demovideo Re:act
https://github.com/user-attachments/assets/35be8a68-be1a-4026-98fe-d847e1191600


## Lernfortschritt

 ergibt sich vor allem aus dem Engagement in Präsenz ?
