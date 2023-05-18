
let tipoRicerca = 2;
let pagina = 1;
let api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=36";
const btn = document.getElementById('cerca');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategoria = document.getElementById('categoria');
const search = document.getElementById('ricerca');
const selectDurata = document.getElementById('durata');
const selectSezione = document.getElementById('sezione');
let intestazione = document.getElementById("intestazione");
if (btn) {
    btn.addEventListener("click", Ricerca);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}
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

function Ricerca() {

    switch (tipoRicerca) {
        case 1:
            console.log("Ricerca per categoria");
            let categoria = document.getElementById("categoria").value;
            intestazione.innerHTML = "";
            console.log(categoria);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=0&format=json&per_page=36&query=" + categoria, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));


            break;
        case 2:
            tipoRicerca = 2;
            intestazione.innerHTML = "";
            console.log("Ricerca per Parola Chiave");
            let key_word = document.getElementById("ricerca").value;
            intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>" + key_word + "</span>";
            console.log(key_word);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=0&format=json&per_page=36&query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            break;
        case 3:
            console.log("Ricerca per Durata");
            intestazione.innerHTML = "";
            let time = document.getElementById("durata").value;
            if (time == "longest") {
                intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>Video lunghi</span>";
            } else {
                intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>Video Corti</span>";
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&order=" + time + "&lq=0&format=json", {
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
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=36&page=" + pagina, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));

            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&per_page=36&format=json&query=" + sezione, {
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

function stampaCards(result) {
    console.log(result);
    let arrayVideo = result.videos;
    let cardsVideo = document.getElementById('video');

    cardsVideo.innerHTML = "";

    if (arrayVideo.length == 0) {
        intestazione.innerHTML = "Nessun risultato";
        return;
    }

    arrayVideo.forEach((video, index)=> {
        const wrapper = document.createElement(`div`);
        wrapper.className = `col`;

        const card = document.createElement(`div`);
        card.className = `card`;
        card.addEventListener(`click`, (ev) => window.open(video.embed));

        const cardImg = document.createElement(`img`);
        cardImg.src = video.default_thumb.src;
        cardImg.className = `card-img-top`;

        const cardDescription = document.createElement(`div`);
        cardDescription.className = `card-description`;

        const h2 = document.createElement(`h2`);
        h2.className = `card-title`;
        h2.textContent = stampaTitolo(arrayVideo[index].title, 75);

        const p = document.createElement(`p`);
        p.className = `card-text`;

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

    function CreaTrending() {
        console.log("Crea Trending");
        tipoRicerca = 6;
        fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&order=top-weekly&lq=0&format=json&per_page=36", {
            "method": "GET",
            "headers": {
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(result => { stampaCards(result) })
            .catch(error => console.log('Error:', error));
    }

    function stampaTitolo(testo, numeroParole) {
        let parole = testo.split('');
        let paroleDaStampare = parole.slice(0, numeroParole).join('');
        return paroleDaStampare;
    }

    function next() {
        window.scrollTo(top);
        switch (tipoRicerca) {
            case 1:
                if (pagina > 0 && pagina < 100) {
                    pagina++;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;

            case 2:
                if (pagina > 0 && pagina < 100) {
                    pagina++;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;
            case 3:
                if (pagina > 0 && pagina < 100) {
                    pagina++;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;
            case 4:
                if (pagina > 0 && pagina < 100) {
                    pagina++;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;

            case 5:
                if (pagina > 0 && pagina < 100) {
                    pagina++;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                CreaHome();
                break;

            case 6:

                if (pagina > 0 && pagina < 100) {
                    pagina++;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                CreaTrending();

            default:
                break;
        }

    }

    function prev() {
        window.scrollTo(top);
        switch (tipoRicerca) {
            case 1:
                if (pagina > 0 && pagina < 100) {
                    pagina--;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;

            case 2:
                if (pagina > 0 && pagina < 100) {
                    pagina--;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;
            case 3:
                if (pagina > 0 && pagina < 100) {
                    pagina--;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;
            case 4:
                if (pagina > 0 && pagina < 100) {
                    pagina--;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                Ricerca();
                break;

            case 5:
                if (pagina > 0 && pagina < 100) {
                    pagina--;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                CreaHome();
                break;

            case 6:
                if (pagina > 0 && pagina < 100) {
                    pagina--;
                } else {
                    pagina = 1;
                }
                console.log(pagina);
                intestazione.innerHTML = "Pagina " + pagina;
                CreaTrending();
                break;

            default:
                break;
        }
    }

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

    selectSezione.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn.click();
        }
    });

