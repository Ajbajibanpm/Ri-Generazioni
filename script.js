document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const aiWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');

    openBtn.addEventListener('click', () => {
        aiWindow.classList.replace('chat-hidden', 'chat-visible');
        openBtn.style.display = 'none';
    });
    
    closeBtn.addEventListener('click', () => {
        aiWindow.classList.replace('chat-visible', 'chat-hidden');
        openBtn.style.display = 'flex';
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
                appendMessage("Dato ricevuto. Sto elaborando il report per il database territoriale 2026.", false);
            }, 800);
        }
    });
});