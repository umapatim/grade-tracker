# Grade Tracker

A simple web app for tracking school grades. Works on any device with a browser — iPhone, MacBook, or PC.

**Live app:** https://umapatim.github.io/grade-tracker/

## Features

- **Quick grade entry** — date (defaults to today), subject, test type, and score
- **Auto-calculation** — converts raw scores to percentage and letter grade (A+ through F, plus/minus scale)
- **Recent grades** — color-coded table with delete capability
- **Reports** — overall GPA, per-subject averages, per-test-type averages, trend chart with subject filter
- **Cross-device sync** — grades sync between devices via Google Sheets
- **Offline support** — works without internet, queues changes and syncs when back online
- **Export/Import** — JSON backup and restore

## Grading Scale

| Grade | Range   | Grade | Range   |
|-------|---------|-------|---------|
| A+    | 97–100  | C+    | 77–79   |
| A     | 93–96   | C     | 73–76   |
| A-    | 90–92   | C-    | 70–72   |
| B+    | 87–89   | D+    | 67–69   |
| B     | 83–86   | D     | 63–66   |
| B-    | 80–82   | D-    | 60–62   |
|       |         | F     | 0–59    |

## Subjects

English, Writing, Algebra 2, Biology, Latin 2, Religion (9th grade)

## Test Types

Quiz, Test, Paper, Essay, Project, Exam, HW

## Setup

The app is a single HTML file — no server or installation needed.

### Basic (no sync)

Just open `index.html` in a browser. Grades are stored in the browser's localStorage.

### With sync (recommended)

Sync uses a Google Sheet as the backend so grades are shared across devices.

1. **Create a Google Sheet** at [sheets.google.com](https://sheets.google.com)
2. Go to **Extensions → Apps Script**
3. Paste the contents of `AppsScript.js` into the editor and save
4. Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployment URL
6. In `index.html`, set the `APPS_SCRIPT_URL` variable to your URL
7. Upload to GitHub Pages or open locally

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app (HTML + CSS + JS in one file) |
| `AppsScript.js` | Google Apps Script code for the Sheets sync backend |
| `README.md` | This file |

## iPhone Home Screen

To use as a standalone app on iPhone:

1. Open the URL in Safari
2. Tap the **Share** button
3. Tap **Add to Home Screen**

## Tech

- Single HTML file, no dependencies or build step
- localStorage for offline data persistence
- Google Apps Script + Sheets for cloud sync
- SVG charts rendered inline (no chart libraries)
- Mobile-responsive, 48px minimum tap targets
