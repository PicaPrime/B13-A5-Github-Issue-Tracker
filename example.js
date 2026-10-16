document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('issue_modal');
  const cards = document.querySelectorAll('.issue-card');

  // Modal elements to inject text into
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalStatus = document.getElementById('modal-status');
  const modalPriority = document.getElementById('modal-priority');
  const modalMeta = document.getElementById('modal-meta');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // 1. Fill modal with the clicked card's data
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalStatus.textContent = card.dataset.status;
      modalPriority.textContent = card.dataset.priority;
      modalMeta.textContent = card.dataset.meta;

      // 2. Open the modal using the native Dialog API
      modal.showModal();
    });
  });
});