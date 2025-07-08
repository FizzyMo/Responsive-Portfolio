// Toggle menu icon functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Progress Bar
document.addEventListener('DOMContentLoaded', () => {
    const progressElements = document.querySelectorAll('.progress');
    
    progressElements.forEach(progress => {
        const width = parseInt(progress.getAttribute('data-width'), 10);
        const bar = progress.querySelector('.bar span');
        bar.style.width = width + '%';
    });
});

// Highlight active navigation link based on scroll position
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections animate on scroll
            sec.classList.add('show-animate');
        } 
        else {
            sec.classList.remove('show-animate');
        }
    });

    // Make header sticky on scroll
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon/navbar when click navbar links
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

