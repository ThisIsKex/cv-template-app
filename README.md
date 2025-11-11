# Lebenslauf Vue App

Eine moderne, professionelle Lebenslauf-Anwendung, erstellt mit **Vue 3**, **TypeScript**, **Vite** und **Font Awesome**. 
Optimiert für PDF-Export mit perfektem Print-Layout.

## ✨ Features

- ✏️ **CV Data Editor** - Benutzerfreundliche Oberfläche unter `/edit` zur Bearbeitung aller CV-Daten
- 💾 **JSON Export/Import** - Speichern und Laden von CV-Daten als JSON-Dateien
- 🔄 **LocalStorage** - Automatisches Speichern im Browser
- 📦 **Automatisches Laden** - CV-Daten werden automatisch aus `public/cv-data.json` geladen
- 🎨 Modernes, responsives Design
- 📝 Typsichere Datenverwaltung mit TypeScript
- 🖼️ Profilbild-Integration (kreisförmig)
- 🎯 Font Awesome Icons
- 📄 Print-optimiert für PDF-Export
- 🔄 Hot Module Replacement (HMR)
- 🎨 Benutzerdefinierte Farbgebung (#0e5091)

## 📋 Voraussetzungen

- Node.js (v16 oder höher)
- npm oder yarn

## 🚀 Installation

```bash
npm install
```

## ⚙️ Erste Einrichtung

**Wichtiger Schritt:** Bevor Sie die App das erste Mal starten, müssen Sie die Beispiel-CV-Daten kopieren:

```bash
# Kopieren Sie die Beispiel-Datei zur echten CV-Datei
cp public/cv-data-example.json public/cv-data.json
```

**Windows (PowerShell/CMD):**
```cmd
copy public\cv-data-example.json public\cv-data.json
```

Die Datei `cv-data-example.json` enthält Beispieldaten, die Sie als Ausgangspunkt verwenden können.

## 💻 Entwicklung

```bash
npm run dev
```

Die App läuft dann unter `http://localhost:5173`

**Wichtig:** 
- **CV anzeigen:** `http://localhost:5173/` 
- **CV bearbeiten:** `http://localhost:5173/edit`

### 📝 CV-Daten bearbeiten

Die App bietet einen integrierten **CV Data Editor** unter `/edit`:

1. Im Browser zu `http://localhost:5173/edit` navigieren
2. Alle Abschnitte ausfüllen (Persönliche Infos, Erfahrung, Bildung, etc.)
3. **"Save to LocalStorage"** - Daten im Browser speichern
4. **"Export JSON"** - Daten als `cv-data.json` herunterladen
5. JSON-Datei in den `public/` Ordner verschieben
6. App neu laden - Daten werden automatisch geladen!

**Workflow:**
```
/edit → Daten bearbeiten → Export JSON → Datei nach public/ → Fertig!
```

Die exportierte `public/cv-data.json` wird beim App-Start automatisch geladen.

**💡 Tipp:** Die `public/cv-data.json` kann in Git versioniert werden, um Änderungen am Lebenslauf nachzuverfolgen.

## 🏗️ Build

```bash
npm run build
```

Erstellt eine optimierte Production-Build im `dist/` Ordner.

## 📄 Als PDF exportieren

1. App im Browser öffnen (`http://localhost:5173`)
2. `Strg + P` (Windows) / `Cmd + P` (Mac) drücken
3. Ziel: "Als PDF speichern" auswählen
4. In den Einstellungen:
   - **Hintergrundgrafiken**: Aktivieren (wichtig für Farben!)
   - **Seitenränder**: Minimal oder Standard
5. Speichern

**Tipp:** Der blaue Header wird dank `print-color-adjust: exact` automatisch mit gedruckt.

## ✏️ Personalisierung

### Daten anpassen

**Empfohlen:** Nutzen Sie den **CV Data Editor** unter `/edit` (siehe oben).

**Alternativ:** Bearbeiten Sie `src/data/cv-data.ts` direkt mit Ihren persönlichen Informationen:

```typescript
export const cvData: CVData = {
  personalInfo: {
    name: 'Ihr Name',
    location: 'Ihre Stadt',
    phone: '+49 ...',
    email: 'ihre@email.de',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    profileImage: '/profile.jpg'  // Optional
  },
  // ... weitere Daten
}
```

**Hinweis:** Wenn eine `public/cv-data.json` existiert, wird diese automatisch geladen und überschreibt `cv-data.ts`.

### Profilbild hinzufügen

1. Quadratisches Foto vorbereiten (mindestens 300x300px)
2. Als `profile.jpg` oder `profile.png` im `public/` Ordner speichern
3. Pfad in `cv-data.ts` anpassen: `profileImage: '/profile.jpg'`

Das Bild wird automatisch kreisförmig dargestellt (120px Durchmesser).

### Farben anpassen

Die Hauptfarbe (#0e5091) kann in allen Component-Dateien geändert werden:
- `src/components/Header.vue`
- `src/components/Profile.vue`
- `src/components/Experience.vue`
- etc.

## 📁 Projektstruktur

```
cv/
├── public/              
│   └── cv-data.json     # Exportierte CV-Daten (automatisch geladen)
├── src/
│   ├── components/      # Vue Komponenten
│   │   ├── Header.vue
│   │   ├── Profile.vue
│   │   ├── Experience.vue
│   │   ├── Education.vue
│   │   ├── Skills.vue
│   │   ├── Projects.vue
│   │   └── Interests.vue
│   ├── views/           # Router Views
│   │   ├── CVView.vue
│   │   └── EditorView.vue  # CV Data Editor (Route: /edit)
│   ├── router/
│   │   └── index.ts     # Vue Router Konfiguration
│   ├── composables/
│   │   └── useCVData.ts # CV Daten-Management & JSON Loading
│   ├── data/
│   │   └── cv-data.ts   # Fallback-Daten (wenn keine JSON vorhanden)
│   ├── types/
│   │   └── cv.types.ts  # TypeScript Interfaces
│   ├── App.vue          # Haupt-Component mit Router
│   ├── main.ts          # Entry Point + Font Awesome Setup
│   └── vite-env.d.ts    # TypeScript Definitionen
├── .prettierrc          # Prettier Konfiguration
├── .prettierignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Technologie-Stack

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Typsicherheit
- **Vite** - Build Tool & Dev Server
- **Vue Router** - Client-side Routing
- **Font Awesome** - Icon Library
  - `@fortawesome/fontawesome-svg-core`
  - `@fortawesome/free-solid-svg-icons`
  - `@fortawesome/free-brands-svg-icons`
  - `@fortawesome/vue-fontawesome`
- **Prettier** - Code Formatter

## 🎨 Design-Prinzipien

- Klare, professionelle Struktur
- Responsive Design (Desktop & Mobile)
- Print-First Approach für PDF-Export
- Konsistente Icon-Nutzung
- Typsichere Datenverwaltung

## 📝 Lizenz

Frei verwendbar für private und kommerzielle Zwecke.

---

**Erstellt mit ❤️ und Vue 3**
