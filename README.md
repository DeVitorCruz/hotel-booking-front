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

## Rebrand for a new client

1. `src/app/themes/hotel/theme.content.ts` — hero, highlights, story, testimonial copy.
2. `src/assets/hotel/` — replace `logo.svg`, `logo-light.svg`, `hero.svg`, `about.svg`,
   `banner-side.svg`, `room-placeholder.svg` with the hotel's logo and photos
   (any format; update the paths in `theme.content.ts` / banner config if extensions change).
3. Colors: `src/custom-styles/hotel/_booking-ui.scss` (`--hb-*` tokens) and `_variables.scss`.
4. `src/environments/environment.ts` → `apiUrl` of the client's API.
5. Hotel name, phone, check-in times, currency, payment options and room data come from the API,
   so they are edited in the back office, not here.

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
