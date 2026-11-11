// JavaScript portofolio muhammad ilham
// Dipasang di ketiga halaman dengan defer

// 1. Daftar keahlian (halaman Beranda)
const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" },
];
skills.push({ nama: "JavaScript", level: "Dasar" });

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill) {
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    daftarSkill.appendChild(item);
  });
  if (jumlahSkill) {
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  }
}

// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");
const simpanTema = (tema) => {
  try {
    localStorage.setItem("tema", tema);
  } catch (error) {
    console.warn("Tema tidak dapat disimpan:", error);
  }
};

const ambilTema = () => {
  try {
    return localStorage.getItem("tema");
  } catch (error) {
    console.warn("Tema tidak dapat dibaca:", error);
    return null;
  }
};

if (tombolTema) {
  if (ambilTema() === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "Mode Terang";
  } else {
    tombolTema.textContent = "Mode Gelap";
  }

  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    if (document.body.classList.contains("gelap")) {
      simpanTema("gelap");
      tombolTema.textContent = "Mode Terang";
    } else {
      simpanTema("terang");
      tombolTema.textContent = "Mode Gelap";
    }
  });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

// 4. Daftar proyek dan filter (halaman Proyek)
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "halaman_profil_pertama.png",
    alt: "Tangkapan layar halaman profil  Masychun Sindu Tamtomo",
    deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "kontak.png",
    alt: "Tangkapan layar form kontak berisi lima isian",
    deskripsi: "Form dengan label dan validasi bawaan browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "tabel_jadwal_belajar.png",
    alt: "Tangkapan layar tabel jadwal belajar mandiri",
    deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "portofolio_responsif.jpeg",
    alt: "Tangkapan layar portofolio di ponsel dan laptop",
    deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox.",
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "kalkulator_nilai_rapor.png",
    alt: "Tangkapan layar hasil kalkulator nilai di Console",
    deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "logika.png",
    alt: "Tangkapan layar hasil uji lima soal logika",
    deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan.",
  },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = item.kategori;

  const judul = document.createElement("h3");
  judul.textContent = item.judul;

  const gambar = document.createElement("img");
  gambar.src = item.gambar;
  gambar.alt = item.alt;
  gambar.width = 280;
  gambar.addEventListener("error", () => {
    gambar.src = "img/proyek-placeholder.svg";
  }, { once: true });

  const deskripsi = document.createElement("p");
  deskripsi.textContent = item.deskripsi;

  kartu.append(label, judul, gambar, deskripsi);
  return kartu;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek) return;
  daftarProyek.replaceChildren(...daftar.map((item) => buatKartu(item)));
  if (jumlahProyek) {
    jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    const tombolLama = document.querySelector(".tombol-filter.aktif");
    if (tombolLama) {
      tombolLama.classList.remove("aktif");
    }
    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }
  });
}

if (daftarProyek) {
  tampilkanProyek(proyek);
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-js", "JavaScript");
}