// ===== Bagian Toggle Menu Icon & Navbar =====
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bxs-x-circle");
  navbar.classList.toggle("active");
};

// ===== Bagian Navbar Highlight Saat Scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150; // Kurangi offset agar highlight lebih cepat aktif
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document
        .querySelector('header nav a[href*="' + id + '"]')
        .classList.add("active");
    }
  });

  // Untuk sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100); // Ganti 1000 ke 100 agar lebih cepat sticky
};

// ===== Bagian Typed.js untuk Efek Tipe Teks =====
const typed = new Typed(".multiteks", {
  strings: ["Web Developer", "Blogger"], // Perbaiki "Development" dan "Blogger" jika diperlukan
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
});

// ===== Inisialisasi ScrollReveal =====
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

// Menggunakan ScrollReveal untuk animasi pada elemen tertentu
ScrollReveal().reveal(
  // Perbaiki nama kelas yang salah
  ".home-content, .heading, .services-box, .portfolio-box",
  { origin: "top" } // Umumnya dari atas
);

ScrollReveal().reveal(".home-content h1, .about-item .about-img", {
  origin: "left",
});

ScrollReveal().reveal(".home-content p, .about-item .about-text", {
  origin: "right",
});

ScrollReveal().reveal(".contact-form", { origin: "bottom" }); // Hanya form kontak dari bawah

// ===== Mengubah Foto Profil Otomatis =====
let images = [
  { src: "gambar/IMG-20250214-WA0000-01[1].jpg", alt: "Foto Nia" },
  {
    src: "gambar/IMG-20250214-WA0012-01[1].jpg",
    alt: "Foto Nia 2", // Perbaiki alt text
  },
  {
    src: "gambar/WhatsApp Image 2025-02-15 at 12.51.31_25172d9d.jpg",
    alt: "Foto Nia 3", // Perbaiki alt text
  },
];

let index = 0;

setInterval(function () {
  let gambarProfil = document.querySelector(".img-box img");

  if (gambarProfil) {
    gambarProfil.src = images[index].src;
    gambarProfil.alt = images[index].alt;

    index = (index + 1) % images.length;
  }
}, 3000);

// ===== Fungsi untuk Tombol "Visit Blog" =====
// Fungsi ini tidak perlu karena link sudah langsung mengarah ke blog dengan target="_blank"
// Jika Anda ingin efek teks berubah, itu akan membutuhkan lebih banyak JS dan mungkin kurang UX yang baik.
// const bloggerBtn = document.getElementById("bloggerBtn");
// if (bloggerBtn) {
//     bloggerBtn.addEventListener('click', function(event) {
//         event.preventDefault(); // Mencegah link langsung terbuka
//         const originalText = this.innerHTML;
//         const originalHref = this.href;

//         this.innerHTML = "Tunggu sebentar...";
//         this.href = "#"; // Kosongkan sementara
//         this.style.pointerEvents = 'none'; // Nonaktifkan klik sementara

//         setTimeout(() => {
//             this.innerHTML = "Sekarang menuju MYBLOG!";
//             window.open(originalHref, '_blank'); // Buka di tab baru
//             // Reset setelah beberapa saat
//             setTimeout(() => {
//                 this.innerHTML = originalText;
//                 this.href = originalHref;
//                 this.style.pointerEvents = 'auto';
//             }, 1000); // Kembali normal setelah 1 detik
//         }, 2000); // Tunda 2 detik sebelum membuka
//     });
// }

// ===== Validasi Formulir Kontak =====
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form terkirim default
    let valid = true;

    // Ambil elemen input dan error message
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageTextarea = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMessage = document.getElementById("successMessage");

    // Reset pesan error dan kelas input
    nameError.innerText = "";
    emailError.innerText = "";
    messageError.innerText = "";
    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    messageTextarea.classList.remove("input-error");
    successMessage.style.display = "none";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageTextarea.value.trim();

    // Validasi Nama
    if (name === "") {
      nameError.innerText = "Nama wajib diisi.";
      nameInput.classList.add("input-error");
      valid = false;
    } else if (/\d/.test(name)) {
      // Memastikan nama tidak mengandung angka
      nameError.innerText = "Nama tidak boleh mengandung angka.";
      nameInput.classList.add("input-error");
      valid = false;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.innerText = "Email wajib diisi.";
      emailInput.classList.add("input-error");
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError.innerText = "Format email tidak valid.";
      emailInput.classList.add("input-error");
      valid = false;
    }

    // Validasi Pesan
    if (message === "") {
      messageError.innerText = "Pesan wajib diisi.";
      messageTextarea.classList.add("input-error");
      valid = false;
    }

    // Jika semua validasi lolos
    if (valid) {
      successMessage.style.display = "block";
      // Anda bisa menambahkan kode untuk mengirim data form ke server di sini
      // Misalnya: fetch('your-api-endpoint', { method: 'POST', body: new FormData(this) });

      // Reset formulir setelah pengiriman berhasil
      this.reset();
      // Sembunyikan pesan sukses setelah 3 detik
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    }
  });

// ===== Dark Mode Toggle Logic =====
const toggleModeBtn = document.getElementById("toggleMode");
const body = document.body;

toggleModeBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Mencegah scrolling ke top
  body.classList.toggle("dark-mode");

  const icon = this.querySelector("i");
  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("bxs-sun");
    icon.classList.add("bxs-moon");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("bxs-moon");
    icon.classList.add("bxs-sun");
    localStorage.setItem("theme", "light");
  }
});

// Cek tema yang tersimpan saat memuat halaman
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const icon = toggleModeBtn.querySelector("i");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.remove("bxs-sun");
    icon.classList.add("bxs-moon");
  } else {
    body.classList.remove("dark-mode");
    icon.classList.remove("bxs-moon");
    icon.classList.add("bxs-sun");
  }

  // Menutup navbar saat mengklik link di mobile
  const navLinksInMenu = document.querySelectorAll(".navbar a");
  navLinksInMenu.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        menuIcon.classList.remove("bxs-x-circle");
      }
    });
  });
});
