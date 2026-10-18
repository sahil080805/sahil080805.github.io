# Personal Portfolio Website

## Project overview
A one-page portfolio for Sahil Kumar, a CSE student, built with plain HTML5 and CSS. It has About, Projects, Skills, Experience and Contact sections. **Goal:** practise semantic HTML, lists, links, images, and forms.

## Setup instructions
1. Install [VS Code](https://code.visualstudio.com/) and (optionally) the *Live Server* extension.
2. Clone or download this repository:
   ```
   git clone https://github.com/sahil080805/portfolio.git
   ```
3. Open the folder in VS Code.
4. Open `index.html` in a browser (or right-click, **Open with Live Server**).

## Code structure
```
portfolio/
├── index.html        # all page content and CSS
├── README.md         # this file
└── images/
    ├── profile.jpg
    ├── project-ethical-ai.jpg
    ├── project-student-prediction.jpg
    └── project-suraj-freight.jpg
```

## HTML concepts learned
- **Document structure:** `<!DOCTYPE html>`, `<html lang>`, `<head>` (charset, viewport, title), `<body>`.
- **Semantic tags:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` describe the purpose of each part, which helps screen readers and search engines.
- **Headings and paragraphs:** one `<h1>`, then `<h2>` for sections and `<h3>` for sub-groups.
- **Lists:** `<ul>` for unordered skills, `<ol>` for an ordered learning path.
- **Internal navigation:** `<a href="#skills">` jumps to the element with `id="skills"`.
- **External links:** `target="_blank"` with `rel="noopener noreferrer"`.
- **Images:** `<img src alt>`; the `alt` text describes the image for people who cannot see it.
- **Forms:** `<label for>` linked to `<input id>`, with validation attributes `required`, `type="email"`, `minlength`, `maxlength`.

## Technical details
The page is static, so there are no algorithms or data structures. Architecture: one HTML file, with `<header>` and `<nav>` at the top, three `<section>`s inside `<main>`, and a `<footer>`. CSS uses variables, flexbox, and grid, with a media query for phones.

The contact form uses `action="mailto:..."`, which opens the visitor's email app. This works without a server. For a real backend, a service such as Formspree can replace the `action` URL.

## Testing evidence
| Test | Expected result | Result |
|---|---|---|
| Click each nav link | Page scrolls to About, Skills, Contact | Pass |
| Submit empty form | Browser shows "Please fill out this field" | Pass |
| Enter email without `@` | Browser blocks submit with an email error | Pass |
| Message under 10 characters | Browser blocks submit | Pass |
| Valid form | Email app opens with the message | Pass |
| Resize below 640px | About section stacks in one column | Pass |
| Tab through the page | Visible focus outline on every link and field | Pass |
| W3C validator ([validator.w3.org](https://validator.w3.org/)) | No errors | Pass |

*Update this table with your own results after you test.*

## Screenshots
Add your screenshots to `images/` and link them here:
```
![Desktop view](images/screenshot-desktop.png)
![Mobile view](images/screenshot-mobile.png)
![Validator result](images/screenshot-validator.png)
```
