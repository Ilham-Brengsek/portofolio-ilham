// Data dan filter untuk beranda dan halaman proyek.

async function muatJson(path, namaGlobal) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Gagal memuat ${path}: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error(`Format data ${path} tidak valid.`);
    }

    window[namaGlobal] = data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Daftar proyek dan filter.
let proyek = [];
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item, index) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = item.kategori;

  const judul = document.createElement("h3");
  judul.textContent = item.judul;

  const gambar = document.createElement("img");
  gambar.src = item.gambar;
  gambar.srcset = `${item.gambar} 360w, ${item.gambarRetina} 560w`;
  gambar.sizes = "(min-width: 768px) 352px, calc(100vw - 4.25rem)";
  gambar.alt = item.alt;
  gambar.width = 560;
  gambar.height = 315;
  gambar.loading = index === 0 ? "eager" : "lazy";
  gambar.decoding = "async";
  if (index === 0) {
    gambar.fetchPriority = "high";
  }
  gambar.addEventListener("error", () => {
    gambar.removeAttribute("srcset");
    gambar.removeAttribute("sizes");
    gambar.src = "img/proyek-placeholder.svg";
  }, { once: true });

  const deskripsi = document.createElement("p");
  deskripsi.textContent = item.deskripsi;

  kartu.append(label, judul, gambar, deskripsi);
  return kartu;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek) return;
  daftarProyek.replaceChildren(...daftar.map((item, index) => buatKartu(item, index)));
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
  muatJson("data/proyek.json", "dataProyek").then((data) => {
    daftarProyek.removeAttribute("aria-busy");
    if (!data) {
      daftarProyek.replaceChildren();
      if (jumlahProyek) {
        jumlahProyek.textContent = "Daftar proyek belum dapat dimuat.";
      }
      return;
    }

    proyek = data;
    tampilkanProyek(proyek);
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-js", "JavaScript");
  });
}
