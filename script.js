document.addEventListener('DOMContentLoaded', () => {
    const aiWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');

    openBtn.addEventListener('click', () => {
        aiWindow.classList.remove('chat-hidden');
        aiWindow.classList.add('chat-visible');
        openBtn.style.display = 'none';
        if (window.innerWidth <= 1024) document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', () => {
        aiWindow.classList.remove('chat-visible');
        aiWindow.classList.add('chat-hidden');
        openBtn.style.display = 'flex';
        document.body.style.overflow = '';
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
                appendMessage("Analisi completata. Dato integrato.", false);
            }, 800);
        }
    });
});