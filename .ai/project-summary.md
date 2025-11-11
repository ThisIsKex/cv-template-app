# Projekt-Zusammenfassung: Lebenslauf Vue App

## Projektübersicht

**Name**: CV Vue App  
**Typ**: Single Page Application (SPA)  
**Zweck**: Professionelle Lebenslauf-Anwendung mit PDF-Export-Funktionalität  
**Status**: Aktiv in Entwicklung  
**Framework**: Vue 3 + TypeScript + Vite

## Technische Architektur

### Frontend Stack
- **Vue 3** (Composition API mit `<script setup>`)
- **TypeScript** (Strict Mode)
- **Vite** (Build Tool & Dev Server)
- **Font Awesome** (Icons: Solid + Brands)

### Projektstruktur
```
cv/
├── public/                 # Statische Assets
│   ├── cv-data.json       # Exportierte CV-Daten (optional)
│   └── profile.jpg        # Profilbild
├── src/
│   ├── components/         # Vue Single File Components
│   │   ├── Header.vue      # Header mit Profilbild & Kontaktdaten
│   │   ├── Profile.vue     # Persönliches Profil/Zusammenfassung
│   │   ├── Experience.vue  # Berufserfahrung
│   │   ├── Education.vue   # Ausbildung
│   │   ├── Skills.vue      # Kenntnisse/Skills (Chips)
│   │   ├── Projects.vue    # Projekt-Portfolio
│   │   └── Interests.vue   # Interessen
│   ├── views/
│   │   ├── CVView.vue      # CV Ansicht (/)
│   │   └── EditorView.vue  # Editor (/edit)
│   ├── composables/
│   │   └── useCVData.ts    # CV-Daten State & JSON Loading
│   ├── router/
│   │   └── index.ts        # Vue Router Konfiguration
│   ├── data/
│   │   └── cv-data.ts      # Standard CV-Daten (Fallback)
│   ├── types/
│   │   └── cv.types.ts     # TypeScript Interfaces
│   ├── App.vue             # Root Component mit RouterView
│   ├── main.ts             # Entry Point + Router + Font Awesome
│   └── vite-env.d.ts       # Vue & Vite Type Definitions
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .prettierrc
└── README.md
```

## Datenmodell

### TypeScript Interfaces (src/types/cv.types.ts)

```typescript
PersonalInfo    // Name, Kontakt, Social Media, Profilbild
Experience      // Berufserfahrung (Title, Company, Period, Responsibilities)
Education       // Ausbildung (Degree, Institution, Period)
Project         // Projekte (Name, Description, Icon)
CVData          // Haupt-Interface (kombiniert alle Daten)
```

### Datenquelle
- **Standard-Daten**: `src/data/cv-data.ts` (Fallback)
- **JSON-Daten**: `public/cv-data.json` (wird automatisch geladen, falls vorhanden)
- **Composable**: `src/composables/useCVData.ts` - Lädt JSON oder Fallback
- **Bearbeitung**: Via Editor unter `/edit` oder manuell in JSON/TS

## Routing & Navigation

### Routes
- **`/`** - CV Ansicht (CVView.vue)
- **`/edit`** - Editor Interface (EditorView.vue)

### Router Setup
- Vue Router 4
- HTML5 History Mode
- Konfiguration in `src/router/index.ts`

## Design-System

### Farbschema
- **Primary**: `#0e5091` (Dunkelblau - Header & Überschriften)
- **Background**: `#fafafa` (Hellgrau)
- **White**: `#ffffff` (Sections)
- **Text**: `#333` (Dunkelgrau)
- **Chips**: `#e0e0e0` (Hellgrau für Skills)

### Typografie
- **Font Stack**: System Fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, etc.)
- **Header**: 2.5rem, center-aligned
- **Section Titles**: 20px, mit Bottom Border
- **Body**: 16px, line-height 1.6

### Layout
- **Desktop**: Max-width 900px, zentriert
- **Mobile**: Responsive, full-width
- **Print**: A4, margin 0 (Header full-width), Sections mit 1.5cm margins

## Komponenten-Architektur

### Component Pattern
- **Props-based**: Alle Components erhalten Daten via Props
- **Scoped Styles**: CSS ist pro Component isoliert
- **Type-safe Props**: TypeScript Interfaces für alle Props

### Component-Übersicht

| Component | Props | Beschreibung |
|-----------|-------|--------------|
| Header | `personalInfo: PersonalInfo` | Blauer Header mit Profilbild, Name, Kontakt, Social Links |
| Profile | `profile: string` | Persönliche Zusammenfassung |
| Experience | `experiences: Experience[]` | Liste der Berufserfahrungen |
| Education | `education: Education[]` | Ausbildungsstationen |
| Skills | `skills: string[]` | Skill-Chips |
| Projects | `projects: Project[]` | Projekt-Portfolio |
| Interests | `interests: string` | Interessen als Text |

### Views
- **CVView.vue** - Haupt-CV Ansicht, nutzt `useCVData` Composable
- **EditorView.vue** - Editor Interface mit Formularen für alle Sections

## CV Data Editor

### Features
- **Live Editing** - Alle CV-Sections bearbeitbar
- **JSON Export/Import** - Download & Upload von cv-data.json
- **LocalStorage** - Browser-basiertes Speichern & Laden
- **Dynamic Lists** - Items hinzufügen/entfernen
- **Responsive UI** - Funktioniert auf Desktop & Mobile

### Editor Sections
1. Persönliche Informationen (Name, Kontakt, Links, Profilbild)
2. Profil (Zusammenfassung)
3. Berufserfahrung (Dynamische Liste mit Verantwortlichkeiten)
4. Ausbildung (Dynamische Liste)
5. Kenntnisse (Dynamische Skill-Liste)
6. Projekte (Dynamische Liste mit Icon & Beschreibung)
7. Interessen (Text)

### Workflow
1. Besuche `/edit`
2. Bearbeite alle Felder
3. Klicke "JSON Export" → `cv-data.json` wird heruntergeladen
4. Lege `cv-data.json` im `public/` Ordner ab
5. Lade Seite neu → Daten werden automatisch geladen

### Print/PDF-Optimierung

### Techniken
1. **@media print** Rules in allen Components
2. **print-color-adjust: exact** für Farben (Header, Skill-Chips)
3. **@page { margin: 0; size: A4; }** für A4-Format
4. **page-break-inside: avoid** für Sections
5. **Margin-Management**: Header full-width, Content mit 1.5cm margins

### Print-Workflow
1. `Strg+P` / `Cmd+P` im Browser
2. "Hintergrundgrafiken" aktivieren
3. Als PDF speichern
4. Ergebnis: Professioneller, druckfertiger Lebenslauf

## Entwicklungsworkflow

### Commands
```bash
npm install        # Dependencies installieren
npm run dev        # Dev Server starten (Port 5173)
npm run build      # Production Build
npm run preview    # Preview des Builds
npm run format     # Code mit Prettier formatieren
```

### Hot Module Replacement (HMR)
- Vite bietet instant HMR
- Änderungen an Components, Styles, Data werden sofort sichtbar
- Kein Neuladen notwendig

### Type Checking
- TypeScript Strict Mode aktiv
- Vue Language Features (Volar) für IDE-Support
- Type-safe Props & Data

### Code Formatting
- Prettier für konsistente Formatierung
- Double Quotes
- 2 Spaces Indentation
- 100 Zeichen Zeilenbreite

## Implementierte Features

✅ **CV Editor** - Vollständiger Editor unter `/edit` mit allen Sections  
✅ **JSON Export/Import** - Download & Upload von CV-Daten  
✅ **LocalStorage** - Browser-basiertes Speichern & Laden  
✅ **Automatisches JSON Loading** - `public/cv-data.json` wird automatisch geladen  
✅ **Dynamische Listen** - Items für Experience, Education, Skills, Projects hinzufügen/entfernen  
✅ **Responsive Design** - Funktioniert auf Desktop & Mobile  
✅ **Print-Optimierung** - Perfektes PDF-Layout mit Farberhaltung  
✅ **Font Awesome Icons** - Professionelle Icon-Integration  
✅ **Vue Router** - Navigation zwischen CV und Editor  
✅ **TypeScript** - Vollständig typsicher  
✅ **Prettier** - Konsistente Code-Formatierung

## Anpassungspunkte
1. **Farben**: Suche nach `#0e5091` in allen .vue Dateien
2. **Icons**: `src/main.ts` - Font Awesome Icon Library
3. **Layout**: `src/App.vue` - Global Styles & @page Rules
4. **Daten**: `src/data/cv-data.ts` - Alle persönlichen Informationen
5. **Types**: `src/types/cv.types.ts` - Datenmodell erweitern

## Wichtige Dateien für Agents

### Zu bearbeiten durch Benutzer
- **Via Editor**: `http://localhost:5173/edit` - Empfohlene Methode
- `public/cv-data.json` - Exportierte Daten (wird automatisch geladen)
- `src/data/cv-data.ts` - Fallback-Daten (Standard-Template)
- `public/profile.jpg` - Profilbild

### Zu bearbeiten für Styling
- `src/components/*.vue` - Component-spezifische Styles (Scoped)
- `src/App.vue` - Global Styles & Print Rules

### Zu bearbeiten für Funktionalität
- `src/types/cv.types.ts` - Datenmodell erweitern
- `src/main.ts` - Font Awesome Icons hinzufügen
- `src/components/*.vue` - Component-Logik
- `src/views/EditorView.vue` - Editor-Funktionen
- `src/composables/useCVData.ts` - Daten-Loading-Logik

### Zu bearbeiten für Build/Config
- `package.json` - Dependencies
- `vite.config.ts` - Vite Konfiguration
- `tsconfig.json` - TypeScript Einstellungen

## Dependencies

### Runtime
- `vue@^3.4.21`
- `vue-router@^4.3.0`
- `@fortawesome/fontawesome-svg-core@^6.5.1`
- `@fortawesome/free-solid-svg-icons@^6.5.1`
- `@fortawesome/free-brands-svg-icons@^6.5.1`
- `@fortawesome/vue-fontawesome@^3.0.5`

### Development
- `@vitejs/plugin-vue@^5.0.4`
- `typescript@^5.4.2`
- `vite@^5.1.6`
- `vue-tsc@^2.0.6`
- `prettier@^3.2.5`

## Best Practices

### Code-Stil
- Composition API mit `<script setup lang="ts">`
- Props mit TypeScript Interfaces
- Scoped Styles pro Component
- Keine Global State Management (nicht nötig bei diesem Umfang)

### Naming Conventions
- Components: PascalCase (Header.vue, Experience.vue)
- Props: camelCase (personalInfo, experiences)
- Types: PascalCase (PersonalInfo, CVData)
- Files: kebab-case oder PascalCase

### Print-Optimierung
- Immer `print-color-adjust: exact` für Hintergrundfarben
- `page-break-inside: avoid` für zusammenhängende Inhalte
- Separate Print-Styles in `@media print` Blöcken
- A4-Format explizit setzen mit `@page`

## Troubleshooting

### Problem: Farben werden nicht gedruckt
**Lösung**: `print-color-adjust: exact` und `-webkit-print-color-adjust: exact` hinzufügen

### Problem: Header hat Margins beim Drucken
**Lösung**: `@page { margin: 0 }` + Header mit `margin: 0 !important`

### Problem: TypeScript Errors nach npm install
**Lösung**: VS Code neu laden oder `vue.action.restartServer` Command ausführen

### Problem: HMR funktioniert nicht
**Lösung**: Dev Server neu starten (`npm run dev`)

## Kontakt & Support

Bei Fragen oder Problemen:
1. README.md konsultieren
2. TypeScript Errors in der IDE beachten
3. Browser Console für Runtime Errors checken
4. Vite Dev Server Logs prüfen

---

**Zuletzt aktualisiert**: 2025-11-11  
**Version**: 1.0.0  
**Lizenz**: Frei verwendbar