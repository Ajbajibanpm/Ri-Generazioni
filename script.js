document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const aiWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');

    // Funzione per mostrare il bot
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        aiWindow.classList.remove('chat-hidden');
        aiWindow.classList.add('chat-visible');
    });
    
    // Funzione per nascondere il bot
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Previene conflitti di eventi
        aiWindow.classList.remove('chat-visible');
        aiWindow.classList.add('chat-hidden');
    });

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
            setTimeout(() => {
                appendMessage("Ricevuto. La segnalazione è stata caricata nel sistema.", false);
            }, 800);
        }
    });
});