
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
window.GoArt1 = async function() {
    const wrapper = document.getElementById('page-wrapper');
    if (!wrapper) return;

    try {
        const response = await fetch('GoArt1.html');
        if (!response.ok) throw new Error("File GoArt1.html non trovato");
        const html = await response.text();

        // Sostituisce Header e Main della home con l'articolo
        wrapper.innerHTML = html;
        window.location.hash = 'articolo1';
        window.scrollTo(0, 0);

        // Attiva il tasto indietro
        const backBtn = document.getElementById('back-home');
        if (backBtn) {
            backBtn.onclick = function() {
                window.location.hash = '';
                location.reload(); // Ricarica la home originale
            };
        }
    } catch (err) {
        console.error("Errore:", err);
    }
};