
var tipoRicerca = 2;
var pagina = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_page=39";
const btn = document.getElementById('cerca');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategoria = document.getElementById('categoria');
const search = document.getElementById('ricerca');
const selectDurata = document.getElementById('durata');
const selectSezione = document.getElementById('sezione');
let intestazione = document.getElementById("intestazione");
var hoverInterval;
if (btn) {
    btn.addEventListener("click", Ricerca);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}
// funzione che mi fa cambiare il filtro di ricerca
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Filtro Categorie
            tipoRicerca = 1;
            pagina = 1
            selectCategoria.className = "form-select";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            tipoRicerca = 2;
            pagina = 1
            selectCategoria.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSezione.className = "form-select visually-hidden";
            search.placeholder = "Cerca";
            selectDurata.className = "form-select visually-hidden";


            break;

        case 3:
            //Filtro Durata
            tipoRicerca = 3;
            pagina = 1
            selectCategoria.className = "form-select visually-hidden";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select";
            break;
        case 4:
            //Filtro Sezione
            tipoRicerca = 4;
            pagina = 1
            selectSezione.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategoria.className = "form-select visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        default:
            tipoRicerca = 2;
            break;

    }
}
// funzione che mi fa la ricerca in base al filtro selezionato
function Ricerca() {

    switch (tipoRicerca) {
        case 1:
            console.log("Ricerca per categoria");
            let categoria = document.getElementById("categoria").value;
            intestazione.innerHTML = "";
            console.log(categoria);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=0&format=json&per_page=39&query=" + categoria, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            break;
        case 2:
            tipoRicerca = 2;
            intestazione.innerHTML = "";
            console.log("Ricerca per Parola Chiave");
            let key_word = document.getElementById("ricerca").value;
            console.log(key_word);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=0&format=json&order=latest&per_page=39&query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = "Ricerca per <span id='ricerca'>" + key_word + "</span>";
            break;
        case 3:
            console.log("Ricerca per Durata");
            intestazione.innerHTML = "";
            let time = document.getElementById("durata").value;
            if (time == "longest") {
                intestazione.innerHTML = "Ricerca per <span id='ricerca'>Video lunghi</span>";
            } else {
                intestazione.innerHTML = "Ricerca per <span id='ricerca'>Video Corti</span>";
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&order=" + time + "&lq=0&format=json&per_page=39", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            break;

        case 4:
            console.log("Ricerca per Sezione");
            intestazione.innerHTML = "";
            let sezione = document.getElementById("sezione").value;
            console.log(sezione);
            if (sezione == "etero") {
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=39&page=" + pagina, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));

            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&per_page=39&format=json&lq=1&query=" + sezione, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));
            }
            break;
        default:
            tipoRicerca = 2;
            document.getElementById("ricerca").value = "";
            break;
    }
}
// funzione che mi stampa le cards
function stampaCards(result) {
    console.log(result);
    let arrayVideo = result.videos;
    let cardsVideo = document.getElementById('video');

    cardsVideo.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (arrayVideo.length == 0) {
        intestazione.innerHTML = "Nessun risultato trovato";
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }
    // stampa delle cards
    arrayVideo.forEach((video, index) => {
        const wrapper = document.createElement(`div`);
        wrapper.className = `col`;

        const card = document.createElement(`div`);
        card.className = `card`;
        card.addEventListener(`click`, (ev) => window.open(video.embed));

        const p = document.createElement(`p`);
        p.className = `card-text`;

        const cardImg = document.createElement(`img`);
        cardImg.src = video.default_thumb.src;
        cardImg.className = `card-img-top`;
        cardImg.onmouseover = function () {
            CambiaImmagineOnHover(card, arrayVideo[index].thumbs[0].src)
        };
        cardImg.onmouseleave = function () { setImmagineDefault(card, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 60)),p};
        cardImg.ontouchstart = function () {
            clearInterval(hoverInterval)
            CambiaImmagineOnHover(card, arrayVideo[index].thumbs[0].src)
        };
        cardImg.ontouchend = function () { setImmagineDefault(card, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 60)),p};

        const cardDescription = document.createElement(`div`);
        cardDescription.className = `card-description`;

        const h2 = document.createElement(`h2`);
        h2.className = `card-title`;
        h2.textContent = stampaTitolo(arrayVideo[index].title, 60);

        const spanViews = document.createElement(`span`);
        spanViews.className = `card-text`;
        spanViews.id = `n-views`;

        const imgViews = document.createElement(`img`);
        imgViews.src = `/img/eye.png`;
        imgViews.id = `views`;

        const spanTime = document.createElement(`span`);
        spanTime.className = `card-text`;
        spanTime.id = `time`;

        const imgTime = document.createElement(`img`);
        imgTime.src = `/img/clock-circular-outline.png`;
        imgTime.id = `clock`;

        const spanViewsText = document.createElement(`span`);
        spanViewsText.textContent = video.views;

        const spanTimeText = document.createElement(`span`);
        spanTimeText.textContent = video.length_min;

        card.append(cardImg);
        card.append(cardDescription);
        cardDescription.append(h2);
        wrapper.append(card);
        cardsVideo.append(wrapper);

        spanViews.append(imgViews);
        spanViews.append(spanViewsText);

        spanTime.append(imgTime);
        spanTime.append(spanTimeText);

        p.append(spanViews);
        p.append(spanTime);

        cardDescription.append(p);
        // Nel caso dovessi mettere degli eventi a questo div, dovresti scrivere la creazione degli elementi singoli.
        // ././img/clock-circular-outline.png => ./ significa current directory. Di conseguenza ././ e' una modo di dire quanto si capisce dei path relativi.
    });
}
// funzione che mi crea la homepage quando carica la pagina index
function CreaHome() {
    console.log("Crea Home");
    tipoRicerca = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + pagina + "&per_page=42", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
    window.scrollTo(top);
}
// funzione che mi crea la pagina trending quando carica la pagina trending
function CreaTrending() {
    console.log("Crea Trending");
    tipoRicerca = 6;
    fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&order=top-weekly&lq=0&format=json&per_page=39", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
}
//funzione che mi stampa il titolo del video limitando i caratteri
function stampaTitolo(testo, numeroParole) {
    let parole = testo.split('');
    let paroleDaStampare = parole.slice(0, numeroParole).join('');
    return paroleDaStampare;
}
// funzione che mi fa andare alla pagina successiva
function next() {
    window.scrollTo(top);
    if (pagina > 0 && pagina < 100) {
        pagina++;
    } else {
        pagina = 1;
    }
    intestazione.innerHTML = "Pagina <span id='ricerca'>" + pagina + "</span>";
    switch (tipoRicerca) {
        case 5:
            CreaHome();
            break;
        case 6:
            CreaTrending();
        default:
            Ricerca();
            break;
    }
}
// funzione che mi fa andare alla pagina precedente
function prev() {
    window.scrollTo(top);
    if (pagina > 1 && pagina < 100) {
        pagina--;
    } else {
        pagina = 1;
    }
    intestazione.innerHTML = "Pagina <span id='ricerca'>" + pagina + "</span>";
    switch (tipoRicerca) {
        case 5:
            CreaHome();
            break;
        case 6:
            CreaTrending();
            break;
        default:
            Ricerca();
            break;
    }
}
//Funzione per far funzionare il tasto invio nella select della categoria
categoria.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

selectDurata.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});
//Funzione per far funzionare il tasto invio nella select della sezione
selectSezione.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});
//Funzione per cambiare l'immagine della card quando il mouse entra nella card
function CambiaImmagineOnHover(cardElement, thumbBase) {
    let i = 2;
    let prec = 1;
    let url;
    inizio = thumbBase;
    cardElement.querySelector('img').src = thumbBase;
    cardElement.querySelector('h2').textContent = "";
    cardElement.querySelector('p').classList.add("visually-hidden");
    hoverInterval = setInterval(() => {
        cardElement.querySelector('img').src = thumbBase;
        url = thumbBase.replace(prec + "_", i + "_");
        thumbBase = url;
        if (i == 15 || prec == 14) {
            i = 2;
            prec = 1;
            thumbBase = inizio;
            cardElement.querySelector('img').src = thumbBase;

        } else {
            cardElement.querySelector('img').src = thumbBase.replace(prec + "_", i + "_");
            i++;
            prec++;
        }
    }, 400);
}
//Funzione per cambiare l'immagine della card quando il mouse esce dalla card
function setImmagineDefault(card, thumb, titolo) {
    clearInterval(hoverInterval);
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = titolo;
    card.querySelector('p').classList.remove("visually-hidden");
}
