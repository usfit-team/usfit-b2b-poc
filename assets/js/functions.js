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
        } else if (protocol === 'pollock7') {
            activeFields = protocols.pollock7.all;
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
    else if(bf > 60) bf = 60;
    else {
        let classLabel = '';
        let classColor = '';

        if ((gender === 'male' && bf <= 12) || (gender !== 'male' && bf <= 19)) {
            classLabel = 'Excelente';
            classColor = 'text-green-600';
        } else if ((gender === 'male' && bf <= 15) || (gender !== 'male' && bf <= 24)) {
            classLabel = 'Muito Bom';
            classColor = 'text-blue-500';
        } else if ((gender === 'male' && bf <= 19) || (gender !== 'male' && bf <= 29)) {
            classLabel = 'Saud\u00e1vel';
            classColor = 'text-yellow-500';
        } else if ((gender === 'male' && bf <= 24) || (gender !== 'male' && bf <= 34)) {
            classLabel = 'Aten\u00e7\u00e3o';
            classColor = 'text-orange-500';
        } else {
            classLabel = 'Alto Risco';
            classColor = 'text-red-600';
        }

        document.getElementById('bfClassification').innerHTML = '<p class="text-sm font-bold ' + classColor + ' mt-1">' + classLabel + '</p>';
    }
    
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

    updateMacros();
}

function updateMacros() {
    const weight = parseFloat(document.getElementById('inputWeight').value) || 0;

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

    // finalVET é determinado pela distribuição de macronutrientes
    document.getElementById('resultFinalVET').value = totalKcal;
    document.getElementById('displayFinalVET').innerText = totalKcal + ' kcal';

    // Updates Visuais Seção 1
    document.getElementById('totalProtG').innerText = totalProt + 'g';
    document.getElementById('totalProtKcal').innerText = kcalProt;
    document.getElementById('totalCarbG').innerText = totalCarb + 'g';
    document.getElementById('totalCarbKcal').innerText = kcalCarb;
    document.getElementById('totalFatG').innerText = totalFat + 'g';
    document.getElementById('totalFatKcal').innerText = kcalFat;

    sumMealStats();
}

function sumMealStats() {
    // Escopo apenas nos ingredientes dentro dos containers, excluindo cabeçalhos de refeição
    // e excluindo meal-cards marcados como excluded-from-calc
    let totalKcal = 0, totalProt = 0, totalCarb = 0, totalFat = 0, totalFiber = 0;

    document.querySelectorAll('.meal-card:not(.excluded-from-calc) .ing-list [data-meal-kcal]').forEach(el => {
        totalKcal += parseFloat(el.dataset.mealKcal) || 0;
    });
    document.querySelectorAll('.meal-card:not(.excluded-from-calc) .ing-list [data-meal-prot]').forEach(el => {
        totalProt += parseFloat(el.dataset.mealProt) || 0;
    });
    document.querySelectorAll('.meal-card:not(.excluded-from-calc) .ing-list [data-meal-carb]').forEach(el => {
        totalCarb += parseFloat(el.dataset.mealCarb) || 0;
    });
    document.querySelectorAll('.meal-card:not(.excluded-from-calc) .ing-list [data-meal-fat]').forEach(el => {
        totalFat += parseFloat(el.dataset.mealFat) || 0;
    });
    document.querySelectorAll('.meal-card:not(.excluded-from-calc) .ing-list [data-meal-fiber]').forEach(el => {
        totalFiber += parseFloat(el.dataset.mealFiber) || 0;
    });

    const targetVET = parseFloat(document.getElementById('resultFinalVET').value) || 0;
    const targetProt = parseFloat((document.getElementById('totalProtG')?.innerText || '').replace('g', '')) || 0;
    const targetCarb = parseFloat((document.getElementById('totalCarbG')?.innerText || '').replace('g', '')) || 0;
    const targetFat = parseFloat((document.getElementById('totalFatG')?.innerText || '').replace('g', '')) || 0;
    const percentage = targetVET > 0 ? Math.min((totalKcal / targetVET) * 100, 100) : 0;

    document.getElementById('vetProgressBar').style.width = percentage + "%";
    document.getElementById('vetProgressText').innerText = `${totalKcal} / ${targetVET} kcal`;
    document.getElementById('footerProt').innerText = `${parseFloat(totalProt.toFixed(1))} / ${parseFloat(targetProt.toFixed(1))}g`;
    document.getElementById('footerCarb').innerText = `${parseFloat(totalCarb.toFixed(1))} / ${parseFloat(targetCarb.toFixed(1))}g`;
    document.getElementById('footerFat').innerText  = `${parseFloat(totalFat.toFixed(1))} / ${parseFloat(targetFat.toFixed(1))}g`;
    const fiberEl = document.getElementById('footerFiber');
    if (fiberEl) fiberEl.innerText = `${parseFloat(totalFiber.toFixed(1))}g`;

    const diff = Math.abs(totalKcal - targetVET);
    const bar = document.getElementById('vetProgressBar');
    if (diff < 50 && targetVET > 0) {
        bar.className = "bg-green-500 h-2 rounded-full transition-all duration-300";
    } else if (totalKcal > targetVET) {
        bar.className = "bg-red-500 h-2 rounded-full transition-all duration-300";
    } else {
        bar.className = "bg-usfit-gradient h-2 rounded-full transition-all duration-300";
    }

    const updateMacroStatus = (elementId, current, target, baseClass) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        const macroDiff = Math.abs(current - target);
        const tolerance = 5;

        if (macroDiff < tolerance && target > 0) {
            element.className = "font-bold text-blue-600";
        } else if (current > target) {
            element.className = "font-bold text-red-600";
        } else {
            element.className = `font-bold ${baseClass}`;
        }
    };

    updateMacroStatus('footerProt', totalProt, targetProt, 'text-blue-600');
    updateMacroStatus('footerCarb', totalCarb, targetCarb, 'text-orange-600');
    updateMacroStatus('footerFat', totalFat, targetFat, 'text-yellow-600');

    // Per-meal totals
    document.querySelectorAll('.meal-card').forEach(card => {
        let mProt = 0, mCarb = 0, mFat = 0, mFiber = 0, mKcal = 0;
        card.querySelectorAll('.ing-list [data-meal-prot]').forEach(el  => { mProt  += parseFloat(el.dataset.mealProt)  || 0; });
        card.querySelectorAll('.ing-list [data-meal-carb]').forEach(el  => { mCarb  += parseFloat(el.dataset.mealCarb)  || 0; });
        card.querySelectorAll('.ing-list [data-meal-fat]').forEach(el   => { mFat   += parseFloat(el.dataset.mealFat)   || 0; });
        card.querySelectorAll('.ing-list [data-meal-fiber]').forEach(el => { mFiber += parseFloat(el.dataset.mealFiber) || 0; });
        card.querySelectorAll('.ing-list [data-meal-kcal]').forEach(el  => { mKcal  += parseFloat(el.dataset.mealKcal)  || 0; });
        const pEl  = card.querySelector('.meal-prot-total');
        const cEl  = card.querySelector('.meal-carb-total');
        const fEl  = card.querySelector('.meal-fat-total');
        const fbEl = card.querySelector('.meal-fiber-total');
        const kEl  = card.querySelector('.meal-kcal-total');
        if (pEl)  pEl.innerHTML   = `<strong class="text-blue-600">P:</strong> ${parseFloat(mProt.toFixed(1))}g`;
        if (cEl)  cEl.innerHTML   = `<strong class="text-orange-600">C:</strong> ${parseFloat(mCarb.toFixed(1))}g`;
        if (fEl)  fEl.innerHTML   = `<strong class="text-yellow-600">G:</strong> ${parseFloat(mFat.toFixed(1))}g`;
        if (fbEl) fbEl.innerHTML  = `<strong class="text-green-600">F:</strong> ${parseFloat(mFiber.toFixed(1))}g`;
        if (kEl)  kEl.textContent = `${parseFloat(mKcal.toFixed(1))} kcal`;
    });
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

        const count = parseInt(btn.dataset.subCount || '0');
        const label = count === 1 ? 'Substituição' : 'Substituições';
        btn.innerHTML = `<i data-lucide="list" class="w-3 h-3"></i> ${count} ${label}`;
        btn.classList.remove('bg-blue-100');
    }
    lucide.createIcons();
}

// --- LÓGICA DE SUPLEMENTAÇÃO ---
function addSupplement() {
    const container = document.getElementById('supplements-container');
    const rowHTML = `
        <div class="supp-item grid grid-cols-[1fr_7rem_1fr_2rem] items-center gap-2">
            <input type="text" placeholder="Ex: Creatina" class="form-input">
            <input type="text" placeholder="Ex: 5g" class="form-input">
            <input type="text" placeholder="Ex: Pós-treino" class="form-input">
            <button onclick="this.closest('.supp-item').remove()" class="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', rowHTML);
    const newRow = container.lastElementChild;
    newRow.querySelector('input').focus();
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
