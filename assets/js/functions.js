/* ===================================
   USFIT B2B - Funções JavaScript
   =================================== */

// ===================================
// INICIALIZAÇÃO
// ===================================

// Inicializa os ícones Lucide quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ===================================
// WIDGET DE CHAT (usado no dashboard)
// ===================================

function toggleChat() {
    const chatWidget = document.getElementById('aiChatWidget');
    
    if (chatWidget) {
        if (chatWidget.classList.contains('opacity-0')) {
            // Abrir
            chatWidget.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            chatWidget.classList.add('opacity-100', 'scale-100');
        } else {
            // Fechar
            chatWidget.classList.remove('opacity-100', 'scale-100');
            chatWidget.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        }
    }
}

// ===================================
// FUNÇÕES AUXILIARES
// ===================================

// Formata número para exibição em português brasileiro
function formatNumber(number) {
    return number.toLocaleString('pt-BR');
}

// Formata moeda para exibição em português brasileiro
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Formata data para exibição em português brasileiro
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

// ===================================
// EXPORT PARA USO GLOBAL
// ===================================

// Torna funções disponíveis globalmente
window.toggleChat = toggleChat;
window.formatNumber = formatNumber;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
