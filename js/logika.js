// Soal 1: ganjil atau genap
function ganjilGenap(angka) {
    if (angka % 2 === 0) {
        return " angka genap";
    } else {
        return " angka ganjil";
    }
    
}

console.log("Soal 1: ganjil atau genap");
console.log(`angka 7 = ${ganjilGenap(7)}`); //ganjil
console.log(`angka 986 = ${ganjilGenap(986)}`); //genap


// soal 2: celcius ke fahrenheit
function celciusKeFahrenheit(celcius) {
    return (celcius * 9/5) + 32;
}

console.log("Soal 2: celcius ke fahrenheit");
console.log(`0 Celcius = ${celciusKeFahrenheit(0)} Fahrenheit`);
console.log(`100 Celcius = ${celciusKeFahrenheit(100)} Fahrenheit`);
console.log(`-40 Celcius = ${celciusKeFahrenheit(-40)} Fahrenheit`);


// Soal 3: nilai terbesar
function nilaiTerbesar(angka1, angka2, angka3) {
    if (angka1 >= angka2 && angka1 >= angka3) {
        return angka1;
    } else if (angka2 >= angka1 && angka2 >= angka3) {
        return angka2;
    } else {
        return angka3;
    }
}

console.log("Soal 3: nilai terbesar");
console.log(`Nilai terbesar dari 5, 9, 2 = ${nilaiTerbesar(5, 9, 2)}`);
console.log(`Nilai terbesar dari 80, 75, 80 = ${nilaiTerbesar(80, 75, 80)}`);
console.log(`Nilai terbesar dari -3, -7, -1 = ${nilaiTerbesar(-3, -7, -1)}`);


// Soal 4: tahun kabisat
function tahunKabisat(tahun) {
    if ((tahun % 4 === 0 && tahun % 100 !== 0) || (tahun % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

console.log("Soal 4: tahun kabisat");
console.log(`Tahun 2024 adalah tahun Kabisat = ${tahunKabisat(2024)}`);
console.log(`Tahun 2026 adalah tahun Kabisat = ${tahunKabisat(2026)}`);
console.log(`Tahun 1900 adalah tahun Kabisat = ${tahunKabisat(1900)}`);
console.log(`Tahun 2000 adalah tahun Kabisat = ${tahunKabisat(2000)}`);


// Soal 5: harga setelah diskon
function hargaSetelahDiskon(harga, diskon) {
    if (harga >= 200000 && diskon === 0.2) {
        return harga - (harga * diskon);
    } else if (harga >= 100000 && diskon === 0.1) {
        return harga - (harga * diskon);
    } else {
        return harga;
    }
}

console.log("Soal 5: harga setelah diskon");
console.log(`Harga setelah diskon untuk harga 250000 dengan diskon 20% = ${hargaSetelahDiskon(250000, 0.2)}`);
console.log(`Harga setelah diskon untuk harga 100000 dengan diskon 10% = ${hargaSetelahDiskon(100000, 0.1)}`);
console.log(`Harga setelah diskon untuk harga 75000 dengan diskon 0% = ${hargaSetelahDiskon(75000, 0)}`);