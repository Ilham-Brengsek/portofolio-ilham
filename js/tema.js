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
