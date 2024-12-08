// Select elemenets from DOM
const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const h3 = document.querySelector('h3');
const h1 = document.querySelector('h1');
const resetBtn = document.getElementById('reset-btn');

// When the page loads, the DOMContentLoaded event handler checks for saved progress in localStorage and updates the UI accordingly
document.addEventListener('DOMContentLoaded', () => {
  const saveProgress = localStorage.getItem('hydrationProgress');
  if (saveProgress) {
    const progress = JSON.parse(saveProgress);
    progress.forEach((isFull, idx) => {
      if (isFull) smallCups[idx].classList.add('full');
    });
  }

  updateBigCup();
});

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
  if (
    smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling?.classList.contains('full')
  ) {
    idx--;
  }
  smallCups.forEach((cup, i) => {
    if (i <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  saveProgress();
  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
    h3.innerText = `🥳🥳🥳Goal Achieved!`;
    h3.style.fontSize = '30px';
    h3.style.fontWeight = 'bold';
    h3.style.color = '#144fc6';
    h1.style.visibility = 'hidden';
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
    h3.innerText = 'Goal: 2 Liters / Day';
    h3.style.cssText = '';
    h1.style.visibility = 'visible';
  }
}

function saveProgress() {
  const progress = Array.from(smallCups).map((cup) => cup.classList.contains('full'));
  localStorage.setItem('hydrationProgress', JSON.stringify(progress));
}

// Reset progress
function resetProgress() {
  smallCups.forEach((cup) => cup.classList.remove('full'));
  localStorage.removeItem('hydrationProgress'); // Clear localStorage
  updateBigCup(); // Reset UI
}

resetBtn.addEventListener('click', resetProgress);

// Function to display the current date and time
function displayDateTime() {
  const dateTimeElement = document.getElementById('date-time');
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  dateTimeElement.innerText = now.toLocaleString('en-US', options);
}

// Call the function initially and update every second
setInterval(displayDateTime, 1000);
displayDateTime();
