
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
            <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1920&q=80" 
                 class="absolute inset-0 w-full h-full object-cover opacity-40">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div class="relative z-10 max-w-4xl pt-20">
                <span class="inline-block px-4 py-1 border border-indigo-500 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 italic">News & Bandi</span>
                <h1 class="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase text-white">Coworking gratuiti: <br><span class="text-indigo-500">la mappa definitiva.</span></h1>
            </div>
        </header>
        <main class="w-full bg-white text-slate-900 py-20 px-6 md:px-20 relative z-20">
            <div class="max-w-4xl mx-auto">
                <p class="text-xl md:text-2xl font-medium text-slate-600 mb-12 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
                    Trovare uno spazio tranquillo per studiare o lavorare tra Verona e Mantova non deve essere per forza un costo.
                </p>
                <div class="prose prose-slate lg:prose-xl max-w-none text-slate-800">
                    <p>Contenuto dell'articolo...</p>
                </div>
                <div class="mt-12 text-center">
                    <button onclick="window.location.hash=''; window.location.reload();" class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
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
                    <p>Il riuso degli spazi attraverso la cultura rappresenta oggi una delle strategie più efficaci per contrastare lo spopolamento dei borghi...</p>
                    </div>
                <div class="mt-12 text-center">
                    <button onclick="window.location.hash=''; window.location.reload();" class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600">
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