// JavaScript portofolio muhammad ilham
// Dipasang di ketiga halaman dengan defer

async function muatJson(path, namaGlobal) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Gagal memuat ${path}: ${response.status}`);
    }

    const data = await response.json();
    window[namaGlobal] = data;
    console.table(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 1. Daftar keahlian (halaman Beranda)
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill) {
  muatJson("data/keahlian.json", "dataKeahlian").then((skills) => {
    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });
    if (jumlahSkill) {
      jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
    }
  });
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
let proyek = [];
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
  muatJson("data/proyek.json", "dataProyek").then((data) => {
    proyek = data;
    tampilkanProyek(proyek);
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-js", "JavaScript");
  });
}

fetch("data/proyek.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Gagal mengambil JSON");
    }
    return response.json();
  })
  .then(data => {
    console.table(data);
    console.log(data);
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });

  const username = "Ilham-Brengsek";

  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Gagal mengambil repositori");
        }
        return response.json();
    })
    .then(data => {
        console.table(data);

        const daftar = document.getElementById("daftar-repositori");

        daftar.innerHTML = data.map(repo => `
            <li>
                <a href="${repo.html_url}" target="_blank">
                    ${repo.name}
                </a>
            </li>
        `).join("");
    })
    .catch(error => {
        console.error("Gagal mengambil data:", error);
    });