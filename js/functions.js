const getRandomIntNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let lkm = 0;

document.querySelector('#nappi').addEventListener('click', () => {
    let noppaArvot = [];

    if (lkm < 3) {
        for (let i = 1; i <= 5; i++) {
            const noppa = document.querySelector(`#noppa${i}`);
            const lukotus = noppa.getAttribute('data-locked') === 'true';

            if (!lukotus) {
                const randomNumero = getRandomIntNumberInRange(1, 6);
                const noppaKuva = noppa.querySelector('img');
                noppaKuva.src = `./images/${randomNumero}.png`;
                noppaArvot.push(randomNumero);
            } else {
                const lukotettuNumero = parseInt(noppa.querySelector('img').src.match(/(\d)\.png/)[1]);
                noppaArvot.push(lukotettuNumero);
            }
        }

        lkm++;
        document.querySelector('#lkm').textContent = lkm;

        if (lkm === 3) {
            const {tulos, totalScore} = analysoiNopat(noppaArvot);
            document.querySelector('#tulos').textContent = tulos;
            document.querySelector('#pistemaara').textContent = totalScore; 
        }
    } else {
        alert("Sinulla on kolme heittoa käytössäsi.");
    }
});

document.querySelector('#nappi_nollaa').addEventListener('click', () => {
    lkm = 0;
    document.querySelector('#lkm').textContent = lkm;
    document.querySelector('#tulos').textContent = '';
    document.querySelector('#pistemaara').textContent = '0'; 

    for (let i = 1; i <= 5; i++) {
        const noppa = document.querySelector(`#noppa${i}`);
        noppa.setAttribute('data-locked', 'false');
        noppa.style.border = 'none';
        const noppaKuva = noppa.querySelector('img');
        noppaKuva.src = './images/1.png';
    }
});

for (let i = 1; i <= 5; i++) {
    document.querySelector(`#noppa${i}`).addEventListener('click', () => {
        const noppa = document.querySelector(`#noppa${i}`);
        const lukotus = noppa.getAttribute('data-locked') === 'true';

        noppa.setAttribute('data-locked', !lukotus);

        if (!lukotus) {
            noppa.style.border = '3px solid red';
        } else {
            noppa.style.border = 'none';
        }
    });
}

const analysoiNopat = (noppaArvot) => {
    const laskuri = {};
    let totalScore = 0;
    
    noppaArvot.forEach(val => {
        laskuri[val] = (laskuri[val] || 0) + 1;
    });

    const laskeNopanArvot = Object.values(laskuri);
    const järjestä = noppaArvot.slice().sort();

    let tulos = "";

    // Lasketaan pistemäärät kaikista mahdollisista käsistä.
    if (laskeNopanArvot.includes(5)) {
        tulos = 'YATZY!!!';
        totalScore = 50; 
    } else if (laskeNopanArvot.includes(4)) {
        
        const nelosetNumero = Object.keys(laskuri).find(key => laskuri[key] === 4);
        totalScore = 4 * nelosetNumero; 
        tulos = 'Neloset';
    } else if (laskeNopanArvot.includes(3) && laskeNopanArvot.includes(2)) {
        
        totalScore = noppaArvot.reduce((acc, val) => acc + val, 0);
        tulos = 'Täyskäsi';
    } else if (laskeNopanArvot.includes(3)) {
        
        const kolmosetNumero = Object.keys(laskuri).find(key => laskuri[key] === 3);
        totalScore = 3 * kolmosetNumero; 
        tulos = 'Kolmoset';
    } else if (laskeNopanArvot.filter(x => x === 2).length === 2) {
        
        const parit = Object.keys(laskuri).filter(key => laskuri[key] === 2);
        totalScore = 2 * (parseInt(parit[0]) + parseInt(parit[1])); 
        tulos = 'Kaksi Paria';
    } else if (laskeNopanArvot.includes(2)) {
        
        const pariNumero = Object.keys(laskuri).find(key => laskuri[key] === 2);
        totalScore = 2 * pariNumero; 
        tulos = 'Pari';
    } else if (järjestä.join('') === '12345') {
     
        totalScore = 15; 
        tulos = 'Pieni Suora';
    } else if (järjestä.join('') === '23456') {
      
        totalScore = 20; 
        tulos = 'Iso Suora';
    } else {
        tulos = 'Yksi noppa';
        totalScore = Math.max(...noppaArvot);
    }
    document.querySelector('#tulos').textContent = tulos;
    document.querySelector('#pistemaara').textContent = totalScore;

    return {tulos, totalScore}; 
};
