# iPortfolio → Next.js clone — specification

This document describes the **iPortfolio** one-page portfolio template so you can reproduce it faithfully in **Next.js**. It is derived from the published demo and the upstream HTML/CSS/JS in the ThemeWagon GitHub repository.

| Resource | URL |
|----------|-----|
| Live demo | [themewagon.github.io/iPortfolio](https://themewagon.github.io/iPortfolio/) |
| Source repository | [github.com/themewagon/iPortfolio](https://github.com/themewagon/iPortfolio) |
| Original product page | [bootstrapmade.com — iPortfolio](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) |
| License | [BootstrapMade license](https://bootstrapmade.com/license/) — keep footer credits unless you have rights to remove them |

**Template metadata (from source):** updated **Jun 29, 2024**, **Bootstrap v5.3.3**, author **BootstrapMade**, distributed by **ThemeWagon**.

---

## 1. Project type and pages

- **Primary experience:** single scrolling landing page (`index.html` → one Next.js route, e.g. `app/page.tsx`).
- **Additional static HTML in the repo** (optional for v1): `portfolio-details.html`, `service-details.html`, `starter-page.html`. The home page links to `portfolio-details.html` from each portfolio card’s “details” icon and to `service-details.html` from service titles.
- **Contact:** form posts to `forms/contact.php` with client-side validation via `assets/vendor/php-email-form/validate.js`. In Next.js you will replace this with an **API Route** / **Server Action** / third-party form backend.

---

## 2. Tech stack (original)

### 2.1 Core

- **HTML5**, **Bootstrap 5.3.3** (grid, utilities, forms, components).
- **Google Fonts:** [Roboto](https://fonts.google.com/specimen/Roboto), [Poppins](https://fonts.google.com/specimen/Poppins), [Raleway](https://fonts.google.com/specimen/Raleway) — loaded via `fonts.googleapis.com` with `preconnect` to `fonts.gstatic.com`.

### 2.2 Vendor CSS (`assets/vendor/`)

| Path | Purpose |
|------|---------|
| `bootstrap/css/bootstrap.min.css` | Layout and components |
| `bootstrap-icons/bootstrap-icons.css` | Icons (sidebar, stats, portfolio actions, etc.) |
| `aos/aos.css` | Animate-on-scroll |
| `glightbox/css/glightbox.min.css` | Image/lightbox gallery |
| `swiper/swiper-bundle.min.css` | Testimonials carousel |

### 2.3 Main stylesheet

- `assets/css/main.css` — theme overrides, sidebar, section spacing, portfolio hover states, skills progress styling, etc.

### 2.4 Vendor JS (`assets/vendor/`)

| Script | Role |
|--------|------|
| `bootstrap/js/bootstrap.bundle.min.js` | Bootstrap JS (dropdowns, etc.) |
| `php-email-form/validate.js` | AJAX submit + loading/error/success UI for contact form |
| `aos/aos.js` | `AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false })` |
| `typed.js/typed.umd.js` | Hero rotating job titles |
| `purecounter/purecounter_vanilla.js` | Animated stat numbers |
| `waypoints/noframework.waypoints.js` | Triggers skill bar width animation when section enters view |
| `glightbox/js/glightbox.min.js` | `GLightbox({ selector: '.glightbox' })` with `data-gallery` grouping |
| `imagesloaded/imagesloaded.pkgd.min.js` | Waits for images before Isotope layout |
| `isotope-layout/isotope.pkgd.min.js` | Masonry portfolio grid + category filters |
| `swiper/swiper-bundle.min.js` | Testimonials slider |

### 2.5 Application JS

- `assets/js/main.js` — header toggle, mobile nav, preloader removal, scroll-to-top, AOS init, Typed, PureCounter, Waypoints for skills, GLightbox, Isotope, Swiper, hash scroll offset, **nav scrollspy**.

---

## 3. Global layout

### 3.1 Document

- `<body class="index-page">`.
- Main content wrapper: `<main class="main">` wrapping all sections.

### 3.2 Header / sidebar (`<header id="header" class="header dark-background d-flex flex-column">`)

Fixed **left sidebar** on large screens; on smaller viewports it becomes an overlay toggled by **`.header-toggle`** (`bi-list` / `bi-x`).

Contains:

1. **Profile image** — `assets/img/my-profile-img.jpg`, rounded.
2. **Logo / name** — `.logo` with `.sitename` (e.g. “Alex Smith”); optional image logo (commented in HTML).
3. **Social links** — `.social-links` with classes: `twitter`, `facebook`, `instagram`, `google-plus` (uses Skype icon in template), `linkedin`. Icons: Bootstrap Icons.
4. **Nav** — `#navmenu.navmenu`, vertical list with icons (`bi-house`, `bi-person`, etc.).

**Nav items (hash targets):**

| Label | `href` |
|-------|--------|
| Home | `#hero` |
| About | `#about` |
| Resume | `#resume` |
| Portfolio | `#portfolio` |
| Services | `#services` |
| Dropdown | `#` (nested UL; demo links are placeholders) |
| Contact | `#contact` |

**Behaviors to replicate:**

- Clicking **`.header-toggle`** toggles `#header.header-show` and swaps list/close icon.
- Clicking any `#navmenu a` closes the mobile menu if open.
- **`.navmenu .toggle-dropdown`** toggles nested menus (`.active` on parent, `.dropdown-active` on sibling `ul`) — `preventDefault` + `stopImmediatePropagation`.
- **Scrollspy:** on scroll/load, the nav link whose `hash` section is in view (logic uses `window.scrollY + 200` vs `section.offsetTop` / height) gets `.active`; others lose it.
- **Hash on load:** if `location.hash` matches a section, scroll after short timeout accounting for `scrollMarginTop`.

### 3.3 Footer (`<footer id="footer" class="footer position-relative light-background">`)

- Copyright line with **`.sitename`** (“iPortfolio” in template).
- Credits: BootstrapMade + ThemeWagon (license requires keeping attribution unless you comply with their terms).

### 3.4 Chrome

- **Scroll top:** `<a id="scroll-top" class="scroll-top ...">` — visible after ~100px scroll; smooth scroll to top.
- **Preloader:** `#preloader` — removed on `window` `load`.

---

## 4. Sections (in DOM order)

Each major block is a `<section>` with an **`id`** used for navigation. Many blocks use **`data-aos`** and **`data-aos-delay`** for entrance animation.

### 4.1 Hero — `#hero`

- Classes: `hero section dark-background`.
- Full-width **background image:** `assets/img/hero-bg.jpg` (`data-aos="fade-in"` on img).
- Container: `data-aos="fade-up" data-aos-delay="100"`.
- **H2:** person name.
- **Subtitle:** “I'm ” + **Typed.js** target: `<span class="typed" data-typed-items="Designer, Developer, Freelancer, Photographer">` plus cursor spans.
- **Typed config (from `main.js`):** `loop: true`, `typeSpeed: 100`, `backSpeed: 50`, `backDelay: 2000`.

### 4.2 About — `#about`

- Classes: `about section`.
- **Section title** pattern (reused everywhere): `.container.section-title` with `h2` + intro `p`.
- Two-column row: photo (`assets/img/my-profile-img.jpg`) + **`.content`**:
  - `h2` tagline (e.g. “UI/UX Designer & Web Developer.”).
  - Italic lead paragraph.
  - Two `ul` columns of facts (Birthday, Website, Phone, City / Age, Degree, Email, Freelance) with `bi-chevron-right` icons.
  - Closing paragraph.

### 4.3 Stats — `#stats`

- Classes: `stats section`.
- Four columns (`col-lg-3 col-md-6`). Each **`.stats-item`** has:
  - Icon (`bi-emoji-smile`, `bi-journal-richtext`, `bi-headset`, `bi-people`).
  - **`<span class="purecounter">`** with `data-purecounter-start`, `data-purecounter-end`, `data-purecounter-duration`.
  - **End values in template:** `232`, `521`, `1453`, `32`.
  - `p` with **strong** label + span subtitle.

### 4.4 Skills — `#skills`

- Classes: `skills section light-background`.
- **`.row.skills-content.skills-animation`** — Waypoint at **80%** from top animates **`.progress-bar`** widths from `aria-valuenow` (bars start at 0 width in CSS until triggered).
- Six skills in two `col-lg-6` columns; each item: `.progress` > `.skill` (name + **`.val`** %) > `.progress-bar-wrap` > `.progress-bar` with `role="progressbar"` and `aria-valuenow` / min / max.

**Template values:** HTML 100%, CSS 90%, JavaScript 75%, PHP 80%, WordPress/CMS 90%, Photoshop 55%.

### 4.5 Resume — `#resume`

- Classes: `resume section`.
- **Two columns** (`col-lg-6`):
  - **Left:** `h3.resume-title` “Sumary” (typo in source), **`.resume-item.pb-0`** summary card (name, italic bio, `ul` contact lines); then `h3` “Education” + multiple **`.resume-item`** (degree `h4`, years `h5`, school `em`, body `p`).
  - **Right:** `h3.resume-title` “Professional Experience” + **`.resume-item`** entries (`h4` job, `h5` dates, `em` employer, `ul` bullets).

### 4.6 Portfolio — `#portfolio`

- Classes: `portfolio section light-background`.
- Wrapper: **`.isotope-layout`** with attributes:
  - `data-default-filter="*"`
  - `data-layout="masonry"`
  - `data-sort="original-order"`
- **Filters:** `ul.portfolio-filters.isotope-filters` — `li` elements with `data-filter` (`*`, `.filter-app`, `.filter-product`, `.filter-branding`, `.filter-books`); active filter has **`.filter-active`**.
- **Grid:** `.row.gy-4.isotope-container` with items **`.portfolio-item.isotope-item`** + filter class (e.g. `filter-app`).
- Each item: **`.portfolio-content.h-100`** > `img` + **`.portfolio-info`** overlay with `h4`, `p`, and two links:
  - **Preview:** `a.glightbox.preview-link` — `href` to full image, `title`, `data-gallery` per category (e.g. `portfolio-gallery-app`).
  - **Details:** `a.details-link` → `portfolio-details.html`.

**Images (under `assets/img/portfolio/`):** `app-1.jpg` … `app-3.jpg`, `product-1.jpg` … `product-3.jpg`, `branding-1.jpg` … `branding-3.jpg`, `books-1.jpg` … `books-3.jpg`.

### 4.7 Services — `#services`

- Classes: `services section`.
- Grid of **`.service-item.d-flex`** (`col-lg-4 col-md-6`), staggered `data-aos-delay`.
- Each: **`.icon`** (Bootstrap Icon) + title `a.stretched-link` to `service-details.html` + **`.description`**.

**Icons used in template:** `bi-briefcase`, `bi-card-checklist`, `bi-bar-chart`, `bi-binoculars`, `bi-brightness-high`, `bi-calendar4-week`.

### 4.8 Testimonials — `#testimonials`

- Section title + **Swiper** root with class **`init-swiper`**.
- Hidden **`.swiper-config`** element containing **JSON** config (trimmed text, `JSON.parse` in `main.js`). Reference configuration from the repo:

```json
{
  "loop": true,
  "speed": 600,
  "autoplay": { "delay": 5000 },
  "slidesPerView": "auto",
  "pagination": {
    "el": ".swiper-pagination",
    "type": "bullets",
    "clickable": true
  },
  "breakpoints": {
    "320": { "slidesPerView": 1, "spaceBetween": 40 },
    "1200": { "slidesPerView": 3, "spaceBetween": 1 }
  }
}
```

- Slides: testimonial text, optional image, name `h3`, role `h4`. Template includes multiple named personas (Saul Goodman, Sara Wilsson, etc.).

### 4.9 Contact — `#contact`

- Two columns:
  - **Info + map:** **`.info-wrap`** with **`.info-item.d-flex`** rows (Address, Call, Email) and embedded **Google Maps iframe** (example embed in source points to NYC area).
  - **Form:** `form.php-email-form` → `action="forms/contact.php" method="post"`. Fields: name, email, subject, message (all required). States: **`.loading`**, **`.error-message`**, **`.sent-message`**. Submit button text: “Send Message”.

---

## 5. Assets checklist (`assets/img/`)

| File | Usage |
|------|--------|
| `favicon.png`, `apple-touch-icon.png` | Head |
| `my-profile-img.jpg` | Header + About |
| `hero-bg.jpg` | Hero background |
| `portfolio/*.jpg` | Portfolio grid (12 images) |

Copy these from the [iPortfolio repository](https://github.com/themewagon/iPortfolio) or replace with your own (keep aspect ratios similar for layout parity).

---

## 6. Content model (suggested for Next.js)

Define typed data (JSON, CMS, or constants) for:

- **Site:** `sitename`, social URLs, footer name.
- **Hero:** name, `typedItems[]`, `heroImage`.
- **About:** title, paragraphs, `facts[]` (label, value).
- **Stats:** `{ icon, end, label, subtitle }[]`.
- **Skills:** `{ name, percent }[]`.
- **Resume:** `summary`, `education[]`, `experience[]`.
- **Portfolio:** `{ title, excerpt, image, category, galleryGroup, detailSlug? }[]`.
- **Services:** `{ icon, title, href, description }[]`.
- **Testimonials:** `{ quote, name, role, image? }[]`.
- **Contact:** address, phone, email, mapEmbedUrl.

This mirrors the template structure and makes the page easy to edit without touching layout code.

---

## 7. Next.js implementation notes

### 7.1 Styling

- **Option A:** Import `main.css` + vendor CSS in `app/layout.tsx` and add Bootstrap via `bootstrap` npm package.
- **Option B:** Rebuild layout in **Tailwind** using this spec as the visual reference (more work, no license conflict with copying CSS if you reimplement).

Keep **Bootstrap Icons** (`bootstrap-icons` on npm or SVG sprites).

### 7.2 Client components

Libraries that touch `window` / layout should run in **`'use client'`** components or via **`dynamic(..., { ssr: false })`**:

- AOS — call `AOS.init()` after mount / on `load`; refresh when Isotope filter changes (template calls `aosInit()` again after filter).
- Typed.js, Swiper, GLightbox, Isotope + imagesLoaded, PureCounter, Waypoints.

Alternatively replace with React-first libs: **Framer Motion** (AOS), **react-typed** or custom typewriter, **swiper/react**, **yet-another-react-lightbox**, **Masonry** layout with state for filters, **Intersection Observer** for counters and skill bars.

### 7.3 Routing

- Main page: `/` with hash sections `#hero`, `#about`, etc. Use `<Link href="/#about">` or plain `<a href="#about">` for in-page jumps; mirror scroll-margin and hash-offset behavior from `main.js`.
- Optional dynamic routes: `/portfolio/[slug]` instead of `portfolio-details.html`.

### 7.4 Contact form

- Replace PHP with `POST` to **`/api/contact`** (Resend, SendGrid, Nodemailer, etc.) or a server action; reproduce UX: loading, inline error, success message.

### 7.5 SEO and metadata

- Set `metadata` / `viewport` in the App Router; replace empty `description` and `keywords` from the original with real values.

### 7.6 Performance

- Use `next/image` for portfolio and profile images (requires width/height or `fill` + sizes).
- Lazy-load Swiper, GLightbox, and map iframe if not in initial viewport.

---

## 8. Fidelity checklist

Use this when comparing your Next.js build to the [live demo](https://themewagon.github.io/iPortfolio/):

- [ ] Left sidebar layout on desktop; collapsible overlay on small screens.
- [ ] Nav scrollspy and correct `.active` state.
- [ ] Hero typed rotation matches speed/loop behavior.
- [ ] Stats count up when visible (PureCounter or equivalent).
- [ ] Skill bars animate once when section scrolls into view.
- [ ] Portfolio masonry + filter tabs; lightbox groups by `data-gallery`.
- [ ] Testimonials Swiper breakpoints (1 vs 3 slides) and autoplay.
- [ ] Contact form states (loading / error / success).
- [ ] Scroll-to-top button and preloader removal on load.
- [ ] Footer attribution per license.

---

## 9. Source files to read when cloning behavior

In the GitHub repo, prioritize:

- `index.html` — structure, classes, `data-*` attributes.
- `assets/css/main.css` — all custom visuals.
- `assets/js/main.js` — interaction spec (this document mirrors it).

---

*Document generated for local Next.js development. Template rights belong to BootstrapMade / ThemeWagon; comply with their license before removing branding or redistributing.*
