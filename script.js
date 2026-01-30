//CARICAMENTO PAGINA
// Gestore della navigazione basato su hash
function handleRouting() {
    const currentHash = window.location.hash;
    if (currentHash === "#articolo-intervista-gio-biondo") {
        GoArt3();
    } 
    else if (currentHash === "#articolo-arte-rigenerazione") {
        GoArt2();
    } 
    else if (currentHash === "#articolo-coworking") {
        GoArt1();
    }
    else if (currentHash === "#articolo-pianta-abbandonata-sul-bus") {
        GoArt4();
    }
    else if (currentHash === "#gioco-quiz") {
        GoGIOCOQUIZ();
    }
    else if (currentHash === "#evento-Hackathon-territoriale") {
        GoEvento1();
    }
    else if (currentHash === "#workshop-public-speaking-2026") {
        GoEvento2();
    }   
    else if (currentHash === "#passeggiate-patrimoniali-vicenza") {
        GoEvento3();
    }    
    else if (currentHash === "#chi-siamo") {
        GoChiSiamo();
    }
        else if (currentHash === "#sondaggio-trasporti-notturni") {
        GoSond1();
    }
    else if (currentHash === "#sondaggio-salute-mentale") {
        GoSond2();
    }    
    else if (currentHash === "#sondaggio-calisthenics-belluno") {
        GoSond3();
    }
    else if (currentHash === "#opportunità") {
        GoOpportunity();
    }
}

// Esegui al caricamento della pagina
window.addEventListener('DOMContentLoaded', handleRouting);

// Esegui quando l'utente cambia hash o preme "indietro" nel browser
window.addEventListener('hashchange', () => {
    // Se l'utente torna alla home (hash vuoto), ricarica per ripristinare Header/Main
    if (window.location.hash === "" || window.location.hash === "#") {
        location.reload(); 
    } else {
        handleRouting();
    }
});

//olga-bot
//PULL DI DOMANDE per quiz
const allQuestions = [ { q: "Quale celebre cocktail a base di Prosecco e Aperol (o Bitter) è nato in Veneto?", options: ["Negroni", "Spritz", "Bellini", "Americano"], correct: 1, anecdote: "Il nome deriva probabilmente dal termine tedesco 'spritzen' (spruzzare), l'usanza dei soldati austriaci di allungare il vino veneto con acqua frizzante." }, { q: "In quale città veneta è ambientata la tragedia di Romeo e Giulietta di Shakespeare?", options: ["Treviso", "Venezia", "Verona", "Rovigo"], correct: 2, anecdote: "Ogni anno migliaia di turisti visitano il celebre balcone di Giulietta, anche se la storia è frutto della letteratura." }, { q: "Quale di questi dolci al cucchiaio, oggi diffuso in tutto il mondo, ha origini contese tra Treviso e Tolmezzo?", options: ["Panna cotta", "Tiramisù", "Zuppa inglese", "Bonet"], correct: 1, anecdote: "La ricetta originale trevigiana sembra sia nata presso il ristorante 'Le Beccherie' verso la fine degli anni '60." }, { q: "Qual è il nome della tipica imbarcazione a remi che simboleggia la città di Venezia?", options: ["Vaporetto", "Gondola", "Traghetto", "Burchiello"], correct: 1, anecdote: "Le gondole sono composte da 280 pezzi di legno diversi e sono rigorosamente colorate di nero per un decreto del XVII secolo contro l'ostentazione del lusso." }, { q: "Come si chiama il ponte coperto in legno progettato da Andrea Palladio che attraversa il fiume Brenta?", options: ["Ponte degli Scalzi", "Ponte degli Alpini", "Ponte di Rialto", "Ponte della Libertà"], correct: 1, anecdote: "Situato a Bassano del Grappa, il ponte è stato distrutto e ricostruito più volte, l'ultima delle quali dopo la Seconda Guerra Mondiale per mano degli Alpini." }, { q: "Quale città veneta è nota per avere la piazza più grande d'Italia (Prato della Valle)?", options: ["Padova", "Vicenza", "Verona", "Belluno"], correct: 0, anecdote: "Prato della Valle misura quasi 90.000 metri quadrati ed è caratterizzata da un'isola centrale circondata da un canale e 78 statue." }, { q: "Qual è l'animale simbolo della Regione Veneto, presente anche sulla sua bandiera?", options: ["L'aquila", "Il cavallo", "Il leone alato", "Il lupo"], correct: 2, anecdote: "Rappresenta il Leone di San Marco, simbolo di maestà e potenza della storica Repubblica di Venezia." }, { q: "Quale gruppo montuoso, Patrimonio UNESCO, caratterizza il panorama della parte settentrionale del Veneto?", options: ["Appennini", "Dolomiti", "Alpi Cozie", "Madonie"], correct: 1, anecdote: "Le Dolomiti prendono il nome dal geologo francese Déodat de Dolomieu, che per primo ne studiò la particolare composizione rocciosa." }, { q: "Quale di questi vini bianchi frizzanti è prodotto principalmente nell'area di Conegliano e Valdobbiadene?", options: ["Franciacorta", "Prosecco", "Lambrusco", "Chianti"], correct: 1, anecdote: "Le colline del Prosecco di Conegliano e Valdobbiadene sono state dichiarate Patrimonio dell'Umanità UNESCO per il loro paesaggio agricolo unico." }, { q: "Cosa indossa tipicamente una persona che partecipa al Carnevale di Venezia per nascondere la propria identità?", options: ["Un elmo", "Una maschera", "Un velo", "Un cappuccio"], correct: 1, anecdote: "Le maschere permettevano ai veneziani di annullare temporaneamente le differenze di classe sociale e di genere." }, { q: "Qual è il soprannome della città di Venezia, riferito al suo storico dominio marittimo?", options: ["La Superba", "La Serenissima", "La Dotta", "La Dominante"], correct: 1, anecdote: "Il termine 'Serenissima' deriva dal titolo spettante ai Dogi e rifletteva la stabilità e la giustizia del governo veneziano." }, { q: "In quale comune veneto si produce il celebre vino rosso 'Amarone'?", options: ["Negrar di Valpolicella", "Asolo", "Soave", "Bardolino"], correct: 0, anecdote: "L'Amarone nasce da un errore: un produttore dimenticò una botte di Recioto (dolce), permettendo ai lieviti di fermentare tutti gli zuccheri, rendendo il vino amaro." }, { q: "Quale università veneta, fondata nel 1222, ospita il primo teatro anatomico stabile al mondo?", options: ["Università di Verona", "Università di Venezia (Ca' Foscari)", "Università di Padova", "Università di Treviso"], correct: 2, anecdote: "Il Teatro Anatomico di Padova, costruito nel 1594, permetteva agli studenti di assistere alle autopsie da una struttura a imbuto." }, { q: "Che cos'è il 'Baccalà alla vicentina'?", options: ["Merluzzo fresco fritto", "Stoccafisso essiccato e cotto a fuoco lento", "Zuppa di pesce di laguna", "Pesce spada grigliato"], correct: 1, anecdote: "Nonostante il nome, si usa lo stoccafisso (merluzzo essiccato) importato dalle isole Lofoten in Norvegia fin dal 1432." }, { q: "Come si chiama la maschera veneziana che viene tradizionalmente rappresentata con un lungo becco a punta?", options: ["Arlecchino", "Pantalone", "Medico della Peste", "Colombina"], correct: 2, anecdote: "Il lungo naso a becco veniva riempito di erbe profumate per proteggere il medico dai presunti miasmi del contagio." }, { q: "In quale città si svolge ogni due anni la famosa partita a scacchi con personaggi viventi?", options: ["Cittadella", "Marostica", "Castelfranco Veneto", "Monselice"], correct: 1, anecdote: "La tradizione rievoca una sfida del 1454 tra due nobili che si contendevano la mano della figlia del castellano." }, { q: "Qual è il fiume più lungo che attraversa la pianura veneta sfociando nell'Adriatico?", options: ["Piave", "Adige", "Po", "Brenta"], correct: 2, anecdote: "Il Delta del Po, situato principalmente in provincia di Rovigo, è una delle zone umide più importanti d'Europa e riserva della biosfera." }, { q: "Quale specialità culinaria veneta consiste in fegato cotto con abbondante cipolla?", options: ["Fegato alla veneziana", "Sarde in saor", "Bigoli in salsa", "Fegato alla trevigiana"], correct: 0, anecdote: "I veneziani sostituirono i fichi (usati dai romani per mitigare l'odore del fegato) con le cipolle, abbondanti nelle lagune." }, { q: "Quale noto esploratore veneziano scrisse 'Il Milione', raccontando il suo viaggio in Cina?", options: ["Cristoforo Colombo", "Marco Polo", "Amerigo Vespucci", "Giovanni Caboto"], correct: 1, anecdote: "Marco Polo dettò le sue memorie a Rustichello da Pisa mentre si trovava in prigione a Genova." }, { q: "Quale città veneta è soprannominata 'Urbs Picta' per i suoi numerosi cicli di affreschi?", options: ["Vicenza", "Verona", "Padova", "Treviso"], correct: 2, anecdote: "Padova ospita la Cappella degli Scrovegni di Giotto, capolavoro assoluto della pittura del Trecento." }, { q: "Quale città veneta è storicamente legata alla produzione della Grappa e ospita un celebre Museo ad essa dedicato?", options: ["Bassano del Grappa", "Conegliano", "Soave", "Adria"], correct: 0, anecdote: "La distilleria Nardini, situata all'ingresso del Ponte degli Alpini, è la più antica d'Italia, fondata nel 1779." }, { q: "In quale città si trova lo storico 'Caffè Pedrocchi', noto come il caffè senza porte?", options: ["Venezia", "Vicenza", "Padova", "Treviso"], correct: 2, anecdote: "Era chiamato 'senza porte' perché fino al 1916 rimaneva aperto giorno e notte, accogliendo intellettuali e studenti." }, { q: "Qual è il nome del tipico piatto veneto a base di pasta fresca lunga e ruvida, condita spesso con salsa d'anatra o sarde?", options: ["Orecchiette", "Bigoli", "Tagliolini", "Passatelli"], correct: 1, anecdote: "Il nome deriva dal termine dialettale 'bigat' (bruco), per via della forma ottenuta storicamente con un torchio manuale chiamato 'torcio'." }, { q: "Quale celebre opera lirica inaugura tradizionalmente la stagione all'Arena di Verona?", options: ["La Traviata", "Tosca", "Aida", "Turandot"], correct: 2, anecdote: "L'Aida di Verdi è l'opera simbolo dell'Arena, rappresentata per la prima volta nell'anfiteatro nel 1913 per celebrare il centenario della nascita del compositore." }, { q: "Quale di queste isole veneziane è famosa in tutto il mondo per la lavorazione artigianale del vetro soffiato?", options: ["Burano", "Murano", "Torcello", "Pellestrina"], correct: 1, anecdote: "Nel 1291, per decreto della Repubblica, tutte le fornaci di Venezia furono spostate a Murano per prevenire incendi in città." }, { q: "Quale città veneta è cinta da mura medievali perfettamente conservate e percorribili a piedi sulla sommità?", options: ["Cittadella", "Rovigo", "Belluno", "Portogruaro"], correct: 0, anecdote: "Il camminamento di ronda di Cittadella è uno dei pochi in Europa a essere rimasto integro e interamente percorribile." }, { q: "Cosa si intende in Veneto con il termine 'Ombra' quando ci si riferisce a un'abitudine sociale?", options: ["Un piccolo panino", "Un bicchiere di vino", "Un caffè macchiato", "Un riposo pomeridiano"], correct: 1, anecdote: "Il nome deriva dall'antica abitudine dei mercanti di Venezia di posizionare i banchi del vino all'ombra del campanile di San Marco per tenerlo fresco." }, { q: "Quale isola della laguna di Venezia è celebre per le sue case coloratissime e la produzione di merletti?", options: ["Murano", "Burano", "Lido", "Giudecca"], correct: 1, anecdote: "Si dice che i colori vivaci servissero ai pescatori per riconoscere la propria casa anche in presenza di fitta nebbia." }, { q: "In quale mese si svolge solitamente lo storico Carnevale di Venezia?", options: ["Gennaio", "Febbraio", "Marzo", "Aprile"], correct: 1, anecdote: "Le date variano ogni anno in base alla Pasqua, ma il periodo principale cade sempre nel mese di febbraio." }, { q: "Qual è il nome del fiume che attraversa la città di Verona formando una caratteristica ansa a forma di S?", options: ["Brenta", "Sile", "Adige", "Livenza"], correct: 2, anecdote: "L'Adige è il secondo fiume più lungo d'Italia dopo il Po e ha modellato urbanisticamente il centro storico veronese." }, { q: "Qual è il nome dell'antipasto veneziano a base di sarde fritte, cipolle agrodolci, pinoli e uvetta?", options: ["Sarde in saor", "Sarde scottadito", "Baccalà mantecato", "Alici marinate"], correct: 0, anecdote: "Il 'saor' era nato come metodo di conservazione dei pescatori: l'aceto e la cipolla permettevano di preservare il pesce per diversi giorni a bordo delle barche." }, { q: "Quale famoso seduttore e scrittore nacque a Venezia nel 1725?", options: ["Giacomo Casanova", "Carlo Goldoni", "Antonio Vivaldi", "Lord Byron"], correct: 0, anecdote: "Casanova fu l'unico a riuscire a evadere dal carcere dei Piombi, situato nel sottotetto di Palazzo Ducale." }, { q: "Come si chiama la tipica imbarcazione da trasporto che percorreva il fiume Brenta tra Padova e Venezia?", options: ["Vaporetto", "Burchiello", "Gondola", "Bragozzo"], correct: 1, anecdote: "Il Burchiello era una lussuosa imbarcazione per il trasporto di nobili che volevano raggiungere le proprie ville in terraferma." }, { q: "Qual è il nome del formaggio DOP tipico dell'altopiano dei Sette Comuni in provincia di Vicenza?", options: ["Montasio", "Piave", "Asiago", "Taleggio"], correct: 2, anecdote: "Originariamente l'Asiago veniva prodotto solo con latte di pecora; la produzione con latte vaccino iniziò nel 1500." }, { q: "Quale compositore veneziano, soprannominato il 'Prete Rosso', scrisse il concerto 'Le quattro stagioni'?", options: ["Giuseppe Verdi", "Antonio Vivaldi", "Tomaso Albinoni", "Claudio Monteverdi"], correct: 1, anecdote: "Vivaldi era chiamato 'Prete Rosso' per il colore naturale della sua chioma." }, { q: "Quale ortaggio rosso di forma allungata o a palla è tipico della zona di Treviso?", options: ["Radicchio", "Pomodoro", "Cipolla", "Peperone"], correct: 0, anecdote: "Il Radicchio Rosso di Treviso IGP 'Tardivo' viene lavorato con una tecnica di imbianchimento in acqua risorgiva." }, { q: "Quale provincia veneta è la più settentrionale e interamente montana?", options: ["Vicenza", "Belluno", "Treviso", "Verona"], correct: 1, anecdote: "Belluno è l'unico capoluogo di provincia italiano il cui territorio comunale rientra interamente in un Parco Nazionale (Dolomiti Bellunesi)." }, { q: "Che cos'è lo 'Spritz' nel suo formato più tradizionale e antico?", options: ["Prosecco e Aperol", "Vino bianco e acqua frizzante", "Vino rosso e gassosa", "Prosecco e Gin"], correct: 1, anecdote: "Lo spritz originale non prevedeva liquori colorati, ma solo l'aggiunta di acqua per 'allungare' i vini troppo forti." }, { q: "Qual è il termine dialettale veneto usato per indicare una persona un po' tonta o goffa?", options: ["Fante", "Mona", "Toso", "Putìno"], correct: 1, anecdote: "Sebbene in origine avesse un significato anatomico, nel linguaggio colloquiale moderno è usato per descrivere una persona che si comporta in modo stupido." }, { q: "Come viene chiamato colloquialmente un ragazzo giovane in molte zone del Veneto?", options: ["Bocia", "Toso", "Fio", "Tutte le precedenti"], correct: 3, anecdote: "A seconda della provincia si preferisce 'Toso' (Vicenza/Treviso), 'Fio' (Venezia) o 'Bocia' (Verona/Padova)." }, { q: "Quale città veneta è nota per la leggenda studentesca legata al Prato della Valle?", options: ["Verona", "Padova", "Venezia", "Rovigo"], correct: 1, anecdote: "La leggenda universitaria padovana vuole che chi attraversa il centro di Prato della Valle o guarda negli occhi le statue non riuscirà a laurearsi." }, { q: "In quale città veneta si trova il parco divertimenti Gardaland?", options: ["Castelnuovo del Garda", "Jesolo", "Abano Terme", "Cortina d'Ampezzo"], correct: 0, anecdote: "Gardaland ha aperto nel 1975 ed è oggi uno dei parchi a tema più visitati d'Europa." }, { q: "Quale località balneare veneziana è nota per la sua lunghissima isola pedonale e la vita notturna?", options: ["Bibione", "Caorle", "Jesolo", "Rosolina Mare"], correct: 2, anecdote: "Jesolo è nota per via Bafile, una delle isole pedonali più lunghe d'Europa, centro della vita notturna tra discoteche e beach club." }, { q: "Cosa significa l'espressione veneta 'Fare baggy'?", options: ["Andare a fare shopping", "Andare a ballare", "Fare filone a scuola", "Studiare insieme"], correct: 2, anecdote: "È il termine gergale per indicare l'assenza ingiustificata da scuola (marinare)." }, { q: "Quale bevanda analcolica gassata, nata a Venezia nel 1949, è tipicamente rossa e speziata?", options: ["Chinotto", "Cedrata", "Ginger (Spuma)", "MoleCola"], correct: 2, anecdote: "Il Ginger veneto veniva storicamente mescolato al vino bianco per creare lo spritz analcolico per i più piccoli." }, { q: "Quale artista vicentino ha fuso lo slang americano con quello veneto nella musica trap?", options: ["Myss Keta", "Madame", "MamboLosco", "Sangiovanni"], correct: 2, anecdote: "MamboLosco ha reso virali espressioni come 'Sugoso', unendo l'immaginario veneto alla trap." }, { q: "In Veneto, cosa si intende solitamente se si dà del 'mago' a qualcuno in senso ironico?", options: ["Che è bravissimo", "Che è un tipo strano o imbranato", "Che sa fare i trucchi", "Che è molto intelligente"], correct: 1, anecdote: "È un classico esempio di antifrasi veneta: dare del 'mago' a qualcuno che ha appena commesso un errore banale." }, { q: "Quale calzatura è diventata un simbolo ironico d'appartenenza nelle zone rurali del Veneto?", options: ["Mocassino", "Stivale di gomma", "Scarpa antinfortunistica", "Pantofola di velluto"], correct: 1, anecdote: "Lo stivale di gomma verde è un'icona delle sagre e dei 'party ignoranti' in agricampeggio." } ];

//PULL VENETO
// 1. Array Dati: Centri di aggregazione (Esempio)
const centriVeneto = [
    {
        nome: "Centro San Gaetano",
        citta: "Padova",
        coords: [45.409, 11.884],
        img: "https://esempio.it/padova.jpg",
        info: "Hub culturale e spazio espositivo."
    },
    {
        nome: "Fabbrica del Vedere",
        citta: "Venezia",
        coords: [45.434, 12.338],
        img: "https://esempio.it/venezia.jpg",
        info: "Spazio dedicato alla cultura visuale."
    }
];

// 2. Funzione Principale
function esploraAreaVeneto() {
    // Creazione overlay modale
    const overlay = document.createElement('div');
    overlay.id = 'map-overlay';
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; display:flex; justify-content:center; align-items:center;";
    
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-canvas';
    mapContainer.style = "width:80%; height:80%; border-radius:8px; position:relative;";
    
    const closeBtn = document.createElement('button');
    closeBtn.innerText = "X";
    closeBtn.style = "position:absolute; top:10px; right:10px; z-index:1001; cursor:pointer;";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    mapContainer.appendChild(closeBtn);
    overlay.appendChild(mapContainer);
    document.body.appendChild(overlay);

    // Inizializzazione Leaflet
    const map = L.map('map-canvas').setView([45.440, 12.315], 8); // Focus Veneto

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 3. Inserimento Punti (Pings)
    centriVeneto.forEach(centro => {
        const marker = L.marker(centro.coords).addTo(map);
        const popupContent = `
            <div style="text-align:center;">
                <img src="${centro.img}" style="width:100px; height:auto; display:block; margin-bottom:5px;">
                <strong>${centro.nome}</strong><br>
                <span>${centro.citta}</span><br>
                <p style="font-size:12px;">${centro.info}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
} 
//codice script
document.addEventListener('DOMContentLoaded', () => {
    const aiWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');

    // Sostituisci con la tua chiave sk-or-v1-... ottenuta da OpenRouter
    const OPENROUTER_API_KEY = "xxxxxxx";

    // Funzione per gestire l'apertura della chat
    const openChat = () => {
        if (aiWindow) {
            aiWindow.style.display = 'flex';
            aiWindow.classList.remove('chat-hidden');
            aiWindow.classList.add('chat-visible');
            if (openBtn) openBtn.style.display = 'none';
        }
    };

    // Funzione per gestire la chiusura della chat
    const closeChat = () => {
        if (aiWindow) {
            aiWindow.classList.remove('chat-visible');
            aiWindow.classList.add('chat-hidden');
            aiWindow.style.display = 'none';
            if (openBtn) openBtn.style.display = 'flex';
        }
    };

    if (openBtn) openBtn.addEventListener('click', openChat);
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    // Funzione per aggiungere messaggi grafici al container
    function appendMessage(text, isUser = false) {
        const wrapper = document.createElement('div');
        wrapper.className = isUser ? 'msg-user flex justify-end mb-4' : 'msg-bot mb-4';
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const userStyle = 'background-color: #4f46e5 !important; color: white !important; padding: 12px 16px; border-radius: 1.5rem 1.5rem 0 1.5rem; max-width: 85%; font-size: 14px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);';
        const botStyle = 'background-color: rgba(255,255,255,0.05); color: white; padding: 12px 16px; border-radius: 1.5rem 1.5rem 1.5rem 0; border: 1px solid rgba(255,255,255,0.1); max-width: 85%; font-size: 14px;';
        
        bubble.setAttribute('style', isUser ? userStyle : botStyle);
        bubble.textContent = text;
        
        wrapper.appendChild(bubble);
        chatContainer.appendChild(wrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return wrapper; // Restituiamo il wrapper per poterlo rimuovere se serve (es. loading)
    }

    // Gestione invio modulo e chiamata IA
    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userInput = chatInput.value.trim();
            if (!userInput) return;

            // 1. Mostra messaggio dell'utente
            appendMessage(userInput, true);
            chatInput.value = '';

            // 2. Mostra indicatore di caricamento
            const loadingMsg = appendMessage("Olga sta scrivendo...", false);

            try {
                // 3. Chiamata API a Llama 3.3 70B (Versione Gratuita)
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.origin,
                        "X-Title": "Olga Bot"
                    },
                    body: JSON.stringify({
                        "model": "meta-llama/llama-3.3-70b-instruct:free",
                        "messages": [
                            {
                                "role": "system", 
                                "content": "Sei Olga-bot, l'assistente di Ri-Generazioni. Il tuo compito è connettere utenti under 30 con opportunità di lavoro, formazione e attivismo attraverso messaggi brevi e discorsivi, simulando una conversazione naturale in chat. Scrivi in modo esclusivamente narrativo: non usare mai elenchi puntati, grassetti, titoli o schemi. Evita saluti cerimoniosi, preamboli o commenti inutili. Segui il flusso del discorso in modo fluido e non fare mai più di una domanda alla volta. Inizia sempre la prima interazione chiedendo all'utente in cosa puoi aiutarlo. Se l'utente risponde con un interesse specifico o accetta una tua proposta, rimani focalizzato su quel tema fino a esaurimento delle informazioni. Non tornare a fare domande generali (come 'cosa cerchi?'') se la conversazione è già centrata su un evento o un'opportunità specifica. Solo dopo aver inquadrato l'interesse, chiedi un dato alla volta (come l'età o la città) se necessario per proseguire. Quando trasmetti informazioni su bandi o corsi, inseriscile direttamente nel testo del messaggio in modo discorsivo, indicando cosa fare e le scadenze. Mantieni un tono asciutto e pragmatico, evitando di saltare da un argomento all'altro se l'utente ha già espresso una preferenza."
                            },
                            { "role": "user", "content": userInput }
                        ],
                        "temperature": 0.7
                    })
                });

                const data = await response.json();
                
                // Rimuovi il messaggio di caricamento
                chatContainer.removeChild(loadingMsg);

                if (data.choices && data.choices[0]) {
                    const aiText = data.choices[0].message.content;
                    appendMessage(aiText, false);
                } else {
                    appendMessage("Al momento non riesco a risponderti. Riprova tra poco!", false);
                }

            } catch (error) {
                if (loadingMsg) chatContainer.removeChild(loadingMsg);
                appendMessage("Errore di connessione. Controlla la tua chiave API.", false);
                console.error("Errore API:", error);
            }
        });
    }
});


//GIOCOQUIZ
function GoGIOCOQUIZ() {
    window.location.hash = "gioco-quiz";

    const pageWrapper = document.getElementById('page-wrapper');
    const footer = document.querySelector('footer');
    if (pageWrapper) pageWrapper.style.display = 'none';
    if (footer) footer.style.display = 'none';

    const existingQuiz = document.getElementById('quiz-section-container');
    if (existingQuiz) existingQuiz.remove();

    const quizSection = document.createElement('div');
    quizSection.id = 'quiz-section-container';
    quizSection.className = "min-h-screen w-full bg-[#F0B27A] pt-[100px] pb-12 flex items-center justify-center relative z-10 transition-colors duration-700";

    quizSection.innerHTML = `
        <div class="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-xl w-[90%] text-slate-900 relative">
            <div id="setup-screen" class="text-center">
                <h2 class="text-4xl font-black uppercase italic tracking-tighter mb-4 text-indigo-600">Quiz Veneto</h2>
                <p class="text-slate-600 font-bold mb-8 uppercase text-xs tracking-widest leading-relaxed">
                    Metti alla prova la tua conoscenza locale.<br>Leggi gli aneddoti per scoprire i segreti del territorio.
                </p>
                <button id="start-quiz-btn" class="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">Inizia la sfida</button>
            </div>

            <div id="quiz-screen" class="hidden">
                <div class="flex justify-between items-center mb-6">
                    <span id="question-counter" class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]"></span>
                </div>
                <div id="question-text" class="text-2xl font-black mb-6 leading-tight text-slate-800"></div>
                <div id="options-container" class="space-y-3"></div>
                
                <div id="feedback-area" class="mt-6 hidden">
                    <div id="feedback-container" class="p-4 rounded-2xl mb-4">
                        <p id="feedback-text" class="font-bold text-sm leading-relaxed"></p>
                    </div>
                    <button id="next-question-btn" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-3">
                        Avanti <i class="fas fa-arrow-right text-xs"></i>
                    </button>
                </div>
            </div>

            <div id="result-screen" class="hidden text-center">
                <h3 class="text-2xl font-black mb-2 uppercase italic text-indigo-600">Completato!</h3>
                <div id="final-score" class="text-7xl font-black mb-4 text-slate-900">0/0</div>
                <p id="result-message" class="mb-8 font-bold text-slate-500 uppercase text-xs tracking-widest"></p>
                <button onclick="history.pushState('', document.title, window.location.pathname); window.location.reload();" 
                    class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
                    <i class="fas fa-arrow-left mr-2"></i> Torna alla home
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(quizSection);

    //SORT
    // // Algoritmo Fisher-Yates per un rimescolamento reale
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    // All'interno di GoGIOCOQUIZ:
    const shuffledQuestions = shuffle([...allQuestions]);
    const questions = shuffledQuestions.slice(0, 5);
        let currentIdx = 0;
        let score = 0;

    const setupScreen = document.getElementById('setup-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackText = document.getElementById('feedback-text');
    const nextBtn = document.getElementById('next-question-btn');
    const counter = document.getElementById('question-counter');

    document.getElementById('start-quiz-btn').onclick = () => {
        setupScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        loadQuestion();
    };

    function loadQuestion() {
        feedbackArea.classList.add('hidden');
        optionsContainer.innerHTML = '';
        const q = questions[currentIdx];
        
        counter.innerText = `Domanda ${currentIdx + 1}/${questions.length}`;
        document.getElementById('question-text').innerText = q.q;

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = "w-full py-4 px-6 text-left bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold hover:border-indigo-400 hover:bg-indigo-50 transition-all";
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(i, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selected, btn) {
        const q = questions[currentIdx];
        const allBtns = optionsContainer.querySelectorAll('button');
        allBtns.forEach(b => b.disabled = true);

        feedbackArea.classList.remove('hidden');
        
        if (selected === q.correct) {
            score++;
            btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
            feedbackContainer.className = "p-4 rounded-2xl mb-4 bg-emerald-100 text-emerald-800";
            feedbackText.innerHTML = `<strong>Corretto!</strong><br>${q.anecdote}`;
        } else {
            btn.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700');
            allBtns[q.correct].classList.add('border-emerald-500', 'text-emerald-700');
            feedbackContainer.className = "p-4 rounded-2xl mb-4 bg-rose-100 text-rose-800";
            feedbackText.innerHTML = `<strong>Sbagliato...</strong><br>${q.anecdote}`;
        }
    }

    nextBtn.onclick = () => {
        currentIdx++;
        if (currentIdx < questions.length) {
            loadQuestion();
        } else {
            showFinalResults();
        }
    };

    function showFinalResults() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        quizSection.classList.replace('bg-[#F0B27A]', 'bg-[#A8DCD2]');
        document.getElementById('final-score').innerText = `${score}/${questions.length}`;
        document.getElementById('result-message').innerText = score >= 3 ? "Complimenti, conosci bene il Veneto!" : "Puoi fare di meglio, riprova!";
    }

    window.scrollTo(0, 0);
}

/**
 * GESTIONE HUB YOUTHVOICE - CODICE INTEGRATO
 */// --- 1. GESTIONE MODAL ---
function toggleLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        const isHidden = modal.classList.toggle('hidden');
        document.body.style.overflow = isHidden ? 'auto' : 'hidden';
    }
}

function toggleRegisterModal() {
    const regModal = document.getElementById('register-modal');
    if (regModal) {
        const isHidden = regModal.classList.toggle('hidden');
        document.body.style.overflow = isHidden ? 'auto' : 'hidden';
    }
}

function toggleLogoutModal() {
    const modal = document.getElementById('logout-confirm-modal');
    if (modal) {
        const isHidden = modal.classList.toggle('hidden');
        document.body.style.overflow = isHidden ? 'auto' : 'hidden';
    }
}

function toggleEntityField(show) {
    const container = document.getElementById('entity-name-container');
    const input = document.getElementById('reg-ente');
    if (container && input) {
        container.classList.toggle('hidden', !show);
        input.required = show;
        if (!show) input.value = "";
    }
}

// --- 2. LOGICA SESSIONE E INTERFACCIA ---

function controllaSessione() {
    const sessionUser = JSON.parse(localStorage.getItem('user_session'));
    if (!sessionUser) return;

    // Navbar
    const btnLogin = document.getElementById('btn-login');
    const userProfile = document.getElementById('user-profile');
    const navName = document.querySelector('#user-profile span');
    const navOp = document.getElementById('nav-operatori');
    const navAvatar = document.querySelector('#user-profile img');

    if (btnLogin) btnLogin.classList.add('hidden');
    if (userProfile) userProfile.classList.remove('hidden');
    if (navName) navName.innerText = sessionUser.nome + " " + sessionUser.cognome;
    
    // Carica foto nella navbar se esiste
    if (navAvatar && sessionUser.profilePic) {
        navAvatar.src = sessionUser.profilePic;
    }

    if (navOp) {
        navOp.classList.toggle('hidden', sessionUser.tipo !== 'ente');
    }

    // Sezione Personale (Pagina/Operatori)
    const nameDisplays = document.querySelectorAll('#user-full-name');
    const descDisplays = document.querySelectorAll('#user-role-desc');
    const profileImg = document.getElementById('profile-img-display');

    nameDisplays.forEach(el => el.innerText = sessionUser.nome + " " + sessionUser.cognome);
    descDisplays.forEach(el => {
        el.innerText = (sessionUser.tipo === 'ente' && sessionUser.ente) 
            ? "Operatore di " + sessionUser.ente 
            : "Membro attivo della community";
    });

    if (profileImg && sessionUser.profilePic) {
        profileImg.src = sessionUser.profilePic;
    }
}

// --- 3. GESTIONE FOTO PROFILO ---

function setupProfilePicture() {
    const fileInput = document.getElementById('profile-file-input');
    const displayImg = document.getElementById('profile-img-display');
    const navAvatar = document.querySelector('#user-profile img');
    let sessionUser = JSON.parse(localStorage.getItem('user_session'));

    if (!fileInput || !displayImg || !sessionUser) return;

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                
                // Aggiorna UI
                displayImg.src = base64Image;
                if (navAvatar) navAvatar.src = base64Image;
                
                // Salva in Sessione
                sessionUser.profilePic = base64Image;
                localStorage.setItem('user_session', JSON.stringify(sessionUser));
                
                // Salva nel Database Utenti Globale
                let users = JSON.parse(localStorage.getItem('hub_users')) || [];
                const idx = users.findIndex(u => u.email === sessionUser.email);
                if (idx !== -1) {
                    users[idx].profilePic = base64Image;
                    localStorage.setItem('hub_users', JSON.stringify(users));
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// --- 4. LOGIN E REGISTRAZIONE ---

function gestisciRegistrazione(e) {
    e.preventDefault();
    const emailInput = document.getElementById('reg-email').value.toLowerCase().trim();
    const pass = document.getElementById('reg-pass').value;
    const confirmPass = document.getElementById('reg-pass-confirm').value;

    if (pass !== confirmPass) { alert("Le password non coincidono!"); return; }

    let users = JSON.parse(localStorage.getItem('hub_users')) || [];
    if (users.some(u => u.email === emailInput)) { alert("Email già in uso!"); return; }

    const newUser = {
        nome: document.getElementById('reg-nome').value,
        cognome: document.getElementById('reg-cognome').value,
        email: emailInput,
        password: pass,
        provincia: document.getElementById('reg-provincia').value,
        tipo: document.querySelector('input[name="u-type"]:checked').value,
        ente: document.getElementById('reg-ente')?.value || "",
        profilePic: null
    };

    users.push(newUser);
    localStorage.setItem('hub_users', JSON.stringify(users));
    alert("Registrazione completata!");
    toggleRegisterModal();
    toggleLoginModal();
}

function gestisciLogin(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]').value.toLowerCase().trim();
    const passInput = e.target.querySelector('input[type="password"]').value;
    
    const users = JSON.parse(localStorage.getItem('hub_users')) || [];
    const validUser = users.find(u => u.email === emailInput && u.password === passInput);

    if (validUser) {
        localStorage.setItem('user_session', JSON.stringify(validUser));
        controllaSessione();
        toggleLoginModal();
        e.target.reset();
    } else {
        alert("Credenziali errate.");
    }
}

function handleLogout() { toggleLogoutModal(); }

function confirmLogoutAction() {
    localStorage.removeItem('user_session');
    window.location.reload();
}


// --- 5. INIT ---

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(controllaSessione, 100);
    const regForm = document.getElementById('hub-register-form');
    const loginForm = document.getElementById('hub-login-form');
    if (regForm) regForm.addEventListener('submit', gestisciRegistrazione);
    if (loginForm) loginForm.addEventListener('submit', gestisciLogin);
});

// Funzione per caricare i componenti comuni
const loadLayout = () => {
    const navHTML = `

    <nav class="fixed top-0 w-full z-[100] bg-slate-950/90 backdrop-blur-md backdrop-saturate-150 border-b border-white/5 px-6 py-4 flex justify-between items-center text-white">
        <div class="text-2xl font-black tracking-tighter italic text-indigo-500">YouthVoice</div>
        <div class="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="index.html" class="hover:text-indigo-400 transition-colors">HOME</a>
            <a href="chi-siamo.html" class="text-white hover:text-indigo-400">Chi Siamo</a>
            <a href="GoOpportunity.html" class="hover:text-indigo-400 transition-colors">OPPORTUNITà</a>
           <a href="OPERATORI.html" id="nav-operatori" class="hidden text-sm font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors">Operatori</a>
        </div>
        <div class="flex items-center gap-4">
        <button id="btn-login" onclick="toggleLoginModal()" class="px-6 py-2 bg-white text-black font-bold text-xs rounded-full hover:bg-indigo-500 hover:text-white transition-all">
            ENTRA NELL'HUB
        </button>

        <div id="user-profile" class="hidden flex items-center gap-3">
            <div class="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-full border border-white/10">
                <i class="far fa-user text-indigo-400"></i>
                <span class="text-xs font-bold text-white">elenadivino</span>
            </div>
            <button onclick="handleLogout()" class="text-slate-400 hover:text-rose-500 transition-colors">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </div>
</nav>`;

    const footerHTML = `
        <footer class="bg-slate-900 py-12 px-6 text-center border-t border-white/5">
        <p class="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em]">YouthVoice 2026 | Progetto di partecipazione giovanile Verona, Vicenza, Padova, Belluno, Mantova.</p>
    </footer>`;

    // Inserisce i componenti nei contenitori corrispondenti
    const navContainer = document.getElementById('nav-placeholder');
    const footerContainer = document.getElementById('footer-placeholder');

    if (navContainer) navContainer.innerHTML = navHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;
};

// Esegui la funzione al caricamento del DOM
document.addEventListener('DOMContentLoaded', loadLayout);