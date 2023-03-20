/* Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.

Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */

// seleziono l'elemento container della DOM e lo assegno a una variabile
const containerEl = document.querySelector('.container');

//seleziono l'elemento .btn dellaDOM e lo assegno ad una variabile
const playBtn = document.querySelector('.btn-info');

//seleziono l'elemento select presente nella DOM
const options = document.getElementById('levels');



/***GENERARE 16 NUMERI RANDOM****/
// assegno ad una costante il max dei numeri che devono essere generati
const maxRandomNumbs = 16;
//assegno ad una variabile un array vuoto
const generatedNumb = [];

// aggiungo la funzione per generare numeri casuali
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// ciclo nei numeri da 1 al maxRandomNumbs per generare 16 numeri casuali
let i = 1;
while (i <= maxRandomNumbs) {
    //assegno i numeri genrati ad una variabile
    let randomNumb = getRandomInteger(1, 100); // TODO change 100 with max_cells
    //con un if statement controllo se nell'array è già presente un numero 
    if (!generatedNumb.includes(randomNumb)) {
        //se non è presente lo aggiungo all'array
        generatedNumb.push(randomNumb);
    } else {
        //se è già presente continuo a generare
        continue;
    }

    //incremento per il while loop 
    i++;
}

console.log(generatedNumb);
/***** ****/




//inizializzo il valore di level al default 1
let level = 1;

let max_cells = 100;

//assegno all'elemento select un event listener al click 
/* options.addEventListener('click', function(){
    //assegno all'elemento select un event listener al cambiare del valore delle option
    options.addEventListener('change', function(){
        

        //in base al level applico una classe al btn 
        playBtn.classList.add(`level-${level}`);
        //console.log(playBtn);
        //svuoto il container ogni volta che cambia il value
        containerEl.innerHTML = '';
    })

    //rimuovo la classe level- ogni volta che un livello viene inizializzato
    playBtn.classList.remove(`level-${level}`);

}); */

//aggiungo al playBtn la classe di default
playBtn.classList.add(`level-${level}`);

// assegno al btn un event listener per il click 
playBtn.addEventListener('click', function() {
    //al click:
    //per svuotare ogni volta la pagina
    containerEl.innerHTML = '';

    //con un if statement stabilisco il livello in base al valore scelto del select
        if (options.value == 1) {
            level = 1;
        } else if (options.value == 2) {
            level = 2;
            max_cells = 81;
        } else if (options.value == 3) {
            level = 3;
            max_cells = 49;
        }

        let i = 1;
        while (i <= max_cells) {
        // creo nella DOM un elemento div e lo assegno ad una variabile
        const cellEl = document.createElement('div');
        //applico la width giusta per ogni livello
        cellEl.style.width = `calc(100% / ${Math.sqrt(max_cells)})`;
        //aggiungo all'elemento la classe .cell
        cellEl.classList.add('cell');
        //assegno all'interno della cell l'html corrispondente al suo index
        cellEl.innerHTML = `${i}`;
        //appendo le cell create all'elemento container
        containerEl.append(cellEl);

        i++

        }

    /* //if statement che crea n caselle in base al livello scelto
    if (playBtn.classList.contains('level-1')) {
        let i = 1
        while (i <= 100) {
            // creo nella DOM un elemento div e lo assegno ad una variabile
            const cellEl = document.createElement('div');

            //aggiungo all'elemento la classe .cell
            cellEl.classList.add('cell');
            //assegno all'interno della cell l'html corrispondente al suo index
            cellEl.innerHTML = `${i}`;
            //appendo le cell create all'elemento container
            containerEl.append(cellEl);
            
            //incremento per il while loop
            i++;
        }

    } else if (playBtn.classList.contains('level-2')) {
        let i = 1
        while (i <= 81) {
            // creo nella DOM un elemento div e lo assegno ad una variabile
            const cellEl = document.createElement('div');
            
            //applico la width giusta per ogni livello
            cellEl.style.width = 'calc(100% / 9)';
            //aggiungo all'elemento la classe .cell
            cellEl.classList.add('cell');
            //assegno all'interno della cell l'html corrispondente al suo index
            cellEl.innerHTML = `${i}`;
        
            //appendo le cell create all'elemento container
            containerEl.append(cellEl);
            
            //incremento per il while loop
            i++;
        }

    } else if (playBtn.classList.contains('level-3')) {
        let i = 1
        while (i <= 49) {
            // creo nella DOM un elemento div e lo assegno ad una variabile
            const cellEl = document.createElement('div');
            
            //applico la width giusta per ogni livello
            cellEl.style.width = 'calc(100% / 7)';
            //aggiungo all'elemento la classe .cell
            cellEl.classList.add('cell');
            //assegno all'interno della cell l'html corrispondente al suo index
            cellEl.innerHTML = `${i}`;
            
            //appendo le cell create all'elemento container
            containerEl.append(cellEl);
            
            //incremento per il while loop
            i++;
        }
    } */

    //seleziono tutte le celle e le assegno ad una variabile
const cells = document.querySelectorAll('.cell');

// ciclo dentro alla variabile cells per selezionare ogni cella
for (let i = 0; i < cells.length; i++) {
    //seleziono ogni singola casella e la assegno ad una variabile
    const thisCell = cells[i];

    //aggiungo un event listener al click
    thisCell.addEventListener('click', function() {
        //se il numero è presente nella lista dei numeri generati
        if (thisCell[i] === generatedNumb[i]) {
            thisCell.classList.toggle('bg_red');
            alert('hai perso!');
        } else {
        //toggle la classe background azzurro
        thisCell.classList.toggle('bg_light_blue');
        //console log il numero della casella
        console.log(`hai cliccato la casella ${thisCell.innerHTML}`);
        }
    })
}

})
/**** TODO 
//LA PARTITA TERMINA dopo aver cliccato su una bomba
//oppure QUANDO RAGGIUNGE IL NUMERO MAX DI NUMERI CONSENTITI (max_cells - maxRandomNumbs?)
******/

/**** TODO 
//quando la partita termina 
//SOFTWARE COMUNICA IL PUNTEGGIO > numero di volte che user ha click su una casella
//che non era una bomba 
// ?? creare let con numero click e nell'else del bg_light_blue mettere ++ ??
******/




/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
nella stessa cella può essere posizionata al massimo una bomba, 
perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati
abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina.
Altrimenti
la cella cliccata si colora di azzurro
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.



BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */

