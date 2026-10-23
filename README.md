# BallotLocal

A React/Vite voter-resource website. Includes a city/state search and links to government voter-information resources. It does **not** have a live election data API or an address-specific ballot lookup. No AI API or paid API is required.

## Install

In VS Code, open this folder, then in PowerShell run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL Vite displays (normally http://localhost:5173).

## Production check

```powershell
npm.cmd run build
```

## Replacing an existing project

Back up your old folder. Copy the `src` folder, `index.html`, and `package.json` into your existing project, replacing the matching files. Run `npm.cmd install` and `npm.cmd run dev`. If Vite is already running, press Ctrl+C in its terminal before restarting.

## Data accuracy

This starter links to vote.gov and USA.gov. It deliberately does not display invented dates, candidates, polling places, or voter records. City/state is insufficient to identify a person's exact districts or polling place. To add verified live data, connect a suitable election-data provider or jurisdiction-specific official source, with address-level district matching and source timestamps.
