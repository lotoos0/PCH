// Pobranie wszystkich sektorów
const sectors = document.querySelectorAll('.container-sectors .sector-1, .container-sectors .sector-2, .container-sectors .sector-3, .container-sectors .sector-4');

// Pobranie wszystkich przycisków "Zamknij"
const closeButtons = document.querySelectorAll('.closeBtn');

// Pobranie wszystkich przycisków "Atakuj"
const attackButtons = document.querySelectorAll('.Attack-btn');

// Pobranie referencji do osobnego "okna" ataku
const attackOverlay = document.querySelector('.attack-overlay');

// Pobranie referencji do przycisku "Szybka Walka"
const fightButton = document.querySelector('.fight-btn');

// Pobranie referencji do osobnego "okna" po walce
const resultOverlay = document.querySelector('.result-overlay');

// Pobranie referencji do przycisku "Potwierdź" wewnątrz elementu "result-overlay"
const confirmButton = document.querySelector('.result-overlay .result-confirm-btn');



// Inicjalizacja zmiennej przechowującej otwarty sektor
let activeSector = null;

// Obsługa kliknięcia na sektorze
sectors.forEach((sector, index) => {
  sector.addEventListener('click', () => {
    if (activeSector !== sector) {
      if (activeSector) {
        const activeOverlay = activeSector.querySelector('.overlay');
        activeOverlay.classList.remove('visible'); // Usuń klasę 'visible' z aktywnego sektora
      }

      const overlay = sector.querySelector('.overlay');
      overlay.classList.add('visible'); // Dodaj klasę 'visible' do klikniętego sektora
      activeSector = sector; // Ustaw kliknięty sektor jako aktywny
    }
  });
});

// Obsługa kliknięcia na przycisku "Zamknij"
closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Zatrzymaj propagację zdarzenia

    const overlay = button.closest('.overlay');
    overlay.classList.remove('visible'); // Usuń klasę 'visible' z overlay
    activeSector = null; // Zresetuj aktywny sektor
  });
});

// Dodaj obsługę kliknięcia na obszar dokumentu
document.addEventListener('click', (event) => {
  const clickedElement = event.target;

  // Sprawdź czy kliknięty element znajduje się wewnątrz sektora
  if (!clickedElement.closest('.container-sectors')) {
    if (activeSector) {
      const activeOverlay = activeSector.querySelector('.overlay');
      activeOverlay.classList.remove('visible'); // Usuń klasę 'visible' z aktywnego sektora
      activeSector = null; // Zresetuj aktywny sektor
    }
  }
});

// Obsługa kliknięcia na przycisku "Atakuj"
attackButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Wyświetlanie osobnego "okna" ataku
    attackOverlay.classList.add('visible');
  });
});

// Obsługa kliknięcia na przycisku "Szybka Walka"
fightButton.addEventListener('click', () => {
  // Zamknięcie div 'attack-overlay'
  attackOverlay.classList.remove('visible');

  // Otwarcie div 'result-overlay'
  resultOverlay.style.opacity = '1';
  resultOverlay.style.visibility = 'visible';
});

// Obsługa kliknięcia przycisku "Potwierdź" w celu zamknięcia elementu "result-overlay"
confirmButton.addEventListener('click', () => {
  resultOverlay.style.opacity = '0';
  resultOverlay.style.visibility = 'hidden';
});
