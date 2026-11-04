# 🏗️ Project Architecture Overview

## 🎯 Purpose

This project establishes a **scalable Angular architecture** designed to support multiple **application types** (e-commerce, blog, landing pages, etc.), **categories** (e.g. jewelry, furniture, grocery), and **visual themes or variants** (e.g. Luxury, Minimal).
It's optimized for **code reuse**, **dynamic theming**, and **future device extension** (mobile via Ionic, desktop view Electron).

---

## ⚙️ Core Technologies

| Area               | Technology                                            |
| ------------------ | ----------------------------------------------------- |
| Frontend Framework | **Angular 19+ (Standalone Components)**               |
| Styling            | **TailwindCSS** + SCSS customization                  |
| State & Data       | Angular Services, RxJs, Theme Configs                 |
| Package Management | **npm** (future: pnpm support optional)               |
| Multi-platform     | Web (Angular) -> Mobile (Ionic) -> Desktop (Electron) |
| Theming            | config-drive view `ThemeService`                      |
| Layout Composition | Atomic UI + Reusable Layouts + Page Assembly          |

---

# 🧠 Architectural Layers

### 1. **Core**

Contains the fundamental building blocks of the app:

- **Services** (ThemeService, ApiService, StorageService, etc.)
- **Guards, interceptors, models, utils**
- **Config files** (environment setup, constants)

**Example:**

src/app/core/
├── config/
├── models/
├── services/
│ ├── theme.service.ts
│ ├── api.service.ts
│ └── storage.service.ts
└── utils/

### 2. **Shared (Atomic UI)**

Reusable visual and logical components following **Atomic Design**:

- `atoms/` - smallest UI pieces (buttons, inputs, icons)
- `molecules` - composed UI (cards, navbars)
- `organisms` - structural UI (carousels, hero-sections)

**Example:**

src/app/shared/ui/
├── atoms/
├── molecules/
├── organisms/
└── index.ts

### 3. **Layouts**

High-level **structural templates** that define page organization:

- `full-screen\split-view`
- `full-screen\single-panel`
- `hero-section`

Each layout accepts dynamic content slots (e.g., header, footer, main).

**Example:**

src/app/layouts/
├── full-screen/single-panel/
└── full-screen/split-view/

### 4. **Pages**

Logical combinations of layouts + shared components.
These are **predefined structures** that can be reused in any theme (e.g., Home, About, Cart).

**Example:**

src/app/pages/
├── home/
├── about/
├── cart/
└── checkout/

### 5. **Themes**

Organized by **domain -> category -> variant**

Each theme defines its **visual identity**, **data content**, and **layout composition**.

**Example:**

src/app/themes/
├── ecommerce/
│ └── jewelry/
│ ├── luxury/
│ │ └── theme.config.ts
│ └── minimal/
│ └── theme.config.ts
├── blog/
│ └── editorial/
│ └── theme.config.ts

Each `theme.config.ts` file defines:

- `routes` -> mapped to pages
- `styles` -> CSS variables (colors, fonts)
- `content` -> dynamic page data

**Example theme config:**

```ts
export const JewelryLuxuryTheme = {
  name: 'Luxury Jewelry',
  category: 'jewelry',
  routes: [
    { path: '', component: HomePageComponent },
    { path: '**', redirectTo: '' },
  ],
  styles: {
    '--primary-color': '#D4AF37',
    '--bg-color': '#fffaf0',
    '--text-color': '#222',
  },
  content: {
    hero: {
      title: 'Timeless Elegance',
      subtitle: 'Discover jewelry that lasts a lifetime',
      ctaLabel: 'Shop Collection',
    },
  },
};
```
