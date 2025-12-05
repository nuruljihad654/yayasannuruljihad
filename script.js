/* ==========================================================
   SHORTCUT QUERY
========================================================== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ==========================================================
   NAVBAR MOBILE TOGGLE
========================================================== */
const navToggle = $("#nav-toggle");
const navLinks = $("#nav-links");

navToggle?.addEventListener("click", () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
  }
});

/* ==========================================================
   SMOOTH SCROLL + AUTO CLOSE NAV ON MOBILE
========================================================== */
$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = $(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (window.innerWidth < 900) {
      navLinks.style.display = "none";
    }
  });
});

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */
const backTop = $("#backTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 320) {
    backTop.style.display = "block";
  } else {
    backTop.style.display = "none";
  }
});

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================================
   FORM KONTAK (WA + EMAIL)
========================================================== */
(function () {
  const form = $("#contact-form");
  if (!form) return;

  const WA = "6282247433423";
  const EMAIL = "yayasannuruljihad654@gmail.com";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#cf-name").value.trim();
    const phone = $("#cf-phone").value.trim();
    const msg = $("#cf-message").value.trim();

    if (!name || !msg) {
      alert("Mohon isi nama dan pesan.");
      return;
    }

    // WHATSAPP
    const waText =
      `Halo, saya *${encodeURIComponent(name)}*\n` +
      `Kontak: ${encodeURIComponent(phone)}\n\n` +
      `Pesan:\n${encodeURIComponent(msg)}`;

    window.open(`https://wa.me/${WA}?text=${waText}`, "_blank");

    // EMAIL
    const subject = `Pesan dari ${name}`;
    const body =
      `Nama: ${name}\n` +
      `Kontak: ${phone}\n\n` +
      `Pesan:\n${msg}`;

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    form.reset();
  });
})();

/* ==========================================================
   COUNTER ANIMASI (AKTIF SAAT TERLIHAT)
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const card = document.querySelector(".counter-card");
  let started = false;

  function startCounter() {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      let current = 0;

      function update() {
        let inc = Math.ceil(target / 60);
        if (current < target) {
          current += inc;
          counter.textContent = current;
          setTimeout(update, 20);
        } else {
          counter.textContent = target;
        }
      }
      update();
    });
  }

  function checkVisibility() {
    const pos = card.getBoundingClientRect().top;
    if (pos < window.innerHeight - 80 && !started) {
      started = true;
      startCounter();
    }
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

/* ==========================================================
   SLIDER OTOMATIS + GESER (prev-btn & next-btn)
========================================================== */

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let index = 0;
const total = slides.length;

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Tombol Next
nextBtn?.addEventListener("click", () => {
  index = (index + 1) % total;
  updateSlider();
});

// Tombol Prev
prevBtn?.addEventListener("click", () => {
  index = (index - 1 + total) % total;
  updateSlider();
});

// Auto slide setiap 5 detik
setInterval(() => {
  index = (index + 1) % total;
  updateSlider();
}, 5000);


/* ==========================================================
   DARK MODE TOGGLE
========================================================== */
const darkToggle = document.getElementById("dark-toggle");

// Cek mode tersimpan
if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark");
}

// Switch mode
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Simpan preferensi
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
    darkToggle.innerHTML = `<i class="fas fa-sun"></i>`;
  } else {
    localStorage.setItem("mode", "light");
    darkToggle.innerHTML = `<i class="fas fa-moon"></i>`;
  }
});

