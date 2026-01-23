document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');

    function appendMessage(text, isUser = false) {
        const wrapper = document.createElement('div');
        wrapper.className = isUser ? 'msg-user' : 'msg-bot';
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;
        
        wrapper.appendChild(bubble);
        chatContainer.appendChild(wrapper);
        
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        
        if (text) {
            appendMessage(text, true);
            chatInput.value = '';

            // Simulazione IA specifica per il progetto
            setTimeout(() => {
                const replies = [
                    "Analisi avviata. Ho aggiunto il tuo contributo al cluster 'Pianificazione Urbana'.",
                    "Interessante segnalazione. Abbiamo riscontrato pattern simili in altri 4 quartieri.",
                    "Dato ricevuto. Entro domani questa esigenza apparirà sulla mappa pubblica.",
                    "Ottimo spunto. Vuoi approfondire con un breve quiz per definire meglio il problema?"
                ];
                appendMessage(replies[Math.floor(Math.random() * replies.length)], false);
            }, 800);
        }
    });
});