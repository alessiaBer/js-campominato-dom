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

//assegno alla variabile gameOver il valore false che poi cambierà nel corso del gioco
let gameOver = false;

// seleziono l'elemento container della DOM e lo assegno a una variabile
const containerEl = document.querySelector('.container');

//seleziono l'elemento .btn dellaDOM e lo assegno ad una variabile
const playBtn = document.querySelector('.btn-info');

//seleziono l'elemento select presente nella DOM
const options = document.getElementById('levels');


/*****GENERARE UN ARRAY DI 16 NUMERI CASUALI *****/
// aggiungo la funzione per generare numeri casuali
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

//assegno ad una variabile un array vuoto
let generatedNumb = [];

// assegno ad una costante il max dei numeri che devono essere generati
const maxRandomNumbs = 16;

//creo una MIA funzione per creare l'array di 16 numeri casuali
function createNumbArray(max_cells) {
   
    // ciclo nei numeri da 1 al maxRandomNumbs per generare 16 numeri casuali
    let i = 1;
    while (i <= maxRandomNumbs) {
        //assegno i numeri genrati ad una variabile
        let randomNumb = getRandomInteger(1, max_cells); // TODO change 100 with max_cells
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
    
    //console.log(generatedNumb);
}
/*********/


/*****SELECT LEVEL *****/
let max_cells; 

function selectLevel() {
    //con un if statement stabilisco il livello in base al valore scelto del select 
    if (options.value == 1) {
        max_cells = 100;
    } else if (options.value == 2) {
        max_cells = 81;
    } else if (options.value == 3) {
        max_cells = 49;
    }
    
    //console.log(max_cells);

    //pulisco l'array ogni qualvolta viene variato il livello
    generatedNumb = [];
}
/***********/



/***** FUNCTION TO GENERATE THE GAME GRID ******/
function generateGrid(max_cells) {
    //al click:
    //per svuotare ogni volta la pagina
    containerEl.innerHTML = '';

    //attraverso un ciclo while che itera fino al numero massimo di caselle
    let i = 1;
    while (i <= max_cells) {
        // creo nella DOM un elemento div e lo assegno ad una variabile
        const cellEl = document.createElement('div');
        //applico la width giusta per ogni livello
        cellEl.style.width = `calc(100% / ${Math.sqrt(max_cells)}`;
        //aggiungo all'elemento la classe .cell
        cellEl.classList.add('cell');
        //assegno all'interno della cell l'html corrispondente al suo index
        cellEl.innerHTML = `${Number(i)}`;
        //appendo le cell create all'elemento container
        containerEl.append(cellEl);
        //incremento per il while loop
        i++;
    }
}  
/*********/

/*** WHEN A CELL IS CLICKED ****/
function clickedCell(array) {
    
    //seleziono tutte le celle e le assegno ad una variabile
    const cells = document.querySelectorAll('.cell');

    //stabilisco i numero di click a 0, il valore verrà variato nel corso del gioco
    let numbOfClick = 0;
    //stabilisco il numero massimo delle volte in cui si può cliccare in una giocata
    const maxClick = max_cells - maxRandomNumbs;

    // ciclo dentro alla variabile cells per selezionare ogni cella
    for (let i = 0; i < cells.length; i++) {
        //seleziono ogni singola casella e la assegno ad una variabile
        const cell = cells[i];

        //aggiungo un event listener al click
        cell.addEventListener('click', function() {
            if (generatedNumb.includes(Number(cell.innerHTML))) {
                cell.classList.add('bg_red');
                alert('hai perso!');
                gameOver = true;
                return;
            } else {
                //toggle la classe background azzurro
                cell.classList.toggle('bg_light_blue');
                //console log il numero della casella
                //console.log(`hai cliccato la casella ${cell.innerHTML}`);

                numbOfClick++;

                if (numbOfClick === maxClick) {
                    console.log(`Hai vinto! Hai cliccato ${numbOfClick} volte senza beccare una bomba!`);
                    gameOver = true;
                    return;
                }
            }
        
        })
    }
}
/********/ 





playBtn.addEventListener('click', function() {

    selectLevel();

    createNumbArray(max_cells);

    generateGrid(max_cells);

    clickedCell(generatedNumb);

    if (gameOver) {
        return;
    }
})



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
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */