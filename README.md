# re:act - interaktive LAT-Lights Installation

## Kurzbeschrieb

Eine interaktive LAT-Lights-Installation für die SGKM-Tagung, die über Auto- und Manual-Mode gesteuert wird. In Auto-Mode reagieren LAT-Lights per Kamera-Input und färben die Lights nach der Farbe des Oberteils der Besucher. Im Manual-Mode lassen sie sich per Web-Interface mit Color-Picker und vordefinierten Animationen steuern. Ausserdem gibt es eine History welche die gespeicherten Farb-Presets aus der Datenbank lädt und diese in einem Chart darstellt.

## Reproduzierbarkeit

### Für User

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


### Für Entwickler

#### 1. Frontend
1. **Git Repository klonen**, https://github.com/adrianjanka/re-act.git
2. auf Webserver laufen lassen (PHP genügt)

---

#### 2. Backend
1. **Datenbank erstellen**
CREATE DATABASE IF NOT EXISTS re_act_db;
USE re_act_db;
``` sql
CREATE TABLE IF NOT EXISTS re_act_colors (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255),
  erstellt_am DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  farbe       JSON           NOT NULL
) ENGINE=InnoDB CHARSET=utf8mb4;
```

2. **db env vars anpassen**, im php script
---

#### 3. Touchdesigner
1. **SGKM_Lats.toe lokal öffnen**,
**Wichtig:** Das Gerät welches die TouchDesigner Datei öffnet, muss im Netz des Routers sein (wird weiter unten beschrieben)!

---

#### 4. physische Komponente
- **Kamera** für Farberkennung im Auto Mode  
- **Router** Schnittstelle zwischen Software und Hardware / sorgt für die Verbindung zu TouchDesigner
- **DMX512-Controller** wird mit Router verbunden
- **NodeIV / Euro Lite / dxtSeries** wird mit DMX verbunden
- **6 × LAT-Lights** werden mit DMX-Controller verbunden
- **Laptop** muss im Netz des Routers sein!
- **Stromversorgung** für Hardwareteile
- **Ethernet-/Netzwerkkabel** zur Verbindung Server ↔ Router ↔ DMX-Hardware ↔ LAT-Lights

---


## Flussdiagramm

Screen-Flow
![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/Screenflow_IM4_React.png)

## Komponentenplan

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


## Steckschema

Wir haben kein Breadboard benutzt, aus diesem Grund haben wir kein Steckschema.

## Screenshots / Bilder / ggf. GIFs

Demogruppenbild Re:act
![Image](https://github.com/user-attachments/assets/191ad0cc-ac8f-4a8d-87e6-286e4f79e11f)

TouchDesigner
![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/TouchDesigner_1)
![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/TouchDesigner_2)

Frontend
![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/Screenshot_Frontend.png)

## Bericht zum Umsetzungsprozess (Lukas)

Entwicklungsprozess, verworfene Lösungsansätze, Designentscheidungen, Inspirationen, Fehlschläge und Umplanung, Challenges, Lerneffekt, Known Bugs, Planung, Aufgaben- verteilung, Hilfsmittel (KI-Hilfsmittel erlaubt, erwünscht -> erwähnen)

### Entwicklungsprozess  
- **29.04.2025**: Konzeptionen, UX/UI Design,
- **30.04.2025**: Designentwurf im UX-Coaching abgestimmt, Personas und Projekt­übersicht erstellt.  
- **12.05.2025**: Frontend-Grundgerüst fertig, Hardware­material eingetroffen.  
- **13.05.2025**: Manual Mode mit Reset-Color-Button implementiert; erste HTTP-Requests an TouchDesigner zum Farb­versand.
- **14.05.2025**: JS-Skript zur Umwandlung von Hex-Farben in LAT-Light-Codes entwickelt.
- **15.05.2025**: Datenbank-Anbindung realisiert; AJAX-Save-Funktion und History-Chart via Chart.js fertiggestellt.

Konzept Entwurf
![Image](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/Konzept.png)

---

### Verworfene Lösungsansätze  
- Kamera-Trigger zum Deaktivieren des Idle-Screens (zu selten praktikabel, Hemmschwelle zu hoch).

---

### Designentscheidungen  
- **Touchpad als einziger Auslöser** für den Idle-Screen, um Bedien­klarheit zu schaffen.  
- **Akkordeon-Interface** für direkte Moduswahl (Auto vs. Manual) ohne Seitennavigation.  
- **Schlichte Button-Anordnung** und Farb-Picker direkt unter jeder Röhre für sofortiges Feedback.  
- **Chart.js** für History-Visualisierung, X-Achsen-Ticks und Tooltips deaktiviert.

---

### Inspirationen  
- Interaktive Lichtinstallationen in Museen.  
- Open-Source DMX-Controller-Interfaces im Theater.

---

### Fehlschläge & Umplanung  
- **DMX-Verbindung** am 12.05.: fehlendes Stromkabel → Umplanung der Hardware­checks.  
- **Chart-Layout**: X-Achsen-Labels störten → ausgeblendet, Bar-Thickness angepasst.  
- **Idle-Screen-Fade**: Sprünge im Timeout → CSS-Transition mit `transitionend` implementiert.

---

### Challenges  
- Flowchart zur Deaktivierungslogik erstellen und Varianten bewerten.  
- Zu klare Call-to-Action vs. Flexibilität im UI: Interviews zeigten hohen Simplizitätsbedarf.  
- Synchronisation zwischen JS `fetch()` und PHP/PDO bei Save/Load.

---

### Lerneffekt  
- Umgang mit **Chart.js**-Optionen und dynamischem Canvas-Resizing.  
- **PHP/PDO**-Integration mit JSON-Spalte in MariaDB.  
- Einsatz von CSS-Transitions für flüssige UI-Animationen.

---

### Planung  
- Nächste Schritte: Pagination im History-Chart, Validierung des `name`-Inputs, Deployment-Dokumentation.

---

### Aufgabenverteilung  
- **Adrian**: Frontend-Dev (HTML/CSS/JS), Chart.js, AJAX/PHP-API.  
- **Lukas**: Hardware-Setup (LATs, DMX, Router) / Organisation
- **Jan**: TouchDesigner-File (WebSocket-Server, CHOP-Netz).

---

### Hilfsmittel  
- **ChatGPT**: Generierung von Frontend Problematiken / Dokumentation
- **Figma**: UI-Mockups und UX-Coaching.  
- **TouchDesigner**: Prototyping der Auto-Mode-Logik.


## Video-Dokumentation
Demovideo Re:act


![](https://github.com/adrianjanka/re-act/blob/main/Dokumentation/Demovideo_IM4_React.MOV)

