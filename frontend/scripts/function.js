const cards = document.querySelectorAll('.card');
let currentIndex = 0;

function updateCardClasses() {

    cards.forEach(card => {
        card.classList.remove('active', 'previous', 'next');
    });

    cards[currentIndex].classList.add('active');
    cards[(currentIndex - 1 + cards.length) % cards.length].classList.add('previous');
    cards[(currentIndex + 1) % cards.length].classList.add('next');
}

function nextCard() {
    currentIndex = (currentIndex + 1) % 
}
