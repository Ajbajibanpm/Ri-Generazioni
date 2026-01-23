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

            setTimeout(() => {
                const replies = [
                    "Ho ricevuto il tuo input. Lo sto categorizzando nella sezione 'Mobilità'. Grazie!",
                    "Questo è un punto fondamentale. Lo aggiungo subito al report per le istituzioni.",
                    "Ottima segnalazione. Pensi che anche i tuoi amici abbiano lo stesso bisogno?",
                    "Ricevuto. La tua voce conta per definire le priorità della mappa!"
                ];
                appendMessage(replies[Math.floor(Math.random() * replies.length)], false);
            }, 1000);
        }
    });
});