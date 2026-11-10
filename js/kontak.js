const formKontak = document.querySelector("[data-contact-form]");
if (formKontak) {
  const pesan = formKontak.querySelector("#pesan");
  const hitungKarakter = document.querySelector("#hitung-karakter");
  const statusForm = formKontak.querySelector(".form-status[hidden]") || formKontak.querySelector(".form-status");
  const maksimalKarakter = 300;

  const updateHitungKarakter = () => {
    if (!pesan || !hitungKarakter) return;

    const jumlah = pesan.value.length;
    hitungKarakter.textContent = `${jumlah}/${maksimalKarakter} karakter`;
    hitungKarakter.style.color = jumlah > maksimalKarakter ? "#e76f51" : "";
  };

  if (pesan) {
    updateHitungKarakter();
    pesan.addEventListener("input", updateHitungKarakter);
  }

  formKontak.addEventListener("submit", (event) => {
    if (!pesan) return;

    const isiPesan = pesan.value.trim();
    if (isiPesan.length === 0) {
      event.preventDefault();
      if (statusForm) {
        statusForm.hidden = false;
        statusForm.textContent = "Pesan tidak boleh kosong.";
      }
      return;
    }

    if (isiPesan.length > maksimalKarakter) {
      event.preventDefault();
      if (statusForm) {
        statusForm.hidden = false;
        statusForm.textContent = `Pesan terlalu panjang (${isiPesan.length}/${maksimalKarakter} karakter).`;
      }
      return;
    }

    if (statusForm) {
      statusForm.hidden = true;
      statusForm.textContent = "";
    }
  });
}
