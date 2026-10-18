# Week 2 CSS — Styled Portfolio Website

## Project overview
A responsive personal portfolio website presenting Sahil Kumar's profile, projects, technical skills, experience, and contact options.

## Technology
- HTML5 for semantic page structure
- External CSS3 stylesheet (`style.css`)
- Google Fonts (Poppins)
- CSS custom properties for the color system
- CSS Grid and Flexbox for layouts
- Media queries for tablet/mobile responsiveness
- Hover, focus, transition, and reduced-motion states

## Setup
1. Keep `index.html` and `style.css` in the same repository root.
2. Keep the existing `images/` folder and its image files.
3. Open `index.html` in a browser, or visit the deployed GitHub Pages site.
4. If using Google Fonts, an internet connection is needed to load Poppins; the page falls back to sans-serif.

## CSS concepts demonstrated
- Element, class, ID, pseudo-class and pseudo-element selectors
- CSS variables and a consistent purple/pink color palette
- Box model with `box-sizing`, margin, padding and borders
- Sticky positioning for the header and focus outlines for keyboard accessibility
- Grid for project/skills cards; Flexbox for navigation and chips
- Hover transitions for links, buttons and cards
- Responsive breakpoints at 900px, 700px and 420px
- `prefers-reduced-motion` accessibility support

## Project structure
```text
/
├── index.html
├── style.css
├── README.md
├── images/
└── screenshots/
```

## Testing checklist
- [ ] Desktop layout checked
- [ ] Mobile layout checked at 420px and 700px widths
- [ ] Navigation links and buttons tested
- [ ] Hover/focus effects tested
- [ ] Images load correctly
- [ ] W3C HTML Checker run after publishing
- [ ] Desktop/mobile screenshots visible in README

## Screenshots
Add actual screenshots of the running portfolio to `screenshots/` and embed them here using the correct filenames.


## Responsive and interactive enhancements
- Responsive layouts for desktop, tablet, and small mobile screens (including 375px widths).
- Accessible collapsible mobile navigation with Escape-key support.
- Light/dark theme toggle that attempts to remember the selected theme in the browser.
- Scroll progress indicator, back-to-top control, and reduced-motion-aware reveal effects.
- Improved hover/focus states, flexible project grids, responsive typography, and contact form validation.
- SEO description and Open Graph metadata.
- Contact form uses a `mailto:` fallback; a real backend is needed for reliable message delivery without an email app.

### Files
- `index.html` — semantic portfolio markup and metadata.
- `style.css` — external styles, responsive breakpoints, themes, hover/focus states.
- `script.js` — mobile menu, theme switch, scroll progress, reveal effects, back-to-top, and mailto form handling.

### Before publishing
Keep your existing `images/` assets in the same repository location. Upload all three code files to the repository root, then check the published site on desktop and mobile. Confirm every image path and external link works. This package has not been browser-tested or independently validated by the W3C validator.
