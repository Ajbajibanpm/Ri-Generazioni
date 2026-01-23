document.addEventListener('DOMContentLoaded', () => {
    const aiWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const triggerBtn = document.getElementById('trigger-voicebox');
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