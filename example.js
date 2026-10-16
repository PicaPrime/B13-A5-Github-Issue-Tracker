document.addEventListener('DOMContentLoaded', () => {
  // 1. Select all the tab buttons and all issue cards
  const tabButtons = document.querySelectorAll('.tab-btn');
  const issueCards = document.querySelectorAll('.issue-card');


  console.log(tabButtons);
  console.log(issueCards);
  
  

  // 2. Define Tailwind classes for active vs inactive states
  const activeClasses = ['bg-[#4b00ff]', 'text-white', 'font-semibold'];
  const inactiveClasses = ['border', 'border-slate-200', 'bg-white', 'text-slate-500', 'font-medium'];

  // 3. Attach a click event listener to each button
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.getAttribute('data-tab');

      // --- SUB-STEP A: Update button appearance ---
      tabButtons.forEach(btn => {
        // Reset all buttons to inactive
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses);
        btn.setAttribute('aria-selected', 'false');
      });

      // Highlight the clicked button
      button.classList.remove(...inactiveClasses);
      button.classList.add(...activeClasses);
      button.setAttribute('aria-selected', 'true');

      // --- SUB-STEP B: Filter the cards ---
      issueCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');

        // Check condition: Is it the "All" tab OR does the card match the filter?
        const shouldShow = (selectedFilter === 'all' || cardStatus === selectedFilter);

        if (shouldShow) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});