// Funzione per creare e visualizzare un singolo passaggio (linea e orario)
function creaCard(linea, orario) {
    let divRisultati = document.getElementById("risultati");
    let div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4");
    
    // Creiamo la card
    let card = document.createElement("div");
    card.classList.add("card");

    // Corpo della card
    let divBody = document.createElement("div");
    divBody.classList.add("card-body");

    // Testo linea
    let p1 = document.createElement("p");
    p1.classList.add("card-text", "linea");
    p1.innerHTML = `Linea: ${linea}`;

    // Testo orario
    let p2 = document.createElement("p");
    p2.classList.add("card-text", "orario");
    p2.innerHTML = `Orario: ${orario}`;

    divBody.appendChild(p1);
    divBody.appendChild(p2);
    card.appendChild(divBody);
    div.appendChild(card);
    divRisultati.appendChild(div);
}

// Funzione che viene eseguita quando si clicca sul bottone "Cerca"
function cerca() {
    let numeroFermata = document.getElementById("input").value;

    // Se non viene inserito un numero di fermata, non fare nulla
    if (!numeroFermata) {
        alert("Per favore, inserisci un numero di fermata.");
        return;
    }

    let URL = "https://gpa.madbob.org/query.php?stop=" + numeroFermata;

    // Pulisce i risultati precedenti
    document.getElementById("risultati").innerHTML = "";

    // Chiamata API per ottenere i dati
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        // Se i dati non sono vuoti, crea le card
        if (data.length > 0) {
            data.forEach(passaggio => {
                creaCard(passaggio.line, passaggio.hour);
            });
        } else {
            // Se non ci sono risultati, mostra un messaggio
            let divRisultati = document.getElementById("risultati");
            let div = document.createElement("div");
            div.classList.add("alert", "alert-warning", "text-center");
            div.innerHTML = "Nessun passaggio trovato per questa fermata.";
            divRisultati.appendChild(div);
        }
    })
    .catch(error => {
        console.error("Errore:", error);
        alert("Si è verificato un errore durante il recupero dei dati.");
    });
}
