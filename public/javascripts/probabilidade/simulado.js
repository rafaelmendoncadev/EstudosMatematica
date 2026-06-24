const STORAGE_KEY = 'probabilidade_gabarito_desbloqueado';

let currentQuestions = [];
let userAnswers = [];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  const container = document.getElementById('quiz-container');
  const resultsDiv = document.getElementById('quiz-results');
  const correctionsDiv = document.getElementById('quiz-corrections');

  if (resultsDiv) resultsDiv.classList.add('hidden');
  if (correctionsDiv) {
    correctionsDiv.classList.add('hidden');
    correctionsDiv.innerHTML = '';
  }
  if (container) container.classList.remove('hidden');

  const shuffledBank = shuffle(fullQuestionBank);
  currentQuestions = shuffledBank.slice(0, 10);
  userAnswers = new Array(10).fill(null);

  renderQuiz();
  updateQuizProgress(0);
}

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  container.innerHTML = '';

  const progressHeader = document.createElement('div');
  progressHeader.className = 'mb-stack-lg';
  progressHeader.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
      <span class="text-label-md font-label-md text-on-surface-variant" id="quiz-progress-label">Questão 0 de 10</span>
      <button type="button" class="text-label-md font-label-md text-primary hover:underline text-left sm:text-right min-h-[44px]" onclick="startQuiz()">Gerar novo simulado</button>
    </div>
    <div class="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
      <div id="quiz-progress-bar" class="h-full bg-primary transition-all duration-300 rounded-full" style="width: 0%"></div>
    </div>
  `;
  container.appendChild(progressHeader);

  currentQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'mb-6 p-3 sm:p-4 bg-surface rounded-lg border border-surface-variant';
    questionDiv.dataset.questionIndex = index;

    let html = `<p class="font-semibold text-on-surface mb-3">${index + 1}. ${q.pergunta}</p><div class="flex flex-col gap-2">`;

    q.opcoes.forEach((opt, optIndex) => {
      html += `
        <label class="quiz-option flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-surface-variant hover:bg-surface-container transition-colors">
          <input type="radio" name="q${index}" value="${optIndex}" class="text-primary focus:ring-primary h-4 w-4 border-outline">
          <span class="text-body-md text-on-surface-variant">${opt}</span>
        </label>
      `;
    });

    html += '</div>';
    questionDiv.innerHTML = html;

    questionDiv.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', () => {
        selectAnswer(index, parseInt(input.value, 10));
        updateQuizProgress(countAnswered());
      });
    });

    container.appendChild(questionDiv);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'w-full bg-primary text-on-primary py-3 rounded-full font-label-md hover:bg-primary/90 transition-colors mt-4 min-h-[48px]';
  submitBtn.textContent = 'Finalizar e Corrigir';
  submitBtn.onclick = submitQuiz;
  container.appendChild(submitBtn);
}

function selectAnswer(qIndex, optIndex) {
  userAnswers[qIndex] = optIndex;
}

function countAnswered() {
  return userAnswers.filter((a) => a !== null).length;
}

function updateQuizProgress(answered) {
  const label = document.getElementById('quiz-progress-label');
  const bar = document.getElementById('quiz-progress-bar');
  if (label) label.textContent = `Questão ${answered} de 10 respondidas`;
  if (bar) bar.style.width = `${(answered / 10) * 100}%`;
}

function submitQuiz() {
  const unanswered = userAnswers.filter((a) => a === null).length;
  if (unanswered > 0) {
    alert(`Responda todas as questões antes de corrigir. Faltam ${unanswered}.`);
    return;
  }

  let score = 0;
  const wrongQuestions = [];

  currentQuestions.forEach((q, index) => {
    if (userAnswers[index] === q.correta) {
      score++;
    } else {
      wrongQuestions.push({ question: q, index, userAnswer: userAnswers[index] });
    }
  });

  const container = document.getElementById('quiz-container');
  const resultsDiv = document.getElementById('quiz-results');
  const correctionsDiv = document.getElementById('quiz-corrections');
  const scoreDisplay = document.getElementById('score-display');
  const msgElement = document.getElementById('result-message');

  if (container) container.classList.add('hidden');
  if (resultsDiv) resultsDiv.classList.remove('hidden');
  if (scoreDisplay) scoreDisplay.textContent = `${score}/10`;

  if (score === 10) {
    if (msgElement) {
      msgElement.textContent = 'Parabéns! Você acertou todas as questões. Os exercícios do quadro foram desbloqueados!';
      msgElement.className = 'text-body-lg text-secondary font-bold mb-6';
    }
    localStorage.setItem(STORAGE_KEY, 'true');
    checkUnlock();
  } else {
    if (msgElement) {
      msgElement.textContent = `Você acertou ${score} de 10. Continue estudando — é preciso 10/10 para desbloquear o gabarito dos exercícios do quadro.`;
      msgElement.className = 'text-body-lg text-error font-bold mb-6';
    }
  }

  if (correctionsDiv && wrongQuestions.length > 0) {
    correctionsDiv.classList.remove('hidden');
    correctionsDiv.innerHTML = `
      <h4 class="text-headline-md font-headline-md text-on-surface mb-stack-md">Correções das questões erradas</h4>
      <div class="flex flex-col gap-stack-md">
        ${wrongQuestions.map(({ question, index, userAnswer }) => `
          <div class="p-stack-md bg-error-container/30 border border-error/20 rounded-lg">
            <p class="font-semibold text-on-surface mb-2">${index + 1}. ${question.pergunta}</p>
            <p class="text-body-md text-error mb-1">Sua resposta: <strong>${question.opcoes[userAnswer]}</strong></p>
            <p class="text-body-md text-secondary mb-1">Resposta correta: <strong>${question.opcoes[question.correta]}</strong></p>
            <p class="text-body-md text-on-surface-variant mt-2">${question.explicacao}</p>
          </div>
        `).join('')}
      </div>
    `;

    if (typeof renderMathInElement === 'function') {
      renderMathInElement(correctionsDiv);
    }
  } else if (correctionsDiv) {
    correctionsDiv.classList.add('hidden');
  }
}

function checkUnlock() {
  const isUnlocked = localStorage.getItem(STORAGE_KEY) === 'true';
  const overlay = document.getElementById('locked-overlay');
  const lockIcons = [
    document.getElementById('nav-lock-icon'),
    document.getElementById('nav-lock-icon-mobile'),
    document.getElementById('bottom-lock-icon')
  ];

  if (isUnlocked) {
    if (overlay) overlay.style.display = 'none';
    lockIcons.forEach((icon) => icon && icon.classList.add('hidden'));
  } else {
    if (overlay) overlay.style.display = '';
    lockIcons.forEach((icon) => icon && icon.classList.remove('hidden'));
  }
}

function getScrollOffset() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  return isMobile ? 72 : 100;
}

function setActiveNav(sectionId) {
  const sections = ['teoria', 'questoes', 'simulado', 'exercicios'];
  const activeIndex = sections.indexOf(sectionId);

  document.querySelectorAll('.nav-link[data-section]').forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    const isDesktop = link.closest('#main-nav');
    const isMobilePanel = link.closest('#mobile-nav');

    if (isDesktop) {
      link.classList.toggle('text-primary', isActive);
      link.classList.toggle('border-b-2', isActive);
      link.classList.toggle('border-primary', isActive);
      link.classList.toggle('pb-1', isActive);
      link.classList.toggle('text-on-surface-variant', !isActive);
    }

    if (isMobilePanel) {
      link.classList.toggle('text-primary', isActive);
      link.classList.toggle('bg-primary-fixed/30', isActive);
      link.classList.toggle('border-l-4', isActive);
      link.classList.toggle('border-primary', isActive);
      link.classList.toggle('text-on-surface-variant', !isActive);
    }
  });

  document.querySelectorAll('.bottom-nav-link[data-section]').forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    link.classList.toggle('text-primary', isActive);
    link.classList.toggle('text-on-surface-variant', !isActive);
  });

  const bar = document.getElementById('nav-progress-bar');
  if (bar && activeIndex >= 0) {
    bar.style.width = `${((activeIndex + 1) / sections.length) * 100}%`;
  }
}

function updateNavProgress() {
  const sections = ['teoria', 'questoes', 'simulado', 'exercicios'];
  const scrollPos = window.scrollY + getScrollOffset();
  let activeSection = sections[0];

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollPos) activeSection = id;
  });

  setActiveNav(activeSection);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  if (!menu || !btn) return;

  const isOpen = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden', isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  btn.querySelector('.material-symbols-outlined').textContent = isOpen ? 'menu' : 'close';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  if (!menu || !btn) return;

  menu.classList.add('hidden');
  btn.setAttribute('aria-expanded', 'false');
  const icon = btn.querySelector('.material-symbols-outlined');
  if (icon) icon.textContent = 'menu';
}

function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.nav-link[data-section], .bottom-nav-link[data-section]').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
      setTimeout(updateNavProgress, 300);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  startQuiz();
  checkUnlock();
  initMobileNav();
  updateNavProgress();
  window.addEventListener('scroll', updateNavProgress, { passive: true });
  window.addEventListener('resize', updateNavProgress, { passive: true });
});
