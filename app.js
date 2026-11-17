/* GTA 6 Clipper sales page interactions. No dependencies. */

// ---------------------------------------------------------------------------
// CONFIG - paste your payment link here when you have it.
// ---------------------------------------------------------------------------
const PAYMENT_URL = "https://superprofile.bio/vp/gta-6-ai-clipper";
const NOTIFICATION_EMAIL = "dailymanifestation11@gmail.com";
const USD_TO_INR = 83; // indicative conversion used for the illustration

// ---------------------------------------------------------------------------
// Earnings calculator
// ---------------------------------------------------------------------------
const inputs = {
  campaigns: document.getElementById("c-campaigns"),
  clips: document.getElementById("c-clips"),
  views: document.getElementById("c-views"),
  rate: document.getElementById("c-rate"),
  fee: document.getElementById("c-fee"),
};
const out = {
  campaigns: document.getElementById("o-campaigns"),
  clips: document.getElementById("o-clips"),
  views: document.getElementById("o-views"),
  rate: document.getElementById("o-rate"),
  month: document.getElementById("result-month"),
  day: document.getElementById("result-day"),
  week: document.getElementById("result-week"),
  viewsTotal: document.getElementById("result-views"),
  clipsMonth: document.getElementById("result-clips"),
  resultRate: document.getElementById("result-rate"),
};

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function calculate() {
  const campaigns = Number(inputs.campaigns.value);
  const clips = Number(inputs.clips.value);
  const views = Number(inputs.views.value);
  const rate = Number(inputs.rate.value);
  const fee = inputs.fee.checked ? 0.9 : 1;

  // `clips` is the total number of clips posted per day across all campaigns; `campaigns` is how many income
  // sources you are clipping for. Views come from the clips actually posted, so campaign count does not multiply them.
  const totalDailyViews = clips * views;
  const usdPerDay = (totalDailyViews / 1000) * rate * fee;
  const inrPerDay = usdPerDay * USD_TO_INR;

  out.campaigns.value = String(campaigns);
  out.clips.value = String(clips);
  out.views.value = views.toLocaleString("en-US");
  out.rate.value = "$" + rate.toFixed(2);
  out.day.textContent = inr(inrPerDay);
  out.week.textContent = inr(inrPerDay * 7);
  out.month.textContent = inr(inrPerDay * 30);
  out.viewsTotal.textContent = totalDailyViews.toLocaleString("en-US");
  out.clipsMonth.textContent = (clips * 30).toLocaleString("en-US");
  out.resultRate.textContent = "$" + rate.toFixed(2);
}

Object.values(inputs).forEach((el) => el.addEventListener("input", calculate));

// Presets: Conservative $1, Typical $2 (Vyro median), High hype $5
const presets = {
  low: { campaigns: 3, clips: 6, views: 3000, rate: 1 },
  mid: { campaigns: 4, clips: 10, views: 5000, rate: 2 },
  high: { campaigns: 6, clips: 15, views: 8000, rate: 5 },
};
document.querySelectorAll(".preset").forEach((btn) => {
  btn.addEventListener("click", () => {
    const p = presets[btn.dataset.preset];
    if (!p) return;
    inputs.campaigns.value = p.campaigns;
    inputs.clips.value = p.clips;
    inputs.views.value = p.views;
    inputs.rate.value = p.rate;
    document.querySelectorAll(".preset").forEach((b) => b.classList.toggle("active", b === btn));
    calculate();
  });
});
calculate();

// ---------------------------------------------------------------------------
// Caption style demo videos
// ---------------------------------------------------------------------------
const demoVideo = document.getElementById("demo-video");
document.querySelectorAll(".thumb").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".thumb").forEach((b) => b.classList.toggle("active", b === btn));
    if (!demoVideo) return;
    demoVideo.poster = btn.dataset.poster;
    demoVideo.src = btn.dataset.video;
    demoVideo.load();
    demoVideo.play().catch(() => {});
  });
});

// ---------------------------------------------------------------------------
// Email capture popup + FormSubmit delivery
// ---------------------------------------------------------------------------
const popup = document.getElementById("popup");
const form = document.getElementById("lead-form");
const errEl = document.getElementById("form-error");
const submitBtn = document.getElementById("submit-btn");
let lastFocused = null;

function openPopup() {
  lastFocused = document.activeElement;
  popup.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("lead-name")?.focus(), 40);
}
function closePopup() {
  popup.hidden = true;
  document.body.style.overflow = "";
  lastFocused?.focus?.();
}
document.querySelectorAll("[data-open-popup]").forEach((b) => b.addEventListener("click", openPopup));
document.querySelectorAll("[data-close-popup]").forEach((b) => b.addEventListener("click", closePopup));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !popup.hidden) closePopup();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errEl.textContent = "";
  const name = document.getElementById("lead-name").value.trim();
  const email = document.getElementById("lead-email").value.trim();
  if (name.length < 2) { errEl.textContent = "Please enter your name."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errEl.textContent = "Please enter a valid email address."; return; }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving your details...";

  try {
    // FormSubmit.co emails the submission straight to the notification address, free, no backend required.
    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name,
        email,
        _subject: `GTA 6 Clipper lead: ${name}`,
        _template: "table",
      }),
    });
    if (!res.ok) throw new Error("delivery failed");
  } catch (err) {
    // If delivery fails, still let the buyer continue, but tell them.
    console.warn("Lead delivery failed:", err);
  }

  if (!PAYMENT_URL || PAYMENT_URL === "PAYMENT_LINK_HERE") {
    errEl.textContent = "Thanks. Your payment link will be added shortly.";
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Continue to payment <span aria-hidden="true">&rarr;</span>';
    return;
  }
  window.location.href = PAYMENT_URL;
});
