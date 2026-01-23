//CARICAMENTO PAGINA
// Gestore della navigazione basato su hash
function handleRouting() {
    const currentHash = window.location.hash;
    if (currentHash === "#articolo-gio-biondo") {
        GoArt3();
    } 
    else if (currentHash === "#articolo-arte-rigenerazione") {
        GoArt2();
    } 
    else if (currentHash === "#articolo-coworking") {
        GoArt1();
    }
    else if (currentHash === "#gioco-quiz") {
        GoGIOCOQUIZ();
    }
    else if (currentHash === "#xxx") {
        GoArt1();
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

//PULL DI DOMANDE per quiz
    const allQuestions = [
        {
            q: "Qual è il soprannome della città di Venezia, riferito al suo storico dominio marittimo?",
            options: ["La Superba", "La Serenissima", "La Dotta", "La Dominante"],
            correct: 1,
            anecdote: "Il termine 'Serenissima' deriva dal titolo spettante ai Dogi e rifletteva la stabilità e la giustizia del governo veneziano."
        },
        {
            q: "In quale comune veneto si produce il celebre vino rosso 'Amarone'?",
            options: ["Negrar di Valpolicella", "Asolo", "Soave", "Bardolino"],
            correct: 0,
            anecdote: "L'Amarone nasce da un errore: un produttore dimenticò una botte di Recioto (dolce), permettendo ai lieviti di fermentare tutti gli zuccheri, rendendo il vino amaro."
        },
        {
            q: "Quale università veneta, fondata nel 1222, ospita il primo teatro anatomico stabile al mondo?",
            options: ["Università di Verona", "Università di Venezia (Ca' Foscari)", "Università di Padova", "Università di Treviso"],
            correct: 2,
            anecdote: "Il Teatro Anatomico di Padova, costruito nel 1594, permetteva agli studenti di assistere alle autopsie da una struttura a imbuto."
        },
        {
            q: "Che cos'è il 'Baccalà alla vicentina'?",
            options: ["Merluzzo fresco fritto", "Stoccafisso essiccato e cotto a fuoco lento", "Zuppa di pesce di laguna", "Pesce spada grigliato"],
            correct: 1,
            anecdote: "Nonostante il nome, si usa lo stoccafisso (merluzzo essiccato) importato dalle isole Lofoten in Norvegia fin dal 1432."
        },
        {
            q: "Come si chiama la maschera veneziana che viene tradizionalmente rappresentata con un lungo naso a becco?",
            options: ["Arlecchino", "Pantalone", "Medico della Peste", "Colombina"],
            correct: 2,
            anecdote: "Il lungo naso a becco veniva riempito di erbe profumate per proteggere il medico dai presunti miasmi del contagio."
        },
        {
            q: "In quale città si svolge ogni due anni la famosa partita a scacchi con personaggi viventi?",
            options: ["Cittadella", "Marostica", "Castelfranco Veneto", "Monselice"],
            correct: 1,
            anecdote: "La tradizione rievoca una sfida del 1454 tra due nobili che si contendevano la mano della figlia del castellano."
        },
        {
            q: "Qual è il fiume più lungo che attraversa la pianura veneta sfociando nell'Adriatico?",
            options: ["Piave", "Adige", "Po", "Brenta"],
            correct: 2,
            anecdote: "Il Delta del Po, situato principalmente in provincia di Rovigo, è una delle zone umide più importanti d'Europa e riserva della biosfera."
        },
        {
            q: "Quale specialità culinaria veneta consiste in fegato cotto con abbondante cipolla?",
            options: ["Fegato alla veneziana", "Sarde in saor", "Bigoli in salsa", "Fegato alla trevigiana"],
            correct: 0,
            anecdote: "I veneziani sostituirono i fichi (usati dai romani per mitigare l'odore del fegato) con le cipolle, abbondanti nelle lagune."
        },
        {
            q: "Quale noto esploratore veneziano scrisse 'Il Milione', raccontando il suo viaggio in Cina?",
            options: ["Cristoforo Colombo", "Marco Polo", "Amerigo Vespucci", "Giovanni Caboto"],
            correct: 1,
            anecdote: "Marco Polo dettò le sue memorie a Rustichello da Pisa mentre si trovava in prigione a Genova."
        },
        {
            q: "Quale città veneta è soprannominata 'Urbs Picta' per i suoi numerosi cicli di affreschi?",
            options: ["Vicenza", "Verona", "Padova", "Treviso"],
            correct: 2,
            anecdote: "Padova ospita la Cappella degli Scrovegni di Giotto, capolavoro assoluto della pittura del Trecento."
        }
       ];  

//codice script
document.addEventListener('DOMContentLoaded', () => {
    const aiWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const triggerBtn = document.getElementById('trigger-Olga-Bot');
    const closeBtn = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');

    let step = 0;
    const flow = [
        "Se potessi attivare un servizio o uno spazio che oggi non c'è, a cosa penseresti?",
        "Cosa renderebbe più semplice vivere la tua città ogni giorno?",
        "Messaggio ricevuto. Questi dati servono a definire i bisogni della nostra generazione in Veneto."
    ];

    const openChat = () => {
        aiWindow.classList.remove('chat-hidden');
        aiWindow.classList.add('chat-visible');
        openBtn.style.display = 'none';
        if (window.innerWidth <= 1024) document.body.style.overflow = 'hidden';
    };

    const closeChat = () => {
        aiWindow.classList.remove('chat-visible');
        aiWindow.classList.add('chat-hidden');
        openBtn.style.display = 'flex';
        document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', openChat);
    triggerBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);

    function appendMessage(text, isUser = false) {
        const wrapper = document.createElement('div');
        wrapper.className = isUser ? 'msg-user' : 'msg-bot';
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;
        wrapper.appendChild(bubble);
        chatContainer.appendChild(wrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (text) {
            appendMessage(text, true);
            chatInput.value = '';
            
            if (step < flow.length) {
                setTimeout(() => {
                    appendMessage(flow[step], false);
                    step++;
                }, 800);
            }
        }
    });
});


//ARTICOLO 1
function GoArt1() {
    // 1. Cambia l'URL aggiungendo l'identificativo dell'articolo
    // Questo permette al browser di "ricordare" dove sei se ricarichi
    window.location.hash = "articolo-coworking";

    const mainWrapper = document.querySelector('body'); 
    const currentHeader = document.querySelector('header');
    const currentMain = document.querySelector('main');

    if (currentHeader && currentMain) {
        currentHeader.remove();
        currentMain.remove();

        const articleHTML = `
        <header class="relative h-[60vh] w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pt-20">
    <img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1920&q=80" 
         class="absolute inset-0 w-full h-full object-cover opacity-40">
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    <div class="relative z-10 max-w-4xl pt-20">
        <span class="inline-block px-4 py-1 border border-indigo-500 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 italic">Servizi & Networking</span>
        <h1 class="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase text-white">Coworking gratuiti: <br><span class="text-indigo-500">La mappa definitiva.</span></h1>
    </div>
</header>

<main class="w-full bg-white text-slate-900 py-20 px-6 md:px-20 relative z-20">
    <div class="max-w-4xl mx-auto">
        <p class="text-xl md:text-2xl font-medium text-slate-600 mb-12 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
            Trovare uno spazio tranquillo per studiare o lavorare tra Verona e Mantova non deve essere per forza un costo.
        </p>

        <div class="prose prose-slate lg:prose-xl max-w-none text-slate-800">
            <p>
                La mobilità lavorativa e lo studio universitario richiedono sempre più spazi flessibili. Se sei un freelance o uno studente fuori sede, sai che il costo di un ufficio o di un abbonamento mensile può pesare sul budget. Fortunatamente, l'asse Verona-Mantova offre soluzioni gratuite o a basso impatto che uniscono efficienza e networking.
            </p>

            <h3 class="text-2xl font-bold mt-8 mb-4">Biblioteche 2.0 e Centri Culturali</h3>
            <p>
                Oltre alle classiche aule studio, molti poli culturali si sono evoluti in veri hub tecnologici. Non offrono solo una sedia, ma postazioni cablate e ambienti stimolanti:
            </p>
            <ul class="list-disc pl-6 mb-6">
                <li><strong>Biblioteche Civiche Smart:</strong> Molte strutture comunali offrono oggi Wi-Fi ad alta velocità e aree dedicate al silenzio operativo, accessibili con una semplice tessera gratuita.</li>
                <li><strong>Informagiovani e Hub Territoriali:</strong> Spazi nati per l'orientamento che mettono a disposizione postazioni PC e connessione per chi sta avviando un progetto professionale.</li>
            </ul>

            <h3 class="text-2xl font-bold mt-8 mb-4">Spazi Ibridi e Progetti Europei</h3>
            <p>
                Esistono progetti finanziati che permettono l'accesso a coworking professionali a costo zero per specifiche categorie (under 35, startup o donne imprenditrici). È fondamentale monitorare i bandi locali che trasformano immobili pubblici in incubatori aperti al pubblico.
            </p>

            <h3 class="text-2xl font-bold mt-8 mb-4">Perché scegliere uno spazio gratuito?</h3>
            <p>
                Lavorare fuori casa non serve solo a cambiare aria. I vantaggi sono operativi e psicologici:
            </p>
            <ul class="list-disc pl-6 mb-6">
                <li><strong>Network Spontaneo:</strong> Incontrare altri professionisti del territorio davanti alla macchinetta del caffè può far nascere collaborazioni inaspettate.</li>
                <li><strong>Focus e Produttività:</strong> Separare l'ambiente domestico da quello lavorativo aumenta la concentrazione e riduce lo stress.</li>
                <li><strong>Accessibilità:</strong> Abbattere le barriere economiche permette a chiunque, indipendentemente dal capitale iniziale, di avere un ufficio professionale.</li>
            </ul>

            <h3 class="text-2xl font-bold mt-8 mb-4">Consigli per il "Nomade Digitale" Locale</h3>
            <p>
                Per sfruttare al meglio questi spazi, ricorda di verificare sempre gli orari di apertura e la necessità di prenotazione tramite app o siti web dedicati. Portare con sé una multipresa e cuffie con cancellazione del rumore trasforma qualsiasi tavolo libero nella tua postazione ideale. La mappa dei servizi è in continua espansione: il territorio sta imparando a valorizzare il tempo di chi produce idee.
            </p>
        </div>

        <div class="mt-12 text-center">
            <button onclick="history.pushState('', document.title, window.location.pathname); window.location.reload();" 
                    class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
                <i class="fas fa-arrow-left mr-2"></i> Torna alla home
            </button>
        </div>
    </div>
</main>`;

        document.querySelector('nav').insertAdjacentHTML('afterend', articleHTML);
        window.scrollTo(0, 0);
    }
}
//ARTICOLO 2
function GoArt2() {
    // 1. Identificativo URL specifico per l'articolo 2
    window.location.hash = "articolo-arte-rigenerazione";

    const currentHeader = document.querySelector('header');
    const currentMain = document.querySelector('main');
    const nav = document.querySelector('nav');

    if (currentHeader && currentMain) {
        currentHeader.remove();
        currentMain.remove();

        const articleHTML = `
        <header class="relative h-[60vh] w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pt-20">
    <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1920&q=80" 
         class="absolute inset-0 w-full h-full object-cover opacity-40">
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    <div class="relative z-10 max-w-4xl pt-20">
        <span class="inline-block px-4 py-1 border border-indigo-500 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 italic">Cultura & Territorio</span>
        <h1 class="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase text-white">L'Arte come Motore di <br><span class="text-indigo-500">Rigenerazione.</span></h1>
    </div>
</header>

<main class="w-full bg-white text-slate-900 py-20 px-6 md:px-20 relative z-20">
    <div class="max-w-4xl mx-auto">
        <p class="text-xl md:text-2xl font-medium text-slate-600 mb-12 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
            Come le residenze d'artista e i progetti culturali stanno trasformando i piccoli centri in hub creativi per giovani talenti.
        </p>

        <div class="prose prose-slate lg:prose-xl max-w-none text-slate-800">
            <p>
                Il riuso degli spazi attraverso la cultura rappresenta oggi una delle strategie più efficaci per contrastare lo spopolamento dei borghi. Non si tratta di "abbellire" un vicolo, ma di riaccendere l'economia e la vita sociale di luoghi che rischiano l'abbandono.
            </p>

            <h3 class="text-2xl font-bold mt-8 mb-4">Trasformare il Vuoto in Valore</h3>
            <p>
                Ogni borgo ha edifici inutilizzati: ex scuole, magazzini o case chiuse da anni. La rigenerazione culturale trasforma questi pesi urbanistici in risorse. Invece di attendere grandi investimenti industriali, si punta sul capitale umano. Artisti e professionisti digitali diventano i nuovi abitanti, portando competenze che si mescolano con le tradizioni locali.
            </p>

            <h3 class="text-2xl font-bold mt-8 mb-4">La Residenza d'Artista come Start-up Culturale</h3>
            <p>
                Le residenze non sono vacanze per creativi. Sono progetti in cui l'artista vive il territorio, collabora con gli artigiani del posto e produce opere che restano alla comunità. Questo scambio genera:
            </p>
            <ul class="list-disc pl-6 mb-6">
                <li><strong>Turismo di qualità:</strong> Visitatori attratti da eventi unici e non dal consumo di massa.</li>
                <li><strong>Nuovi mestieri:</strong> L'incontro tra arte e artigianato locale crea prodotti e servizi innovativi.</li>
                <li><strong>Identità rinnovata:</strong> I giovani residenti ritrovano orgoglio nel restare, vedendo il proprio borgo diventare un centro di produzione culturale internazionale.</li>
            </ul>

            <h3 class="text-2xl font-bold mt-8 mb-4">Creare un Ecosistema per i Professionisti</h3>
            <p>
                Perché un giovane professionista dovrebbe scegliere un piccolo centro? La chiave è l'integrazione. Un hub creativo deve offrire:
            </p>
            <ol class="list-decimal pl-6 mb-6">
                <li><strong>Spazi di lavoro condivisi:</strong> Co-working dove il designer dialoga con il programmatore e lo scultore.</li>
                <li><strong>Servizi digitali:</strong> Banda larga e infrastrutture tecnologiche indispensabili per operare sui mercati globali.</li>
                <li><strong>Rete territoriale:</strong> Connessione tra istituzioni, proprietari di immobili e associazioni per facilitare l'insediamento di nuove attività.</li>
            </ol>

            <h3 class="text-2xl font-bold mt-8 mb-4">Verso un Futuro Sostenibile</h3>
            <p>
                La rigenerazione non è un evento isolato, ma un processo continuo. Quando un borgo si apre alla cultura, smette di essere un "museo a cielo aperto" statico e diventa un laboratorio vivo. Questo modello offre una risposta concreta alla crisi delle grandi città, proponendo un equilibrio migliore tra qualità della vita e ambizione professionale. Investire nella cultura oggi significa garantire un domani economico e sociale alle aree interne del Paese.
            </p>
        </div>

        <div class="mt-12 text-center">
            <button onclick="history.pushState('', document.title, window.location.pathname); window.location.reload();" 
                    class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
                <i class="fas fa-arrow-left mr-2"></i> Torna alla home
            </button>
        </div>
    </div>
</main>`;

        if (nav) {
            nav.insertAdjacentHTML('afterend', articleHTML);
        } else {
            document.body.insertAdjacentHTML('afterbegin', articleHTML);
        }
        
        window.scrollTo(0, 0);
    }
}

//ARTICOLO 3
function GoArt3() {
    // 1. Identificativo URL specifico per l'articolo 3
    window.location.hash = "articolo-gio-biondo";

    const currentHeader = document.querySelector('header');
    const currentMain = document.querySelector('main');
    const nav = document.querySelector('nav');

    if (currentHeader && currentMain) {
        currentHeader.remove();
        currentMain.remove();

        const article3HTML = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mappare i bisogni: l'intervista a Gio Biondo | YouthVoice</title>
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-white text-slate-900 font-sans">

<header class="relative h-[60vh] w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pt-20">
    <img src="https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
         class="absolute inset-0 w-full h-full object-cover opacity-40">
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    <div class="relative z-10 max-w-4xl pt-20">
        <span class="inline-block px-4 py-1 border border-indigo-500 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 italic">Innovazione Sociale</span>
        <h1 class="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase text-white">Mappare i bisogni: <br><span class="text-indigo-500">L'intervista a Gio Biondo</span></h1>
    </div>
</header>

<main class="w-full bg-white text-slate-900 py-20 px-6 md:px-20 relative z-20">
    <div class="max-w-4xl mx-auto">
        <p class="text-xl md:text-2xl font-medium text-slate-600 mb-12 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
            Il protagonismo giovanile non è un'opzione, ma il motore per rigenerare il sociale attraverso l'ascolto attivo degli under 30.
        </p>

        <div class="prose prose-slate lg:prose-xl max-w-none text-slate-800">
            <p>
                Secondo Gio Biondo, progettare per il sociale senza mappare i desideri di chi il territorio lo vive è un errore metodologico che le amministrazioni non possono più permettersi. "Dobbiamo passare dal fare <em>per</em> i giovani al fare <em>con</em> i giovani," spiega. Il concetto di protagonismo giovanile deve tradursi in azioni concrete: non basta fornire spazi, serve che siano i ragazzi a definirne le funzioni.
            </p>

            <p>
                "Spesso le istituzioni offrono risposte a domande che i giovani non hanno mai posto," continua Biondo. "Mappare i bisogni significa mappare le lacune del sistema." Questo processo richiede strumenti di indagine moderni: non solo questionari, ma workshop di co-progettazione e tavoli tecnici dove il voto di un ventenne pesa quanto quello di un assessore.
            </p>

            <h3 class="text-2xl font-bold mt-8 mb-4">Esempi Concreti di Protagonismo</h3>
            <p>
                La teoria si trasforma in pratica attraverso modelli di gestione innovativi che vedono i giovani al centro della catena decisionale:
            </p>
            <ul class="list-disc pl-6 mb-6">
                <li><strong>Urban Lab autogestiti:</strong> Spazi in cui gli under 30 mappano i vuoti urbani per trasformarli in sale prova, studi di registrazione o laboratori di stampa 3D gestiti in autonomia.</li>
                <li><strong>Bilanci Partecipativi Under 30:</strong> Quote di fondi comunali assegnate a progetti ideati, votati e realizzati direttamente da gruppi informali di ragazzi.</li>
                <li><strong>Hub di Servizi Ibridi:</strong> Nelle aree tra Verona e Mantova, ex scuole rurali diventano punti di riferimento dove il bisogno di mobilità (car pooling) si fonde con la socialità.</li>
            </ul>

            <h3 class="text-2xl font-bold mt-8 mb-4">Perché puntare sugli Under 30?</h3>
            <p>
                Il protagonismo non è una concessione, ma una necessità strategica. I giovani possiedono:
            </p>
            <ul class="list-disc pl-6 mb-6">
                <li><strong>Competenza Digitale:</strong> Capacità di utilizzare le tecnologie per semplificare l'accesso ai servizi territoriali.</li>
                <li><strong>Sensibilità Sociale:</strong> Una visione aggiornata su temi critici come la salute mentale e la precarietà abitativa.</li>
                <li><strong>Visione a Lungo Termine:</strong> L'interesse diretto nel costruire un territorio sostenibile in cui voler restare a vivere.</li>
            </ul>

            <p>
                Solo partendo dai dati reali sui bisogni — dalla mobilità notturna al supporto psicologico — si possono costruire servizi che non restino cattedrali nel deserto. Il territorio deve imparare a valorizzare il tempo e le idee di chi rappresenta il futuro presente della comunità.
            </p>
        </div>

        <div class="mt-12 text-center">
            <button onclick="history.pushState('', document.title, window.location.pathname); window.location.reload();" 
                    class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
                <i class="fas fa-arrow-left mr-2"></i> Torna alla home
            </button>
        </div>
    </div>
</main>
`;

        if (nav) {
            nav.insertAdjacentHTML('afterend', article3HTML);
        } else {
            document.body.insertAdjacentHTML('afterbegin', article3HTML);
        }
        
        window.scrollTo(0, 0);
    }
}

//CHI SIAMO
function GoChiSiamo() {
    // Cambia l'URL in modo che se ricarichi rimanga qui
    window.location.hash = "chi-siamo";

    const currentHeader = document.querySelector('header');
    const currentMain = document.querySelector('main');

    if (currentHeader && currentMain) {
        // Rimuove la Home
        currentHeader.remove();
        currentMain.remove();

        // Inserisce il contenuto "Chi Siamo" ottimizzato
        const chiSiamoHTML = `
        <header class="relative h-[60vh] w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pt-20">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80" 
                 class="absolute inset-0 w-full h-full object-cover opacity-40">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div class="relative z-10 max-w-4xl pt-20">
                <span class="inline-block px-4 py-1 border border-indigo-500 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 italic">Il nostro manifesto</span>
                <h1 class="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase text-white">Chi <br><span class="text-indigo-500">Siamo.</span></h1>
            </div>
        </header>

        <main class="w-full bg-white text-slate-900 py-20 px-6 md:px-20 relative z-20">
            <div class="max-w-4xl mx-auto">
                <p class="text-xl md:text-2xl font-medium text-slate-600 mb-12 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
                    Siamo un collettivo di under 30 uniti dall'obiettivo di trasformare il futuro delle province tra Veneto e Lombardia attraverso l'innovazione e la partecipazione.
                </p>

                <div class="prose prose-slate lg:prose-xl max-w-none text-slate-800">
                    <h3 class="text-2xl font-bold mt-8 mb-4">La nostra genesi</h3>
                    <p>
                        YouthVoice non nasce nel vuoto. Il nostro progetto è frutto dell'ispirazione e delle competenze maturate all'interno di <strong>Ri-Generazioni AI</strong>, l'iniziativa promossa da <strong>Upskill 4.0</strong> e <strong>Fondazione Cariverona</strong>. Grazie a questo percorso, abbiamo imparato a coniugare le tecnologie esponenziali come l'Intelligenza Artificiale con il bisogno concreto di rilanciare i territori e le comunità locali.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
                        <div class="p-6 bg-slate-50 border-t-2 border-indigo-500">
                            <h4 class="font-bold text-indigo-600 uppercase text-xs tracking-widest mb-3">Community</h4>
                            <p class="text-sm leading-snug text-slate-600 uppercase font-bold">Un network di talenti under 30 attivi sul territorio.</p>
                        </div>
                        <div class="p-6 bg-slate-50 border-t-2 border-indigo-500">
                            <h4 class="font-bold text-indigo-600 uppercase text-xs tracking-widest mb-3">Innovazione</h4>
                            <p class="text-sm leading-snug text-slate-600 uppercase font-bold">L'AI al servizio del bene comune e della politica locale.</p>
                        </div>
                        <div class="p-6 bg-slate-50 border-t-2 border-indigo-500">
                            <h4 class="font-bold text-indigo-600 uppercase text-xs tracking-widest mb-3">Impatto</h4>
                            <p class="text-sm leading-snug text-slate-600 uppercase font-bold">Dalle visioni digitali ad azioni concrete nei borghi.</p>
                        </div>
                    </div>

                    <h3 class="text-2xl font-bold mt-8 mb-4">Incontra Olga-bot</h3>
                    <p>
                        Per rendere la partecipazione fluida e immediata, abbiamo creato <strong>Olga-bot</strong>, la nostra fidata assistente virtuale. Olga non è solo un chatbot: è l'interfaccia che raccoglie le istanze, i sogni e le criticità dei giovani di Verona, Vicenza, Padova, Belluno e Mantova, traducendoli in dati pronti per essere presentati alle istituzioni.
                    </p>
                    
                    <p>
                        Con il supporto metodologico di Upskill 4.0, continuiamo a sperimentare nuove forme di rigenerazione culturale e professionale, dimostrando che per fare innovazione non serve fuggire all'estero, ma basta avere gli strumenti giusti per agire dove sono le nostre radici.
                    </p>
                </div>

                <div class="mt-16 text-center">
                    <button onclick="history.pushState('', document.title, window.location.pathname); window.location.reload();" 
                            class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
                        <i class="fas fa-arrow-left mr-2"></i> Torna alla home
                    </button>
                </div>
            </div>
        </main>`;

        // Inserisce tutto dopo la navigazione che resta fissa
        document.querySelector('nav').insertAdjacentHTML('afterend', chiSiamoHTML);
        window.scrollTo(0, 0);
    }
}

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