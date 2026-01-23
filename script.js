document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');

    /**
     * Aggiunge un messaggio al contenitore della chat
     * @param {string} text - Contenuto del messaggio
     * @param {boolean} isUser - Se il messaggio è dell'utente o del bot
     */
    function appendMessage(text, isUser = false) {
        const wrapper = document.createElement('div');
        wrapper.className = isUser ? 'msg-user' : 'msg-bot';
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = text;
        
        wrapper.appendChild(bubble);
        chatContainer.appendChild(wrapper);
        
        // Scroll automatico all'ultimo messaggio
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    /**
     * Gestione invio form
     */
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        
        if (message) {
            // 1. Mostra messaggio utente
            appendMessage(message, true);
            chatInput.value = '';

            // 2. Simula "IA sta scrivendo..."
            setTimeout(() => {
                const botResponses = [
                    "Ho recepito questa necessità. Verrà inserita nel report per le politiche giovanili.",
                    "Grazie! Sapresti dirmi in quale zona specifica della città avverti questo bisogno?",
                    "Interessante. Abbiamo altre 15 segnalazioni simili questa settimana.",
                    "Questo ci aiuta a mappare meglio la situazione. Continua così!"
                ];
                const reply = botResponses[Math.floor(Math.random() * botResponses.length)];
                appendMessage(reply, false);
            }, 1200);
        }
    });
});