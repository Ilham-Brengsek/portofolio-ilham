const formKalkulator = document.querySelector("#form-kalkulator");
const hasilKalkulator = document.querySelector("#hasil-kalkulator");

function hitungRataRata(tugas, uts, uas) {
  return (tugas + uts + uas) / 3;
}

function predikat(rataRata) {
  if (rataRata >= 90) return "A";
  if (rataRata >= 80) return "B";
  if (rataRata >= 70) return "C";
  if (rataRata >= 60) return "D";
  return "E";
}

if (formKalkulator && hasilKalkulator) {
  formKalkulator.addEventListener("submit", (event) => {
    event.preventDefault();

    const tugas = Number(formKalkulator.elements.tugas.value);
    const uts = Number(formKalkulator.elements.uts.value);
    const uas = Number(formKalkulator.elements.uas.value);
    const rataRata = hitungRataRata(tugas, uts, uas);

    hasilKalkulator.textContent = `Rata-rata: ${rataRata.toFixed(2)} | Predikat: ${predikat(rataRata)}`;
    hasilKalkulator.hidden = false;
  });
}