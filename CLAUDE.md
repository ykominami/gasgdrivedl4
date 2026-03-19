# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Google Apps Script (GAS) project that serves as a web application for managing and retrieving bookmark/URL lists from Google Spreadsheets. It is written in TypeScript and compiled via webpack + `gas-webpack-plugin` for deployment via `clasp`.

## Commands

```bash
# Build (webpack + copy HTML/JSON to dist/)
npm run build

# Build in watch mode
npm run build:watch

# Push to Google Apps Script
npm run push

# Build and push in one step
npm run deploy
```

There are no automated tests. Manual testing is done by calling `testGetData`, `testDataX`, `testData2`, `testData3`, `testData4` as GAS functions directly from the Apps Script editor.

## Architecture

### Entry Point & GAS Global Exports

- `src/index.ts` — declares all GAS-exported global functions (`doGet`, `doPost`, `getData`, etc.)
- `src/Code.ts` — implements the exported GAS functions by delegating to `Webapp` and `Listapp`
- webpack bundles `src/index.ts` → `dist/bundle.js` using `gas-webpack-plugin`, which makes exported functions globally available in the GAS runtime

### Request Handling (`src/webapp.ts`)

`Webapp` handles all HTTP traffic:
- `doGetx` / `do_x` — routes GET requests by `cmd` query parameter:
  - `cmd=c` — fetches book/URL list data from a target spreadsheet and returns JSON or HTML
  - default — serves `zhome.html`
- `doPostx` / `do_post` — receives JSON POST body and writes it to a Google Spreadsheet

The base spreadsheet ID (`1KtGdnnpj8k_bkxfYITalK193nRlVXiN0o_YiASO5KNs`) is hardcoded in both `Webapp` and `Infox`. Sheet name `"ss2"` is used to look up a target spreadsheet ID for data retrieval.

### Data Layer

- `Infox` (`src/infox.ts`) — reads the index sheet (`ss2`) from the base spreadsheet and resolves a target spreadsheet ID by filtering rows matching `kind`, `year`, and `kind2` parameters
- `Booklist` (`src/booklist.ts`) — given an `Infox`, fetches values from the resolved target spreadsheet/sheet and serializes them as JSON or HTML
- `SpreadSheetx` (`src/spreadsheetx.ts`) — thin wrapper around `SpreadsheetApp` that opens a spreadsheet by ID or URL and caches `SSheet` instances
- `SSheet` (`src/ssheet.ts`) — wraps a single `GoogleAppsScript.Spreadsheet.Sheet`, handles data range fetching

### Application State / Config

- `Appenv` (`src/appenv.ts`) — holds hardcoded configuration: base spreadsheet URLs, folder IDs, bookmark sheet name (`URLS0`), and year-to-row-offset mappings. This is the primary place to update spreadsheet IDs and sheet names.
- `Listapp` (`src/listapp.ts`) — builds a bookmark `Item` list from `Appenv`, `Dayx` (today's date), `Infolistx`, and `BookmarkTable`

### Types

- `src/@types/Code.d.ts` — global type declarations: `StringOrNull`, `InfoParam`, `GASHtmlTextOutputType`, `AssocArray`, `DataRangex`
- `src/@types/type.d.ts` — declares `gas-webpack-plugin` module and `StringStringAssoc`/`StringSSA` types

### Build Output

webpack outputs `dist/bundle.js`. HTML files (`src/zhome.html`) and `src/appsscript.json` are copied to `dist/` by `cpx`. The `dist/` folder is what `clasp push` deploys.
