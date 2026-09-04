/**
 * Antigravity Kinetic Certifications Engine
 * Controls interactive telemetry card inspection and modal inspection
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initKineticCertifications();
  });

  function initKineticCertifications() {
    const root = document.querySelector('.kinetic-cert-root');
    if (!root) return;

    // Telemetry Inspector Modal
    const modal = document.getElementById('kinetic-cert-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close-btn');
    const modalTag = modal.querySelector('.modal-hud-tag');
    const modalTitle = modal.querySelector('.modal-headline');
    const modalBody = modal.querySelector('.modal-body-text');
    const modalDomain = modal.querySelector('.modal-val-domain');
    const modalLevel = modal.querySelector('.modal-val-level');
    const modalDate = modal.querySelector('.modal-val-date');
    const modalIssuer = modal.querySelector('.modal-val-issuer');
    const modalVerifyBtn = modal.querySelector('.modal-verify-link');

    function openModal(data) {
      if (modalTag) modalTag.textContent = data.id + ' // ' + (data.category || 'CREDENTIAL');
      if (modalTitle) modalTitle.textContent = data.title || '';
      if (modalBody) modalBody.textContent = data.description || '';
      if (modalDomain) modalDomain.textContent = data.domain || 'N/A';
      if (modalLevel) modalLevel.textContent = data.level || 'Verified';
      if (modalDate) modalDate.textContent = data.date || 'Active';
      if (modalIssuer) modalIssuer.textContent = data.issuer || 'Accredited Board';

      if (modalVerifyBtn) {
        if (data.verifyUrl) {
          modalVerifyBtn.href = data.verifyUrl;
          modalVerifyBtn.style.display = 'inline-flex';
        } else {
          modalVerifyBtn.style.display = 'none';
        }
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Bind all module cards & inspect buttons across duplicated streams
    const moduleCards = root.querySelectorAll('.kinetic-module-card');
    moduleCards.forEach((card) => {
      const inspectBtn = card.querySelector('.module-action-btn');

      const cardData = {
        id: card.querySelector('.module-id')?.textContent.trim() || 'MODULE',
        title: card.querySelector('.module-title')?.textContent.trim() || '',
        category: card.getAttribute('data-category') || '',
        domain: card.getAttribute('data-domain') || '',
        level: card.getAttribute('data-level') || '',
        date: card.getAttribute('data-date') || '',
        issuer: card.getAttribute('data-issuer') || '',
        description: card.querySelector('.module-description')?.textContent.trim() || '',
        verifyUrl: card.getAttribute('data-verify-url') || ''
      };

      if (inspectBtn) {
        inspectBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openModal(cardData);
        });
      }

      card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' && e.target !== card) return;
        e.preventDefault();
        openModal(cardData);
      });
    });
  }

  window.initKineticCertifications = initKineticCertifications;
})();
