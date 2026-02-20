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
// Copiar link da anamnese (usado na stundents-list)
// ===================================

function copyAnamnesisLink() {
    // Simula a cópia de um link único
    const dummyLink = "https://usfitb2b.com/anamnese/token-unico-123";
    navigator.clipboard.writeText(dummyLink).then(() => {
        alert("Link de Anamnese copiado! Envie para o aluno.");
    });
}

// ===================================
// AVALIAÇÃO FÍSICA
// ===================================

function updateProtocolInputs() {
    const protocol = document.getElementById('selectProtocol').value;
    const gender = document.getElementById('inputGender').value;
    const allInputs = document.querySelectorAll('[id^="fold_"]');
    const desc = document.getElementById('protocolDesc');
    
    // Elemento de Gordura na Seção 1
    const inputBF = document.getElementById('inputBF');
    const manualOverlay = document.getElementById('manualOverlay');

    // Resetar estados das dobras
    allInputs.forEach(input => {
        input.disabled = true;
        input.value = '';
        input.classList.remove('input-active');
        input.classList.add('input-disabled');
    });

    if (protocol === 'manual') {
        // MODO MANUAL:
        desc.innerText = "Modo Manual: Digite o percentual de gordura calculado externamente.";
        
        // Habilitar campo BF
        inputBF.disabled = false;
        inputBF.classList.remove('input-disabled', 'input-result');
        inputBF.classList.add('bg-white');
        inputBF.placeholder = "0.0";
        
        // Bloquear área de dobras
        manualOverlay.classList.remove('hidden');

    } else {
        // MODO CALCULADO (POLLOCK):
        // Bloquear campo BF (será calculado)
        inputBF.disabled = true;
        inputBF.classList.add('input-result'); // Estilo visual de resultado
        inputBF.classList.remove('bg-white');
        inputBF.value = ''; 
        
        // Liberar área de dobras
        manualOverlay.classList.add('hidden');

        let activeFields = [];
        if (protocol === 'pollock3') {
            activeFields = gender === 'male' ? protocols.pollock3.male : protocols.pollock3.female;
            desc.innerText = gender === 'male' ? "Medir: Peitoral, Abdomen, Coxa." : "Medir: Tríceps, Supra-ilíaca, Coxa.";
        } else if (protocol === 'pollock7') {
            activeFields = protocols.pollock7.all;
            desc.innerText = "Protocolo completo (7 Dobras). Maior precisão científica.";
        }

        activeFields.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.disabled = false;
                el.classList.remove('input-disabled');
                el.classList.add('input-active');
            }
        });
    }
    
    calculateBodyComp();
}

function calculateBodyComp() {
    const protocol = document.getElementById('selectProtocol').value;
    const gender = document.getElementById('inputGender').value;
    const age = parseFloat(document.getElementById('inputAge').value) || 0;
    const weight = parseFloat(document.getElementById('inputWeight').value) || 0;
    const inputBF = document.getElementById('inputBF');

    let bf = 0;

    if (protocol === 'manual') {
        // LÊ O VALOR DIRETO DO INPUT DA SEÇÃO 1
        bf = parseFloat(inputBF.value) || 0;
    } else {
        // LÓGICA CALCULADA
        let bodyDensity = 0;
        let sum = 0;

        if (protocol === 'pollock3') {
            if (gender === 'male') {
                const chest = parseFloat(document.getElementById('fold_chest').value) || 0;
                const ab = parseFloat(document.getElementById('fold_abdominal').value) || 0;
                const thigh = parseFloat(document.getElementById('fold_thigh').value) || 0;
                sum = chest + ab + thigh;
                if(sum > 0) bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * (sum * sum)) - (0.0002574 * age);
            } else {
                const tri = parseFloat(document.getElementById('fold_triceps').value) || 0;
                const supra = parseFloat(document.getElementById('fold_suprailiac').value) || 0;
                const thigh = parseFloat(document.getElementById('fold_thigh').value) || 0;
                sum = tri + supra + thigh;
                if(sum > 0) bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * (sum * sum)) - (0.0001392 * age);
            }
        } else if (protocol === 'pollock7') {
            const fields = protocols.pollock7.all;
            fields.forEach(id => { sum += parseFloat(document.getElementById(id).value) || 0; });
            if(sum > 0) {
                if (gender === 'male') bodyDensity = 1.112 - (0.00043499 * sum) + (0.00000055 * sum * sum) - (0.00028826 * age);
                else bodyDensity = 1.097 - (0.00046971 * sum) + (0.00000056 * sum * sum) - (0.00012828 * age);
            }
        }

        if (bodyDensity > 0) bf = (495 / bodyDensity) - 450;
        
        // Se for calculado, atualizar o input da Seção 1
        if(bf > 0) inputBF.value = bf.toFixed(1);
    }

    // Limites e Atualizações
    if(bf < 0) bf = 0;
    if(bf > 60) bf = 60;
    
    // Massa Gorda e Magra
    const fatMass = weight * (bf / 100);
    const leanMass = weight - fatMass;

    document.getElementById('resultFatMass').innerText = fatMass.toFixed(1) + ' kg';
    document.getElementById('resultLBM').innerText = leanMass.toFixed(1) + ' kg';
}

// Init
window.onload = updateProtocolInputs;

// ===================================
// CRIAÇÃO DE PLANO NUTRICIONAL
// ===================================

// --- LÓGICA DE CALCULADORA METABÓLICA ---
function calculateMetabolism() {
    // 1. Pegar valores
    const weight = parseFloat(document.getElementById('inputWeight').value) || 0;
    const height = parseFloat(document.getElementById('inputHeight').value) || 0;
    const age = parseFloat(document.getElementById('inputAge').value) || 0;
    const bf = parseFloat(document.getElementById('inputBF').value) || 0;
    const formula = document.getElementById('selectFormula').value;
    const activity = parseFloat(document.getElementById('selectActivity').value);
    const goal = document.getElementById('selectGoal').value;
    const gap = parseFloat(document.getElementById('inputGap').value) || 0;

    // 2. Calcular Massa Magra (LBM)
    const lbm = weight * (1 - (bf / 100));
    document.getElementById('displayLBM').innerText = lbm.toFixed(1) + ' kg';

    // 3. Calcular TMB (Basal)
    let tmb = 0;
    if (formula === 'cunningham') {
        tmb = 500 + (22 * lbm);
    } else if (formula === 'tinsley') {
        tmb = (25.9 * lbm) + 284;
    } else if (formula === 'harris') {
        tmb = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
    } else if (formula === 'mifflin') {
        tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    document.getElementById('resultTMB').innerText = Math.round(tmb) + ' kcal';

    // 4. Calcular GET (Total)
    const get = tmb * activity;
    document.getElementById('resultGET').innerText = Math.round(get) + ' kcal';

    // 5. Calcular Meta Final
    let finalVet = get;
    const inputGapEl = document.getElementById('inputGap');
    const gapSign = document.getElementById('gapSign');
    
    if (goal === 'deficit') {
        finalVet = get - gap;
        inputGapEl.classList.remove('text-green-600');
        inputGapEl.classList.add('text-red-600');
        gapSign.innerText = "-";
        gapSign.classList.remove('text-green-600');
        gapSign.classList.add('text-red-600');
    } else if (goal === 'surplus') {
        finalVet = get + gap;
        inputGapEl.classList.remove('text-red-600');
        inputGapEl.classList.add('text-green-600');
        gapSign.innerText = "+";
        gapSign.classList.remove('text-red-600');
        gapSign.classList.add('text-green-600');
    } else {
        inputGapEl.value = 0; 
        gapSign.innerText = "";
    }

    const roundedVET = Math.round(finalVet);
    document.getElementById('resultFinalVET').value = roundedVET;
    document.getElementById('displayFinalVET').innerText = roundedVET;
    
    updateMacros();
}

function updateMacros() {
    const weight = parseFloat(document.getElementById('inputWeight').value) || 0;
    const targetVET = parseFloat(document.getElementById('resultFinalVET').value) || 0;

    // Sliders
    const gProt = parseFloat(document.getElementById('rangeProt').value);
    const gCarb = parseFloat(document.getElementById('rangeCarb').value);
    const gFat = parseFloat(document.getElementById('rangeFat').value);

    // Displays Slider
    document.getElementById('valProt').innerText = gProt;
    document.getElementById('valCarb').innerText = gCarb;
    document.getElementById('valFat').innerText = gFat;

    // Totais
    const totalProt = Math.round(gProt * weight);
    const totalCarb = Math.round(gCarb * weight);
    const totalFat = Math.round(gFat * weight);

    const kcalProt = totalProt * 4;
    const kcalCarb = totalCarb * 4;
    const kcalFat = totalFat * 9;
    const totalKcal = kcalProt + kcalCarb + kcalFat;

    // Updates Visuais Seção 1
    document.getElementById('totalProtG').innerText = totalProt + 'g';
    document.getElementById('totalProtKcal').innerText = kcalProt;
    document.getElementById('totalCarbG').innerText = totalCarb + 'g';
    document.getElementById('totalCarbKcal').innerText = kcalCarb;
    document.getElementById('totalFatG').innerText = totalFat + 'g';
    document.getElementById('totalFatKcal').innerText = kcalFat;

    // Updates Footer (Sticky)
    document.getElementById('footerProt').innerText = totalProt + 'g';
    document.getElementById('footerCarb').innerText = totalCarb + 'g';
    document.getElementById('footerFat').innerText = totalFat + 'g';

    const percentage = Math.min((totalKcal / targetVET) * 100, 100);
    document.getElementById('vetProgressBar').style.width = percentage + "%";
    document.getElementById('vetProgressText').innerText = `${totalKcal} / ${targetVET} kcal`;
    
    // Cor da barra de progresso baseada na proximidade
    const diff = Math.abs(totalKcal - targetVET);
    const bar = document.getElementById('vetProgressBar');
    if(diff < 50) {
        bar.className = "bg-green-500 h-2 rounded-full transition-all duration-300";
    } else if (totalKcal > targetVET) {
        bar.className = "bg-red-500 h-2 rounded-full transition-all duration-300";
    } else {
        bar.className = "bg-usfit-gradient h-2 rounded-full transition-all duration-300";
    }
}

// --- LÓGICA DE SUBSTITUIÇÃO (TOGGLE) ---
function toggleSubs(btn) {
    // Encontra o painel dentro do grupo pai
    const panel = btn.closest('.group').querySelector('.substitution-panel');
    
    // Verifica se está fechado (hidden ou max-height 0)
    const isClosed = panel.classList.contains('hidden') || panel.style.maxHeight === '0px';

    if (isClosed) {
        // ABRIR
        panel.classList.remove('hidden');
        // Pequeno timeout para permitir que a transição CSS funcione se houver
        setTimeout(() => {
            panel.classList.add('open');
            panel.style.maxHeight = panel.scrollHeight + "px"; // Altura dinâmica
        }, 10);
        
        btn.innerHTML = `<i data-lucide="chevron-up" class="w-3 h-3"></i> Ocultar`;
        btn.classList.add('bg-blue-100', 'text-usfit-blue');
    } else {
        // FECHAR
        panel.style.maxHeight = '0px';
        panel.classList.remove('open');
        
        // Espera a animação terminar para esconder (opcional, aqui simplificado)
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 300); // Tempo igual ao transition do CSS

        btn.innerHTML = `<i data-lucide="refresh-cw" class="w-3 h-3"></i> 2 substituições`;
        btn.classList.remove('bg-blue-100');
    }
    lucide.createIcons();
}

// --- LÓGICA DE SUPLEMENTAÇÃO ---
function addSupplement() {
    const name = document.getElementById('suppName').value;
    const dose = document.getElementById('suppDose').value;
    const freq = document.getElementById('suppFreq').value;
    const container = document.getElementById('supplements-container');

    if (!name) return alert("Digite o nome do suplemento!");

    const itemHTML = `
        <div class="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg group hover:border-usfit-cyan transition-colors">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-blue-50 text-usfit-blue flex items-center justify-center">
                    <i data-lucide="pill" class="w-4 h-4"></i>
                </div>
                <div>
                    <p class="text-sm font-bold text-gray-800">${name}</p>
                    <p class="text-xs text-gray-500">${dose} • ${freq}</p>
                </div>
            </div>
            <button onclick="this.parentElement.remove()" class="text-gray-300 hover:text-red-500 transition-colors p-2">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', itemHTML);
    
    // Clear inputs
    document.getElementById('suppName').value = '';
    document.getElementById('suppDose').value = '';
    document.getElementById('suppFreq').value = '';
    
    // Re-init icons for the new element
    lucide.createIcons();
}


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
