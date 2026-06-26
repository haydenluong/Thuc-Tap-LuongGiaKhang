# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You're my instructor for this task, not just a code generator.

Project: rebuild the demo site (https://demo.doanhnhandongthap.vn/) 
as Puck-editable React components, using Vite + Tailwind v4 + Puck.
Setup reference (use these exact install paths, not older versions):
- Vite: npm create vite@latest
- Tailwind v4 via Vite plugin: npm install tailwindcss @tailwindcss/vite
- Puck: npm i @puckeditor/core --save

Scope: 3 pages — homepage (/), Giới thiệu (/gioi-thieu), 
Hội viên (/hoi-vien). I'll attach the reference HTML/CSS for each 
page as I get it from my supervisor. Treat each file's CSS as 
ground truth — exact values, not approximations.

Hard requirement: every component must (1) look visually identical 
to the demo when dragged into the Puck editor, and (2) expose its 
dynamic content (text, images, links) as configurable Puck fields — 
not hardcoded.

I want to write most of the component code myself. Your job is to:
1. Set up boilerplate only (project structure, Puck config, 
   component shells, field/prop types) — not full JSX/Tailwind 
   per section unless I ask.
2. Walk me through each section before I code it: what the original 
   CSS does, and the matching Tailwind classes/values.
3. Explain spacing/gaps with short real-life analogies — one per 
   gap, not a lecture.

Flag anything without a direct Tailwind v4 equivalent (custom 
keyframes, backdrop-filter, asymmetric border-radius, etc.).

Go section by section, page by page, in the order the HTML 
appears. Wait for my confirmation before moving to the next section.

## Repository structure

`Doanhnhandongthap/` and `11_06_Components/` are two independent projects living side by side at the repo root (there's also an unrelated `db-tool/` CLI project in this repo, out of scope here). There is no root-level build — always `cd` into the specific project directory first.

## Doanhnhandongthap

Goal: rebuild https://demo.doanhnhandongthap.vn/ as Puck-editable components — 3 pages (`/`, `/gioi-thieu`, `/hoi-vien`), each section visually identical to the reference HTML/CSS and exposing its dynamic content as Puck fields rather than hardcoded values.

Commands (run from `Doanhnhandongthap/`):
```bash
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run preview  # vite preview
```

Stack specifics:
- Tailwind v4 is wired through `@tailwindcss/vite` (plugin in `vite.config.ts`), **not** a `tailwind.config.js` + PostCSS setup. `src/index.css` is just `@import "tailwindcss";`.
- Puck package is `@puckeditor/core` — note `@measured/puck` is the same project under its old, now-deprecated name; don't reintroduce it.

Architecture — two-file-per-component split, intentionally kept separate:
- `src/blocks/<Name>/<Name>.tsx` — plain presentational component. Default export, typed props, **no Puck imports**. This is the only file that should contain Tailwind markup/layout.
- `src/puck.config.tsx` — single root registry. For each block, defines `label` (Vietnamese, shown in the Puck sidebar), `fields` (editor input shape), `defaultProps` (seeded from the real reference content, not placeholders), and `render: (props) => <Block {...props} />`. Also owns `categoryGroups` (sidebar grouping) and `root.render` (page-level wrapper).

When adding a new block: create the component file first (props in, JSX out), then register it in `puck.config.tsx` — never put `fields`/`defaultProps` inside the component file itself.

Known field-type gotchas:
- A Puck `richtext` field's value is auto-wrapped by `@puckeditor/core` into a `<RichTextRender>` React element before your component's `render` is called (see `use-richtext-props.tsx`) — by the time the component sees the prop, it's already a `ReactNode`, not a raw HTML string. Render it directly as `{prop}`; do **not** use `dangerouslySetInnerHTML`, since assigning a React element to `__html` gets coerced to the string `"[object Object]"`. Type the prop as `ReactNode`, not `string`. (This is the opposite of `@measured/puck`'s older behavior — don't follow guidance written for that package.)
- Tailwind v4 has no utility for stacking multiple comma-separated `background-image` layers (e.g. photo + gradient overlay) — use an inline `style` prop for that specific rule rather than forcing it into an arbitrary-value class.

`App.tsx` is wired up via `react-router-dom`'s `BrowserRouter`: each of the 3 pages has a public route and an `/editor` sibling route (`/`, `/editor`; `/gioi-thieu`, `/gioi-thieu/editor`; `/hoi-vien`, `/hoi-vien/editor`), each with its own `localStorage` key (`puck-data`, `puck-data-gioi-thieu`, `puck-data-hoi-vien`) so editing one page doesn't touch another's saved data. Homepage seeds with 8 sections (`Hero` through `ContactCta`); `/gioi-thieu` currently seeds with only `IntroSection`, and `/hoi-vien` with only `MemberSection` — both pages still have more sections to build out as reference HTML/CSS arrives for them.

## 11_06_Components

Plain JSX (not TypeScript), not wired into a build of its own — treat `admin-puck-config.jsx` as a reference for an alternative Puck config shape (single object with `label`/`fields`/`defaultProps`/`render` per component, plus `categoryGroups` and `root`), which is the shape `Doanhnhandongthap/src/puck.config.tsx` was modeled after.
