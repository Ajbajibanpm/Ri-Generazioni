
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
    // 1. Individua il contenitore principale
    // Deve essere l'elemento che racchiude l'header e il main della home
    const mainWrapper = document.querySelector('body'); 
    
    // 2. Se vuoi mantenere la nav fissa, non sovrascrivere tutto il body, 
    // ma solo i blocchi header e main.
    const currentHeader = document.querySelector('header');
    const currentMain = document.querySelector('main');

    if (currentHeader && currentMain) {
        // Rimuovi i contenuti attuali
        currentHeader.remove();
        currentMain.remove();

        // Crea il nuovo layout articolo
        const articleHTML = `
        <header class="relative h-[60vh] w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pt-20">
            <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1920&q=80" 
                 class="absolute inset-0 w-full h-full object-cover opacity-40">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            
            <div class="relative z-10 max-w-4xl pt-20">
                <span class="inline-block px-4 py-1 border border-indigo-500 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 italic">News & Bandi</span>
                <h1 class="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase text-white">Coworking gratuiti: <br><span class="text-indigo-500">la mappa definitiva.</span></h1>
                <div class="flex items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <span>Redazione YV.26</span>
                    <span class="w-1 h-1 bg-indigo-500 rounded-full"></span>
                    <span>23 Gennaio 2026</span>
                </div>
            </div>
        </header>

        <main class="w-full bg-white text-slate-900 py-20 px-6 md:px-20 relative z-20">
            <div class="max-w-4xl mx-auto">
                <p class="text-xl md:text-2xl font-medium text-slate-600 mb-12 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
                    Trovare uno spazio tranquillo per studiare o lavorare tra Verona e Mantova non deve essere per forza un costo. Abbiamo mappato i migliori hub gratuiti per la community.
                </p>

                <div class="prose prose-slate lg:prose-xl max-w-none space-y-8 text-slate-800 leading-relaxed">
                    <p>L'esigenza di spazi ibridi è in costante crescita. Non più solo biblioteche silenziose, ma luoghi dove la connessione è il fulcro dell'esperienza.</p>
                    <h2 class="text-3xl font-black uppercase tracking-tighter italic text-indigo-600 mt-12 mb-4">Focus Verona e Vicenza</h2>
                    <p>A <strong>Verona</strong>, nuovi spazi di rigenerazione urbana hanno aperto le porte a studenti e giovani professionisti...</p>
                </div>

                <div class="mt-12 text-center">
                    <button onclick="window.location.reload()" class="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i> Torna alla home
                    </button>
                </div>
            </div>
        </main>`;

        // Inserisci il nuovo HTML dopo la nav
        document.querySelector('nav').insertAdjacentHTML('afterend', articleHTML);
        
        // Scroll in alto
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}