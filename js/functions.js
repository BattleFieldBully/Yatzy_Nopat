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
           
            const tulos = analysoiNopat(noppaArvot);
            document.querySelector('#tulos').textContent = tulos;
        }
    } else {
        alert("Sinulla on kolme heittoa käytössäsi.");
    }
});


document.querySelector('#nappi_nollaa').addEventListener('click', () => {
    lkm = 0; 
    document.querySelector('#lkm').textContent = lkm;
    document.querySelector('#tulos').textContent = '';

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

        // Lukitus päälle
        noppa.setAttribute('data-locked', !lukotus);

        
        if (!lukotus) {
            noppa.style.border = '3px solid red'; // Näytä lukitusreunukset
        } else {
            noppa.style.border = 'none'; // Poista lukitusreunukset
        }
    });
}


const analysoiNopat = (noppaArvot) => {
    const laskuri = {}; 
    noppaArvot.forEach(val => laskuri[val] = (laskuri[val] || 0) + 1);

    const laskeNopanArvot = Object.values(laskuri); 
    const järjestä = noppaArvot.slice().sort(); 

    
    if (laskeNopanArvot.includes(5)) {
        return 'YATZY!!!';
    } else if (laskeNopanArvot.includes(4)) {
        return 'Neloset';
    } else if (laskeNopanArvot.includes(3) && laskeNopanArvot.includes(2)) {
        return 'Täyskäsi';
    } else if (laskeNopanArvot.includes(3)) {
        return 'Kolmoset';
    } else if (laskeNopanArvot.filter(x => x === 2).length === 2) {
        return 'Kaksi Paria';
    } else if (laskeNopanArvot.includes(2)) {
        return 'Pari';
    } else if (järjestä.join('') === '12345') {
        return 'Pieni Suora';
    } else if (järjestä.join('') === '23456') {
        return 'Iso Suora';
    } else {
        return 'Ei mitään...';
    }
};
