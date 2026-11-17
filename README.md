# GTA 6 Clipper sales page

A static, high-conversion sales page. No build step, no dependencies. Host `index.html`, `styles.css`, `app.js` and the `assets/` folder on any static host, or open `index.html` directly in a browser.

## Before going live

### 1. Payment link
The payment link is already configured in `app.js`:

```
https://superprofile.bio/vp/gta-6-ai-clipper
```

Buyers are redirected there after they submit the email popup. To change it later, edit `PAYMENT_URL` at the top of `app.js`.

### 2. Activate email delivery (one time, free)
The form uses [FormSubmit.co](https://formsubmit.co) to email every captured name and address to `dailymanifestation11@gmail.com`. There is no account and no cost.

The first time someone submits the form, FormSubmit sends a confirmation email to your Gmail. Open it and confirm the address. After that, every submission is delivered to your inbox automatically. If you skip this step, submissions will not arrive.

The notification email address is set here in `app.js`:

```js
const NOTIFICATION_EMAIL = "dailymanifestation11@gmail.com";
```

### 3. Check the copy
The numbers in the calculator use an illustrative USD-to-INR rate of 83. Change `USD_TO_INR` in `app.js` if you want a different conversion. All earnings figures are clearly labeled illustrative and not guaranteed.

## What is on the page

- Hero with launch-date urgency and a real screenshot of the software
- Sourced proof band (preorders, platform rates, creator count)
- Four-step "how it works" section
- Interactive earnings calculator with Conservative / Typical / High presets and a platform-fee toggle
- Product section with three real caption-style demo videos
- Offer block at ₹399
- Objection-handling FAQ
- Email capture popup that delivers to your Gmail, then redirects to your payment link

## Files

- `index.html` - page structure and all copy
- `styles.css` - dark theme, lime accent, responsive layout
- `app.js` - calculator, video switching, popup and FormSubmit delivery
- `assets/` - real UI screenshot, favicon and three demo clips copied from GTA 6 Clipper
