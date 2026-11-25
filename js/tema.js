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

const tombolKeAtas = document.createElement("button");
tombolKeAtas.type = "button";
tombolKeAtas.className = "tombol-ke-atas";
tombolKeAtas.setAttribute("aria-label", "Kembali ke atas");
tombolKeAtas.title = "Kembali ke atas";
tombolKeAtas.textContent = "Kembali ke atas";
tombolKeAtas.hidden = true;
document.body.append(tombolKeAtas);

const perbaruiTombolKeAtas = () => {
  tombolKeAtas.hidden = window.scrollY <= 0;
};

window.addEventListener("scroll", perbaruiTombolKeAtas, { passive: true });
perbaruiTombolKeAtas();
tombolKeAtas.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});
