/**
 * ORBE BIOLINK — Interações & Micro-animações
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ativa animações suaves de entrada apenas em navegadores interativos reais
  const isHeadless = navigator.userAgent.toLowerCase().includes('headless');
  if (!isHeadless) {
    document.body.classList.add('enable-animations');
  }

  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimeout = null;

  function showToast(message, duration = 2800) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastText.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // E-mail Click: Copia para área de transferência e abre cliente de e-mail
  const emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'contato@orbe.digital';
      
      navigator.clipboard.writeText(email).then(() => {
        showToast('E-mail copiado: ' + email);
        setTimeout(() => {
          window.location.href = 'mailto:' + email;
        }, 600);
      }).catch(() => {
        window.location.href = 'mailto:' + email;
      });
    });
  }

  // Cards Interativos: Feedback tátil e navegação
  const cards = document.querySelectorAll('.link-card');
  cards.forEach(card => {
    // Efeito sutil de reflexo dinâmico no mouse (Desktop)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const specular = card.querySelector('.card-glass-specular');
      if (specular) {
        const percent = (x / rect.width) * 100;
        specular.style.background = `linear-gradient(90deg, transparent ${Math.max(0, percent - 30)}%, rgba(255, 255, 255, 0.45) ${percent}%, transparent ${Math.min(100, percent + 30)}%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const specular = card.querySelector('.card-glass-specular');
      if (specular) {
        specular.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)';
      }
    });

    card.addEventListener('click', (e) => {
      const cardType = card.getAttribute('data-card');
      const title = card.querySelector('.card-title')?.textContent || 'ORBE';

      // Se for um link de âncora interno (#)
      const href = card.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        showToast(`Acessando: ${title}...`);
      }
    });
  });

  // Haptic feedback ao tocar em botões em dispositivos móveis compatíveis
  const interactiveElements = document.querySelectorAll('.social-btn, .link-card, .avatar-wrapper');
  interactiveElements.forEach(el => {
    el.addEventListener('touchstart', () => {
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }, { passive: true });
  });
});
