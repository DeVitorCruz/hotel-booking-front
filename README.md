# Hotel Booking — Angular frontend

Guest-facing website for small hotels, paired with the
[hotel-booking-back](https://github.com/DeVitorCruz/hotel-booking-back) Laravel API.
Forked from `datentria-corp@3f9eba8`: the theme system, shell (nav, drawers, footer),
banners and content pages are reused; the jewelry shop was replaced by a booking flow.

**Stack:** Angular 20 (standalone, signals, SSR) · Tailwind 4 + SCSS · Angular Material · PayPal JS SDK

## Pages

| Route | What it does | Rendering |
|---|---|---|
| `/` | Hero with availability search, featured rooms, highlights, story, testimonial | SSR |
| `/rooms` | All room types, or live availability + stay prices when dates are in the URL | SSR |
| `/rooms/:slug` | Gallery, amenities, live quote for chosen dates | SSR |
| `/book?room=&check_in=&check_out=&adults=&children=` | Guest details, PayPal or pay at hotel | Browser |
| `/booking/:reference?token=` | Confirmation, pay a pending booking, cancel (auto refund in free window) | Browser |
| `/about` `/faq` `/team` `/blog` `/contact` `/auth/*` | Content pages from the base template | SSR / prerender |

The calendar button in the header opens a quick availability search drawer.

## Back office (`/admin`)

Staff sign in at `/admin` with the accounts created in the API (the owner from
`OWNER_EMAIL`/`OWNER_PASSWORD`, others under **Team**). Lives in `src/app/admin/`, is
lazy-loaded and browser-only, so it adds nothing to the public site's bundle, and is
`noindex`. The menu adapts to the user's permissions (a receptionist does not see
settings, team or pricing edits).

| Page | What staff do there |
|---|---|
| Dashboard | Occupancy, arrivals and departures today, money collected this month |
| Calendar | Rooms × days chart; click a free night to book it |
| Bookings | Search/filter; detail page to check in/out, record payment, no-show, cancel, PayPal refund |
| New booking | Phone and walk-in bookings, live availability and price, paid at the hotel |
| Room types | Name, prices, capacity, amenities, descriptions, photo upload and ordering, show/hide |
| Rooms | Room numbers, type, floor, active / maintenance / inactive |
| Seasonal rates | Special prices by date range, minimum nights, priority |
| Room blocks | Close a room for repairs or private use |
| Messages | Contact-form inbox, reply by email |
| FAQ | Questions on the public FAQ page |
| Hotel settings | Name, contacts, time zone, currency, taxes, deposit, payment options, cancellation policy |
| Team | Add staff, change roles, set passwords, remove access |

## Rebrand for a new client

1. `src/app/themes/hotel/theme.content.ts` — hero, highlights, story, testimonial copy.
2. `src/assets/hotel/` — replace `logo.svg`, `logo-light.svg`, `hero.svg`, `about.svg`,
   `banner-side.svg`, `room-placeholder.svg` with the hotel's logo and photos
   (any format; update the paths in `theme.content.ts` / banner config if extensions change).
3. Colors: `src/custom-styles/hotel/_booking-ui.scss` (`--hb-*` tokens) and `_variables.scss`.
4. `src/environments/environment.ts` → `apiUrl` of the client's API.
5. Hotel name, phone, check-in times, currency, payment options and room data come from the API,
   so they are edited in the back office (`/admin`), not here.

Footer copy lives in `themes/hotel/main-build/semantic-home/footer-childs/`.

## Booking flow

- **PayPal:** clicking the PayPal button validates the form, then `POST /api/bookings`
  creates the booking (room held for `HOTEL_HOLD_MINUTES`) and returns the PayPal order id.
  On approval the app calls `POST /api/bookings/{ref}/paypal/capture` and opens the
  confirmation page. Cancelled popups or declined cards reuse the same hold via `/paypal/retry`.
- **Pay at hotel:** `POST /api/bookings` returns a confirmed booking immediately.
- The guest's manage token is in the confirmation email link and is also remembered in
  `localStorage`, so refreshing the booking page works.

## Develop

```bash
npm install
npm start            # http://localhost:4200, expects the API at http://localhost:8000/api
npm run build        # production SSR build (Netlify runtime, see netlify.toml)
```
