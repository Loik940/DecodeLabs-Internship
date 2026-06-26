const burger = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', function() {
    const isOpen = navLinks.classList.toggle('nav-ouverte');
    burger.setAttribute('aria-expanded', isOpen);
});