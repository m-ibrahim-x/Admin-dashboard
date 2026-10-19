# Design System: Auren E-Commerce Admin Panel

> **Authoritative UI Reference & Style Guide**  
> **Source of Truth**: `src/pages/Dashboard.jsx`, `src/components/pages/Dashboard/`, `src/index.css`, and `src/components/ui/`.  
> **Target Framework**: React 19 + Tailwind CSS v4 (`@tailwindcss/vite` 4.3.3) + Lucide React.

---

## 1. Overview & Architectural Context

This document establishes the verified design system for the **Auren E-Commerce Admin Panel**. It is derived entirely by reverse-engineering the working production dashboard and its shared UI components.

### Source File Locations
- **Global Tokens & Theme Setup**: `src/index.css`
- **Dashboard Root Page**: `src/pages/Dashboard.jsx`
- **Dashboard Feature Components**: `src/components/pages/Dashboard/`
  - `DashboardOverview.jsx` (Hero banner, primary metric cards)
  - `DashboardAnalytics.jsx` (Order status breakdown, fulfillment progress)
  - `AnalyticsChart.jsx` (Interactive Recharts area chart)
  - `DashboardActivity.jsx` (Two-column activity wrapper)
  - `RecentOrders.jsx` (Order feed list items, status pills)
  - `TopProducts.jsx` (Product leaderboards, ranking indicators)
- **App Shell & Layout**: `src/layout/DashboardLayout.jsx`, `src/components/Header.jsx`, `src/components/Sidebar.jsx`
- **Shared UI Library**: `src/components/ui/` (`Button.jsx`, `StatCard.jsx`, `Input.jsx`, `DataTable.jsx`, `ProductCard.jsx`)
- **Feedback & Fallbacks**: `src/skeleton/pages/Dashbord/`, `src/error/pages/Dashboard/`

---

## A. Typography

### 1. Font Family

| Token / Variable | Configured Value | Source | Implementation Status |
| :--- | :--- | :--- | :--- |
| `--font-sans` | `"Plus Jakarta Sans", sans-serif` | `src/index.css` (`@theme`) | Applied globally to `html { font-family: var(--font-sans); }`. |
| Fallback | `sans-serif` | System fallback | **Note**: No Google Fonts or external webfont link is currently present in `index.html`. Browsers without "Plus Jakarta Sans" locally installed will fall back to the system sans-serif. |

### 2. Typography Scale & Hierarchy

| Role | Font Size | Weight | Tracking / Case | Tailwind Class | Verified Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page / Banner Title** | `18px` (mobile)<br>`20px` (sm)<br>`24px` (lg) | Bold (`700`) | `tracking-tight` | `text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-text-primary` | Hero Overview banner heading (`DashboardOverview.jsx`) |
| **Section Heading** | `18px` (mobile)<br>`20px` (sm) | Bold (`700`) | `tracking-tight` | `text-lg sm:text-xl font-bold tracking-tight text-text-primary` (or `text-brand-active`) | Card headers (`AnalyticsChart`, `RecentOrders`, `TopProducts`, `DashboardAnalytics`) |
| **Subsection / Card Title** | `14px` (mobile)<br>`16px` (sm) | Bold (`700`) | `tracking-tight` | `text-sm sm:text-base font-bold tracking-tight text-text-primary` | Customer names in orders, product titles in leaderboards |
| **Eyebrow / Section Category** | `11px` | Bold (`700`) | `uppercase tracking-[0.16em]` | `text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active` | Category tag above titles in all dashboard sections and charts |
| **Navigation Section Label** | `10px` | Bold (`700`) | `uppercase tracking-wider` | `text-[10px] font-bold uppercase tracking-wider text-text-secondary/70` | Sidebar category headers ("ACCOUNT", "COMMERCE") |
| **Brand Subtitle** | `10px` (mobile)<br>`11px` (sm) | Semi-bold (`600`) | `uppercase tracking-[0.12em]` | `text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary` | Header brand lockup under "Auren." |
| **Banner Subtitle / Body** | `12px` (mobile)<br>`13px` (sm) | Normal (`400`) | Normal | `text-xs sm:text-[13px] text-text-secondary` | Section descriptions, order items breakdown, leaderboard metadata |
| **Standard Body Text** | `14px` | Medium (`500`) | Normal | `text-sm font-medium text-text-secondary` | Stat card title labels, table data cells, input labels |
| **Microcopy / Timestamps** | `11px` (mobile)<br>`12px` (sm) | Normal (`400`) | Normal | `text-[11px] sm:text-xs text-text-secondary/75` | Relative timestamps, secondary helper notes |
| **Hero Metric (Stat Card)** | `20px` (mobile)<br>`24px` (sm) | Bold (`700`) | Normal | `text-xl sm:text-2xl font-bold text-text-primary` | Primary metric in `DashboardOverview` StatCards |
| **Metric Value (Counters)** | `20px` (mobile)<br>`24px` (sm) | Bold (`700`) | `tabular-nums tracking-tight` | `text-xl sm:text-2xl font-bold tracking-tight tabular-nums text-text-primary` | Order Status total, Fulfillment counts |
| **Currency / Financial Value** | `14px`–`18px` | Bold (`700`) | `tabular-nums tracking-tight` | `text-base sm:text-lg font-bold tabular-nums text-text-primary` (or `text-brand-active`) | Order total prices, top product revenue |
| **Badge / Pill Label** | `10px`–`11px` | Bold (`700`) | `uppercase tracking-wider` | `text-[10px] sm:text-[11px] font-bold tracking-wider uppercase` | Fulfillment status pills, percentage tags |

### 3. Typography Reuse Rules
1. **Always pair an eyebrow with a section heading**: Precede major page and card headings with a `text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active` label.
2. **Always enforce `tabular-nums` on numbers**: Every metric, currency string, percentage, timestamp, and counter must include `tabular-nums` to prevent layout jitter.
3. **Always truncate single-line titles**: Use `truncate` on names, titles, and breadcrumbs, and `break-words` on values that might wrap on mobile devices.

---

## B. Colors

The project implements a centralized CSS Custom Property token architecture in `src/index.css`. Tailwind CSS v4 binds directly to these tokens via the `@theme` block.

### 1. Theme Color Tokens

| Token Variable | Tailwind Utility Name | Light Mode Value | Dark Mode Value | Intended Role & Verified Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--theme-bg-main` | `bg-bg-main`, `text-bg-main` | `#f8f8f6` | `#0d0e10` | Canvas background of the application; text color on solid brand badges. |
| `--theme-card-bg` | `bg-card-bg`, `border-card-bg` | `#ffffff` | `#161719` | Surface background for all cards, sidebar, header, tooltips, and elevated modals. |
| `--theme-input-bg` | `bg-input-bg` | `#f0f0ed` | `#1a1b1d` | Surface for search fields, form inputs, table header rows, and skeleton loaders. |
| `--theme-text-primary` | `text-text-primary` | `#1a1b1d` | `#f2f2f0` | Highest contrast text: headings, values, table cell text, and active labels. |
| `--theme-text-secondary` | `text-text-secondary` | `#5a5955` | `#c9c8c3` | Subtitles, body descriptions, icon glyphs, helper text, and secondary labels. |
| `--theme-brand-active` | `bg-brand-active`, `text-brand-active`, `border-brand-active` | `#b88322` | `#e3b158` | Warm golden amber. Primary brand accent: active tabs, hero buttons, focus rings, eyebrows. |
| `--theme-brand-hover` | `bg-brand-hover`, `text-brand-hover` | `#d9a441` | `#d9a441` | Bright golden amber. Interactive hover state for brand buttons, links, and scrollbar. |
| `--theme-active-bg` | `bg-active-bg` | `#fcf4e4` | `#332813` | Subtle golden tint. Background for active sidebar nav items, badge containers, and icon boxes. |
| `--theme-border-main` | `border-border-main`, `divide-border-main` | `#e5e5e0` | `#2a2b2e` | Default border color for cards, table dividers, header underline, and separators. |
| `--theme-disabled` | `bg-disabled`, `text-disabled` | `#d4d3ce` | `#3a3b3e` | Inactive or disabled button backgrounds and borders. |

### 2. Status & Semantic Feedback Tokens

| Semantic Token | Tailwind Utility Name | Light Mode Value | Dark Mode Value | Status Mapping in Dashboard |
| :--- | :--- | :--- | :--- | :--- |
| `--theme-status-success` | `text-status-success`, `bg-status-success` | `#10b981` | `#34d399` | "Delivered" orders, positive revenue growth trends, form valid checks. |
| `--theme-status-warning` | `text-status-warning`, `bg-status-warning` | `#f59e0b` | `#fbbf24` | "Pending" orders, processing notifications. |
| `--theme-status-info` | `text-status-info`, `bg-status-info` | `#3b82f6` | `#60a5fa` | "Processing", "Confirmed", and "Shipped" order states. |
| `--theme-status-danger` | `text-status-danger`, `bg-status-danger` | `#c6604f` | `#c6604f` | "Cancelled" orders, error banners, destructive action buttons. |

### 3. Established Opacity & Alpha Patterns

The dashboard relies on Tailwind v4 alpha modifiers for tinted backgrounds and subtle borders:
- **Badge & Status Tinted Backgrounds**: `bg-status-warning/10`, `bg-status-info/10`, `bg-status-success/10`, `bg-status-danger/10`, `bg-brand-active/10`
- **Soft Status Borders**: `border-status-warning/20`, `border-status-info/20`, `border-status-success/20`, `border-status-danger/20`, `border-brand-active/20`
- **Interactive Card Hover Accents**: `hover:border-brand-active/40`, `hover:border-brand-active/30`
- **Subdued Secondary Text**: `text-text-secondary/75`, `text-text-secondary/70`, `text-text-secondary/60`
- **Dividers & Subtle Tracks**: `bg-border-main/50`, `border-border-main/70`

### 4. Special Graphic Tokens
- **Text Selection**:
  ```css
  ::selection {
    background-color: var(--theme-brand-active);
    color: var(--theme-bg-main);
  }
  ```
- **Custom Scrollbars**:
  - Track: `var(--theme-bg-main)`
  - Thumb: `var(--theme-brand-active)` (hover: `var(--theme-brand-hover)`)
  - Width: `8px`, border radius: `9999px`
- **Chart Visual Tokens** (`AnalyticsChart.jsx`):
  - Area Fill Revenue: SVG Linear Gradient `var(--color-brand-active)` from `35%` opacity to `0%`
  - Area Fill Orders: SVG Linear Gradient `var(--color-status-success)` from `30%` opacity to `0%`
  - Grid: `var(--color-border-main)` with `strokeDasharray="3 3"`
  - X/Y Axis Stroke: `var(--color-text-secondary)` with `fontSize={12}`

---

## C. Section Heading Patterns

The dashboard implements two distinct heading patterns: the **Hero Page Header Banner** and the **Card / Section Header**.

### Pattern 1: Hero Page Header Banner (Primary)
Used at the top of the dashboard (`DashboardOverview.jsx`). Designed for page-level orientation and headline KPIs.

```jsx
<div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
  {/* Decorative Golden Swoop (Top-Right Graphic) */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 md:w-64 overflow-hidden select-none"
  >
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full object-cover" preserveAspectRatio="none">
      <path
        d="M 230 0 C 230 45, 275 80, 270 115 C 265 145, 190 155, 145 200 L 320 200 L 320 0 Z"
        fill="var(--theme-brand-active)"
        opacity="0.95"
      />
    </svg>
  </div>

  {/* Header Content Hierarchy */}
  <div className="relative z-10 flex flex-col gap-2.5">
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Brand Squircle Icon Container */}
      <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20">
        <LayoutGrid className="size-5 sm:size-6" strokeWidth={2} />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
          CATEGORY / CONTEXT EYEBROW
        </p>
        <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
          Page Title or Real-time Health
        </h1>
      </div>
    </div>

    <p className="max-w-xl text-xs sm:text-[13px] text-text-secondary">
      Short descriptive sentence contextualizing the page purpose.
    </p>
  </div>
</div>
```

### Pattern 2: Secondary Section & Card Heading
Used inside analytical cards, lists, and tables (`DashboardAnalytics.jsx`, `RecentOrders.jsx`, `TopProducts.jsx`, `AnalyticsChart.jsx`).

#### Variant A: With Icon Container & Action Counter (e.g. Recent Orders / Store Analytics)
```jsx
<div className="flex items-center justify-between gap-3 mb-4">
  <div className="flex items-center gap-2.5">
    {/* Optional Icon Box */}
    <span className="grid size-8 sm:size-9 place-items-center rounded-xl border border-brand-active/20 bg-active-bg text-brand-active">
      <Activity size={18} />
    </span>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
        SECTION EYEBROW
      </p>
      <h2 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
        Section Title
      </h2>
    </div>
  </div>

  {/* Optional Right Pill Counter */}
  <span className="inline-flex shrink-0 items-center rounded-full border border-brand-active/20 bg-active-bg px-2.5 py-0.5 text-xs font-semibold text-brand-active">
    Count or Action
  </span>
</div>
```

#### Variant B: Inline Icon with Colored Title (e.g. Order Status)
```jsx
<div className="mb-5">
  <div className="mb-1 flex items-center gap-2.5">
    <span className="grid size-8 sm:size-9 place-items-center rounded-xl bg-brand-active/10 text-brand-active">
      <ShoppingBag size={18} />
    </span>
    <h2 className="text-lg font-bold tracking-tight text-brand-active sm:text-xl">
      Section Heading
    </h2>
  </div>
  <p className="text-xs sm:text-[13px] text-text-secondary">
    Description text explaining the section.
  </p>
</div>
```

### Reusability Guidelines for New Pages:
- When creating any primary page (`/products`, `/orders`, `/users`, `/settings`), use **Pattern 1** as the hero section banner. Replace the icon, eyebrow label, title, and descriptive body to suit the page.
- Inside cards, grids, or data views, use **Pattern 2**. Always preserve the `text-[11px] uppercase tracking-[0.16em] text-brand-active` eyebrow.

---

## D. Existing UI Element Styles

### 1. Buttons

#### A. Standard Shared Button (`src/components/ui/Button.jsx`)
- **Base Classes**:
  ```css
  ui-button relative isolate inline-flex items-center justify-center gap-2
  border border-transparent font-medium leading-none transition-colors duration-200
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active
  focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main
  disabled:cursor-not-allowed disabled:opacity-60
  ```
- **Shine Effect**: When `shine={true}`, renders `.ui-button__shine::before` which executes a CSS keyframe animation sweeping a 35% white skew across the button on hover (`animation: button-shine 700ms ease-out`). Disabled under `prefers-reduced-motion`.
- **Loading State**: When `isLoading={true}`, sets `aria-busy="true"`, disables interaction, and renders a spinning SVG circle indicator (`animate-spin size-4`).

#### B. Header & App Shell Icon Buttons
- **Square 40x40 Icon Button** (Theme switch, Wishlist, Mobile menu):
  ```css
  inline-flex size-10 shrink-0 items-center justify-center rounded-xl
  border border-border-main bg-bg-main text-text-secondary transition-colors
  hover:text-brand-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active
  ```
- **Sidebar Collapse Toggle**:
  ```css
  p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-active-bg transition-colors
  ```

#### C. Card Action Buttons (as verified in `ProductCard.jsx`)
- **Default Action**:
  `rounded-xl bg-input-bg text-text-primary hover:bg-border-main text-xs font-semibold py-2.5`
- **Destructive Action**:
  `rounded-xl bg-status-danger/10 text-status-danger hover:bg-status-danger/20 text-xs font-semibold py-2.5`

---

### 2. Stat Cards (`src/components/ui/StatCard.jsx`)

The dashboard specializes `StatCard` with a top golden border accent and horizontal layout (`DashboardOverview.jsx`):

- **Card Shell**:
  ```css
  w-full box-border rounded-2xl border border-border-main border-t-[3px] border-t-brand-active
  bg-card-bg p-3.5 sm:p-4 text-text-primary shadow-sm hover:shadow-md transition-shadow duration-200
  ```
- **Top Row**: `flex items-start justify-between gap-3`
  - Title: `truncate text-sm font-medium text-text-secondary`
  - Metric Value: `text-xl sm:text-2xl font-bold text-text-primary`
- **Icon Container**:
  ```css
  h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl bg-active-bg text-brand-active
  border border-brand-active/20 flex items-center justify-center
  ```
- **Internal Divider**: `my-2.5 h-px w-full bg-border-main`
- **Subtext**: `break-words text-xs text-text-secondary`

---

### 3. Status Badges & Fulfillment Indicators

#### A. Status Pills (Orders & Tables)
```css
inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase
```
- **Delivered**: `border-status-success/20 bg-status-success/10 text-status-success`
- **Pending / Processing**: `border-status-warning/20 bg-status-warning/10 text-status-warning`
- **Confirmed / Shipped**: `border-status-info/20 bg-status-info/10 text-status-info`
- **Cancelled**: `border-status-danger/20 bg-status-danger/10 text-status-danger`

#### B. Mini Progress Status Card (`DashboardAnalytics.jsx`)
- **Container**: `rounded-2xl border border-border-main border-t-[3px] bg-card-bg p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4`
- **Border-t Accent**: `border-t-status-warning`, `border-t-status-info`, `border-t-status-success`, or `border-t-status-danger`
- **Percentage Pill**: `inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-bold`
- **Progress Track**: `mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-border-main/50`
- **Progress Fill**: `h-full rounded-full transition-all duration-500 bg-status-*`

#### C. Notification Pill / Bubble (Header Wishlist)
```css
absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center
rounded-full border-2 border-card-bg bg-brand-active px-1 text-[10px] font-bold text-bg-main
```

---

### 4. Interactive List Items

#### A. Recent Order Item (`RecentOrders.jsx`)
```jsx
<div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border-main bg-card-bg p-3.5 sm:p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-active/40 hover:shadow-md">
  {/* Avatar Box */}
  <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-brand-active/20 bg-active-bg/70 text-brand-active transition-colors duration-200 group-hover:bg-brand-active group-hover:text-bg-main">
    <User className="size-4 sm:size-[18px]" strokeWidth={2} />
  </div>
  {/* Details (Flex-1) */}
  <div className="min-w-0 flex-1">
    <h3 className="truncate text-sm sm:text-base font-bold text-text-primary tracking-tight">Customer Name</h3>
    <p className="mt-0.5 truncate text-xs sm:text-[13px] text-text-secondary">Product × Qty</p>
    <p className="mt-1 text-[11px] sm:text-xs text-text-secondary/75">Formatted Date</p>
  </div>
  {/* Status & Price */}
  <div className="flex shrink-0 items-center justify-between sm:justify-end gap-3 sm:gap-3.5 border-t border-border-main/50 sm:border-t-0 pt-2.5 sm:pt-0">
    <span className="...statusClass">{status}</span>
    <span className="text-base sm:text-lg font-bold tabular-nums text-text-primary tracking-tight">{price}</span>
  </div>
</div>
```

#### B. Leaderboard Rank Item (`TopProducts.jsx`)
```jsx
<div className="flex min-w-0 items-center gap-3 rounded-xl border border-border-main/70 bg-card-bg p-3 transition-all duration-200 hover:border-brand-active/30 hover:shadow-sm">
  {/* Rank Box */}
  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-active/20 bg-active-bg text-xs sm:text-sm font-bold text-brand-active">
    {rank}
  </div>
  {/* Title & Units Sold */}
  <div className="min-w-0 flex-1">
    <h3 className="truncate text-sm sm:text-base font-bold tracking-tight text-text-primary">{name}</h3>
    <p className="mt-0.5 truncate text-xs sm:text-[13px] text-text-secondary">{unitsSold} units sold</p>
  </div>
  {/* Revenue Metric */}
  <span className="shrink-0 text-sm sm:text-base font-bold tabular-nums text-brand-active">{revenue}</span>
</div>
```

---

### 5. Form Inputs (`src/components/ui/Input.jsx`)

- **Field Container**: `flex w-full flex-col gap-1.5`
- **Label**: `text-sm font-medium text-text-primary`, with required indicator `ms-1 text-status-danger`
- **Base Input Field**:
  ```css
  w-full bg-input-bg text-text-primary placeholder:text-text-secondary outline-none
  transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-active
  disabled:cursor-not-allowed disabled:opacity-60
  ```
- **Logical Padding for Icons**: Left icon adds `ps-10`, right icon or visibility toggle adds `pe-10`.
- **Validation Feedback**:
  - Error: `ring-1 ring-status-danger`, helper text `text-sm text-status-danger flex items-start gap-1.5` with `CircleAlert`
  - Success: `ring-1 ring-status-success`, helper text `text-sm text-status-success flex items-start gap-1.5` with `CircleCheck`

---

### 6. Data Tables (`src/components/ui/DataTable.jsx`)

- **Outer Wrapper**: `w-full overflow-hidden rounded-2xl border border-border-main bg-card-bg shadow-sm`
- **Scroll Container**: `w-full overflow-x-auto`
- **Table**: `w-full min-w-[700px] border-collapse text-left`
- **Header Row (`<thead>`)**: `border-b border-border-main bg-input-bg text-text-secondary`
- **Header Cell (`<th>`)**: `px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary`
- **Body Rows (`<tbody>`)**: `divide-y divide-border-main`
- **Row Hover (Non-interactive)**: `transition-colors hover:bg-input-bg/40`
- **Row Hover (Interactive `onRowClick`)**: `cursor-pointer transition-colors hover:bg-active-bg/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-inset`
- **Cell (`<td>`)**: `px-6 py-4 text-sm text-text-primary`

---

### 7. Empty & Error States

- **Error Fallback Card** (`src/error/pages/Dashboard/`):
  - Container: `rounded-2xl border border-border-main bg-card-bg p-6 sm:p-8 text-center shadow-sm`
  - Danger Icon Container: `size-12 rounded-2xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3 flex items-center justify-center`
  - Title: `text-base sm:text-lg font-bold tracking-tight text-text-primary`
  - Message: `mt-1.5 max-w-md text-xs sm:text-sm text-text-secondary`
- **Empty State Card**:
  - Container: `rounded-xl border border-border-main p-8 text-center`
  - Icon: `size-8 text-text-secondary/60 mx-auto`
  - Text: `text-sm font-medium text-text-primary` + `text-xs text-text-secondary mt-1`

---

### 8. Loading Skeletons (`src/skeleton/pages/Dashbord/`)

- Base animation: `animate-pulse` on parent container.
- Placeholder background: `bg-input-bg` (adapts automatically to dark mode).
- Rounded radius: Match target element (`rounded-xl` for icons, `rounded-md` for text blocks, `rounded-2xl` for cards).

---

## E. Layout and Styling Rules

### 1. Spacing & Gaps

| Layout Level | Utility Classes | Description |
| :--- | :--- | :--- |
| **Page Outer Container** | `space-y-4 p-5` | Applied in `src/pages/Dashboard.jsx` and across dashboard sub-sections. |
| **Card Inner Padding** | `p-4 sm:p-5 lg:p-6` | Standard padding for primary cards. |
| **Compact Card Padding** | `p-3.5 sm:p-4` | Padding for metric cards and list rows. |
| **Stat Grid Gap** | `gap-3 sm:gap-5` | Gap in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. |
| **Split Column Gap** | `gap-5` | Gap in two-column analytical layouts (`lg:grid-cols-2` and `xl:grid-cols-2`). |
| **List Item Gap** | `space-y-3` or `space-y-2.5` | Vertical rhythm between repetitive feed items. |

### 2. Border Radius System

- **Containers & Big Cards**: `rounded-2xl` (`16px`) — The primary curve of the dashboard.
- **Hero Banner**: `rounded-xl sm:rounded-2xl`
- **Icon Containers & Action Buttons**: `rounded-xl` (`12px`)
- **Rank / Numeric Badges**: `rounded-lg` (`8px`)
- **Status Pills & Progress Bars**: `rounded-full` (`9999px`)
- **Product Card Gallery**: `rounded-3xl` (`24px`) — Used in standalone store cards.
- **Notice on Polygonal Corners**: `.corner-cut-tl-br` in `src/index.css` is used exclusively on `Login.jsx` for a brutalist authentication screen. **Do not use `.corner-cut-*` on dashboard or admin pages.**

### 3. Shadows & Elevation

- **Static Cards**: `shadow-sm`
- **Hover Elevation**: `hover:shadow-md hover:-translate-y-0.5`
- **Interactive Micro-elements**: `shadow-xs`
- **Brand Glow**: `shadow-md shadow-brand-active/20`
- **Focus Indicators**: `focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main`

### 4. Borders & Accents

- **Card Border**: `border border-border-main`
- **Top Accent Line**: `border-t-[3px] border-t-brand-active` (or `border-t-status-*`)
- **Dividers**: `h-px w-full bg-border-main`
- **Subtle Item Borders**: `border border-border-main/70` or `border border-border-main/50`

### 5. Application Shell & Viewport Rules

- **Root Frame**: `flex h-screen h-dvh overflow-hidden bg-bg-main`
- **Header**: Fixed height `h-16 shrink-0 border-b border-border-main bg-card-bg px-4 sm:px-6`
- **Main Viewport**: `flex-1 min-h-0 overflow-y-auto`
- **Defensive Container Widths**: All grid children and cards MUST include `min-w-0` to prevent chart SVGs or long truncated text from breaking column constraints.

### 6. Responsive Breakpoint Matrix

| Breakpoint | Width Range | Layout Adaptation |
| :--- | :--- | :--- |
| **Mobile** | `< 768px` | Sidebar converts to slide-out drawer (`w-72 max-w-[85vw] bg-black/50` backdrop). Single-column grids. Tables scroll horizontally (`min-w-[700px]`). Cards switch from row to column (`flex-col sm:flex-row`). |
| **Tablet** | `768px – 1023px` (`md:`) | Sidebar auto-collapses to icon-only mode (`w-20 px-3 py-6`). Stat cards arrange in 2 columns (`md:grid-cols-2`). |
| **Desktop** | `1024px+` (`lg:` & `xl:`) | Sidebar expands to full width (`w-64 p-6`). Stat cards arrange in 3 columns (`lg:grid-cols-3`). Analytics and Activity split into 2 equal columns (`lg:grid-cols-2`, `xl:grid-cols-2`). |

### 7. RTL / LTR Conventions

The codebase uses logical CSS properties to ensure bilingual compatibility:
- Padding: `ps-10`, `pe-10`
- Positioning: `start-3`, `end-3`, `start-0`, `end-0`
- Margins: `ms-1`, `me-2`
- Text alignment: Defaulting to logical alignments (`text-left`, with support for logical flow).

---

## F. Rules for Future Pages

When implementing or styling new pages (e.g. Products, Orders, Users, Settings, Add Product), AI agents and developers must strictly adhere to these rules:

1. **Primary Visual Reference**: Treat `src/pages/Dashboard.jsx` and `src/components/pages/Dashboard/` as the primary visual reference for all admin layouts, card styling, and section headers.
2. **Tokens as Source of Truth**: Treat `src/index.css` (`:root`, `.dark`, and `@theme`) as the absolute source of truth for colors and global tokens. Always use token classes (e.g., `bg-card-bg`, `text-text-primary`, `border-border-main`, `bg-brand-active`) rather than arbitrary hex values (`#fff`, `#000`, `#b88322`).
3. **Reuse Existing Patterns**: Every new admin page must begin with the **Hero Page Header Banner** pattern from `DashboardOverview.jsx` (featuring an icon squircle, eyebrow, title, and description).
4. **Inspect Existing UI Components First**: Before creating any new UI component, check `src/components/ui/` (`Button.jsx`, `StatCard.jsx`, `Input.jsx`, `DataTable.jsx`, `ProductCard.jsx`). Reuse them with appropriate props and variants.
5. **Do Not Invent Novel Styles**: Do not introduce new font families, border radii, shadows, or custom borders if an existing project pattern (`rounded-2xl`, `shadow-sm`, `border border-border-main`) serves the requirement.
6. **Adapt Visual Language, Do Not Blindly Duplicate Layout**: Re-use the visual tokens, header patterns, and card treatments while designing the layout appropriate to each page's functional needs (e.g., a filter bar + `DataTable` for `/orders` or `/users`; a grid of `ProductCard` components for `/products`).
7. **Inspect Source Before Assuming**: If a style rule is not documented here, inspect `src/index.css` and the existing components before taking action.
8. **Explicitly Flag Unverified Details**: If an asset, font, or configuration cannot be verified from the repository code, explicitly declare it as a gap rather than guessing or fabricating tokens.

---

## G. Implementation Verification & Gaps Analysis

During the inspection of the codebase, the following architectural details and gaps were identified:

1. **Tailwind Version**: The project runs **Tailwind CSS v4** via `@tailwindcss/vite` 4.3.3. There is no `tailwind.config.js`; configuration is handled via `@theme` in `src/index.css`.
2. **Font Loading Gap**: While `src/index.css` specifies `--font-sans: "Plus Jakarta Sans", sans-serif;`, there is no `<link>` in `index.html` or `@import` in `index.css` to fetch "Plus Jakarta Sans" from Google Fonts. Systems without this font installed locally will render the fallback system `sans-serif`.
3. **Page Component Placeholders**: The files `src/components/pages/Products/ProductsHeader.jsx`, `UsersHeader.jsx`, `AddProductHeader.jsx`, `OrdersTable.jsx`, and others exist in the tree but have a file size of 0 bytes. `Dashboard` is currently the only fully implemented page.
4. **Visual Divergence in Login**: `src/pages/Login.jsx` uses a distinct neo-brutalist / polygonal theme (`corner-cut-tl-br`, `border-2 border-text-primary`, offset hard shadows `shadow-[5px_5px_0px_var(--theme-text-primary)]`, and `rounded-none`). This is verified to be isolated to authentication; all internal admin pages must adhere to the rounded dashboard theme documented above.
