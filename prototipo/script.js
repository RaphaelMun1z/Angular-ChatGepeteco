/**
* Lógica Principal do Chatbot
* Contém: Gerenciamento de tema, Sidebar, Input auto-ajustável e Simulação de IA.
*/

// --- 1. Inicialização e Correções de Layout ---
const html = document.documentElement;
const themeIcon = document.getElementById('theme-icon');
const chatContainer = document.getElementById('chat-container');
const welcomeScreen = document.getElementById('welcome-screen');

// Correção para telas pequenas: Ajusta a altura da tela de boas-vindas
// Troca 'h-full' (altura fixa) por 'min-h-full' (altura mínima) para permitir scroll
if (welcomeScreen) {
    welcomeScreen.classList.remove('h-full');
    welcomeScreen.classList.add('min-h-full', 'py-12'); // Adiciona padding vertical extra
}

// --- 2. Gerenciamento de Tema (Dark/Light Mode) ---
// Verifica preferência salva ou do sistema ao carregar
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    updateThemeIcon(true);
} else {
    html.classList.remove('dark');
    updateThemeIcon(false);
}

// Alterna entre os temas
function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
        updateThemeIcon(false);
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
        updateThemeIcon(true);
    }
}

// Atualiza o ícone do botão de tema
function updateThemeIcon(isDark) {
    if (themeIcon) {
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

// --- 3. Lógica da Barra Lateral (Sidebar) ---
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

function toggleSidebar() {
    if (!sidebar || !overlay) return;
    
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}

// --- 4. Lógica do Campo de Input ---
const textarea = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Ajusta a altura do textarea conforme o usuário digita
function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    
    // Habilita/Desabilita botão de enviar
    if(el.value.trim().length > 0) {
        sendBtn.disabled = false;
        sendBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed', 'dark:bg-gray-700');
        sendBtn.classList.add('bg-brand-600', 'text-white', 'hover:bg-brand-500');
    } else {
        sendBtn.disabled = true;
        sendBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed', 'dark:bg-gray-700');
        sendBtn.classList.remove('bg-brand-600', 'text-white', 'hover:bg-brand-500');
    }
}

// Envia ao pressionar Enter (sem Shift)
function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// Preenche o input ao clicar nas sugestões
function fillInput(text) {
    textarea.value = text;
    autoResize(textarea);
    textarea.focus();
}

// --- 5. Lógica do Chat e Mensagens ---
let isFirstMessage = true;

// Helper: Formata Markdown simples para HTML
function formatText(text) {
    return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrito
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Bloco de Código
    .replace(/`([^`]+)`/g, '<code>$1</code>') // Código inline
    .replace(/\n/g, '<br>'); // Quebra de linha
}

// Cria o HTML da mensagem (Usuário ou Bot)
function createMessageElement(contentHtml, isUser) {
    const div = document.createElement('div');
    div.className = `max-w-3xl mx-auto w-full flex gap-4 ${isUser ? 'justify-end' : ''} animate-fade-in`;
    
    const avatar = isUser 
    ? `<div class="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 order-2">
             <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" class="w-full h-full object-cover">
           </div>`
    : `<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white text-xs shadow-lg shadow-blue-500/20">
             <i class="fa-solid fa-wand-magic-sparkles"></i>
           </div>`;
    
    const messageBody = isUser
    ? `<div class="bg-gray-100 dark:bg-dark-input text-gray-800 dark:text-gray-100 px-4 py-2.5 rounded-2xl rounded-tr-sm order-1 max-w-[85%] prose">${contentHtml}</div>`
    : `<div class="text-gray-800 dark:text-gray-100 py-1 flex-1 leading-relaxed prose">${contentHtml}</div>`;
    
    div.innerHTML = isUser ? (messageBody + avatar) : (avatar + messageBody);
    return div;
}

// Cria o indicador de "digitando..." (três bolinhas)
function createTypingIndicator() {
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'max-w-3xl mx-auto w-full flex gap-4 animate-fade-in';
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white text-xs shadow-lg shadow-blue-500/20">
             <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <div class="flex items-center gap-1 h-8">
            <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
        </div>
    `;
    return div;
}

// Função principal de envio
async function sendMessage() {
    const text = textarea.value.trim();
    if (!text) return;
    
    // Remove a tela de boas-vindas na primeira mensagem
    if (isFirstMessage) {
        if(welcomeScreen) welcomeScreen.style.display = 'none';
        isFirstMessage = false;
    }
    
    // 1. Adiciona mensagem do Usuário
    const userHtml = formatText(text); // Formata input do usuário também
    chatContainer.appendChild(createMessageElement(userHtml, true));
    
    // Limpa input e reseta altura
    textarea.value = '';
    textarea.style.height = 'auto';
    sendBtn.disabled = true;
    sendBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed', 'dark:bg-gray-700');
    sendBtn.classList.remove('bg-brand-600', 'text-white');
    
    scrollToBottom();
    
    // 2. Mostra indicador de digitação
    const typingIndicator = createTypingIndicator();
    chatContainer.appendChild(typingIndicator);
    scrollToBottom();
    
    // 3. Simula resposta da IA (Delay)
    setTimeout(() => {
        // Remove indicador
        if(typingIndicator.parentNode) chatContainer.removeChild(typingIndicator);
        
        // Gera resposta RAW e depois formata para HTML
        const rawResponse = generateMockResponse(text);
        const htmlResponse = formatText(rawResponse);
        
        // Cria container vazio para o efeito de digitação
        const messageNode = createMessageElement('', false); 
        chatContainer.appendChild(messageNode);
        
        const contentDiv = messageNode.querySelector('.prose');
        typeWriterEffect(contentDiv, htmlResponse);
        
    }, 1500); // Delay de 1.5s
}

// Rola o chat para o final
function scrollToBottom() {
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Efeito de máquina de escrever (Digitação Progressiva)
function typeWriterEffect(element, htmlContent) {
    let i = 0;
    const speed = 10; // ms por caractere (mais rápido para fluidez)
    
    function type() {
        if (i < htmlContent.length) {
            const char = htmlContent.charAt(i);
            
            // Verifica se é início de uma tag HTML para inseri-la inteira de uma vez
            // Isso evita que tags quebradas (ex: <str...) apareçam na tela
            if (char === '<') {
                const closeTagIndex = htmlContent.indexOf('>', i);
                if (closeTagIndex !== -1) {
                    // Insere a tag completa (ex: <strong> ou <br>)
                    element.innerHTML += htmlContent.substring(i, closeTagIndex + 1);
                    i = closeTagIndex + 1;
                } else {
                    element.innerHTML += char;
                    i++;
                }
            } else {
                element.innerHTML += char;
                i++;
            }
            
            // FORÇA O SCROLL A CADA ATUALIZAÇÃO
            scrollToBottom();
            setTimeout(type, speed);
        } else {
            // Garante scroll final quando terminar
            scrollToBottom();
        }
    }
    type();
}

// Inicia um novo chat (Reset)
function createNewChat() {
    if(!isFirstMessage) {
        if(confirm("Deseja iniciar um novo chat? O histórico atual será limpo da visualização.")) {
            chatContainer.innerHTML = '';
            if(welcomeScreen) {
                chatContainer.appendChild(welcomeScreen);
                welcomeScreen.style.display = 'flex';
                // Garante que as classes de correção estejam aplicadas
                welcomeScreen.classList.remove('h-full');
                welcomeScreen.classList.add('min-h-full', 'py-12');
            }
            isFirstMessage = true;
            textarea.value = '';
            autoResize(textarea);
        }
    }
}

// --- 6. Mock AI Logic (Respostas Simuladas) ---
function generateMockResponse(input) {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('olá') || lowerInput.includes('oi')) {
        return "Olá! Como posso ajudar você hoje? Se precisar de código, textos criativos ou análises, estou à disposição.";
    }
    if (lowerInput.includes('japão') || lowerInput.includes('viagem')) {
        return "O Japão é um destino incrível! Aqui está uma sugestão rápida de roteiro de 7 dias:\n\n**Dia 1-3: Tóquio** (Shibuya, Akihabara, Templo Senso-ji)\n**Dia 4: Hakone** (Vista do Monte Fuji e Onsen)\n**Dia 5-7: Kyoto** (Fushimi Inari, Floresta de Bambu)\n\nNão esqueça de comprar o **JR Pass** antes de ir!";
    }
    if (lowerInput.includes('código') || lowerInput.includes('python') || lowerInput.includes('js')) {
        return "Claro, aqui está um exemplo de código simples em Python:\n\n```python\ndef saudacao(nome):\n    return f'Olá, {nome}! Bem-vindo ao mundo da programação.'\n\nprint(saudacao('Usuário'))\n```";
    }
    
    // Resposta padrão
    return "Interessante! Poderia fornecer mais detalhes ou especificar o que você gostaria de saber ou fazer?";
}