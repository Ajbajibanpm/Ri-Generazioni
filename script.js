//CARICAMENTO PAGINA
// Gestore della navigazione basato su hash
function handleRouting() {
    const currentHash = window.location.hash;
    if (currentHash === "#gioco-quiz") {
        GoGIOCOQUIZ();
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

//PULL VENETO
//inserisci qui il nuovo codice:
// --- LOGICA MAPPA VENETO (VERSIONE PROTETTA) ---
let venetoMap = null; 
let venetoMarkers = null;

function openVenetoMap() {
    const overlay = document.getElementById('modal-overlay-veneto');
    if (!overlay) return; // Evita errori se l'HTML non è pronto

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Inizializza Leaflet solo se la libreria è caricata
    if (typeof L !== 'undefined') {
        if (!venetoMap) {
            initVenetoMap();
        } else {
            setTimeout(() => { venetoMap.invalidateSize(); }, 200);
        }
    } else {
        console.error("Leaflet (L) non è definito. Verifica il link CSS/JS nell'head.");
    }
}

function closeVenetoMap() {
    const overlay = document.getElementById('modal-overlay-veneto');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Non resettiamo l'hash qui per evitare il reload infinito
    // Se vuoi pulire l'URL usa:
    if (window.location.hash === "#mappa-veneto") {
        history.pushState("", document.title, window.location.pathname);
    }
}

function initVenetoMap() {
    try {
        venetoMap = L.map('map-veneto-container').setView([45.5, 12.1], 8);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(venetoMap);
        
        venetoMarkers = L.layerGroup().addTo(venetoMap);

        // Caricamento dati sicuro
        fetch('data.json')
            .then(res => {
                if(!res.ok) throw new Error("File data.json non trovato");
                return res.json();
            })
            .then(data => renderVenetoUI(data.punti))
            .catch(err => console.warn("Mappa avviata senza dati: ", err));
            
    } catch (e) {
        console.error("Errore inizializzazione mappa:", e);
    }
}

function renderVenetoUI(items) {
    const container = document.getElementById('veneto-list-container');
    if (!container || !items) return;
    
    container.innerHTML = '';
    venetoMarkers.clearLayers();

    items.forEach(item => {
        const m = L.marker([item.lat, item.lng]).addTo(venetoMarkers);
        const card = document.createElement('div');
        card.style.cssText = "padding:12px; border:1px solid #eee; border-radius:8px; margin-bottom:8px; cursor:pointer; color:black;";
        card.innerHTML = `<strong>${item.titolo}</strong><br><small>${item.categoria}</small>`;
        card.onclick = () => { 
            venetoMap.flyTo([item.lat, item.lng], 12); 
            m.bindPopup(item.titolo).openPopup(); 
        };
        container.appendChild(card);
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
async function GIOCOQUIZ() {
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

    // Funzione di rimescolamento
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Variabili di stato del quiz
    let questions = [];
    let currentIdx = 0;
    let score = 0;

    // Caricamento dati dal file JSON esterno
    try {
        const response = await fetch('domande-quiz.json');
        if (!response.ok) throw new Error("Errore nel caricamento del file JSON");
        const allQuestions = await response.json();
        const shuffled = shuffle([...allQuestions]);
        questions = shuffled.slice(0, 5); // Estrai 5 domande a caso
    } catch (error) {
        console.error("Errore:", error);
        alert("Errore tecnico: non è stato possibile caricare le domande.");
        return;
    }

    // Riferimenti agli elementi generati
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