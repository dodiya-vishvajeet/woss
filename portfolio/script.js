
// ===== THEME TOGGLE FUNCTIONALITY =====
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check if user has a theme preference stored
if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark-mode');
    themeSwitch.checked = true;
} else {
    // Default to dark mode if no preference or preference is dark
    body.classList.add('dark-mode');
    themeSwitch.checked = false;
}

// Toggle theme when switch is clicked
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    // Update logo particles color when theme changes
    updateParticlesColor();
});

// Function to update particles color based on theme
function updateParticlesColor() {
    const logoParticles = document.querySelectorAll('.logo-particle');
    const color = body.classList.contains('dark-mode') ? 'var(--primary-color-dark)' : 'var(--primary-color-light)';

    logoParticles.forEach(particle => {
        particle.style.background = color;
    });

    // Also update floating elements
    const floatingElements = document.querySelectorAll('.floating-circle, .floating-square');
    floatingElements.forEach(el => {
        el.style.backgroundColor = color;
    });
}

// ===== CURSOR FOLLOWER =====
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    // mouseX = e.clientX;
    // mouseY = e.clientY;

    // Check if cursor is hovering over a link or button
    const target = e.target;
    if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('cta-button') ||
        target.closest('a') ||
        target.closest('button')
    ) {
        cursorFollower.classList.add('hover');
        // cursorFollower.style.width = '40px';
        // cursorFollower.style.height = '40px';
        cursorFollower.style.background = 'rgba(108, 99, 255, 0.2)';
    } else {
        cursorFollower.classList.remove('hover');
        // cursorFollower.style.width = '20px';
        // cursorFollower.style.height = '20px';
        if (body.classList.contains('dark-mode')) {
            cursorFollower.style.background = 'var(--primary-color-dark)';
        } else {
            cursorFollower.style.background = 'var(--primary-color-light)';
        }
    }
});

// Smooth cursor following animation
const updateCursorPosition = () => {
    const speed = 0.1;

    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursorFollower.style.transform = `translate(${cursorX - cursorFollower.offsetWidth / 2}px, ${cursorY - cursorFollower.offsetHeight / 2}px)`;

    requestAnimationFrame(updateCursorPosition);
};

updateCursorPosition();

// Hide cursor follower when cursor leaves the window
document.addEventListener('mouseout', (e) => {
    // Only hide if actually leaving the window, not just moving between elements
    if (e.relatedTarget === null) {
        cursorFollower.style.opacity = '0';
    }
});

document.addEventListener('mouseover', () => {
    cursorFollower.style.opacity = '0.7';
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a nav link
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Activate nav links on scroll
const sections = document.querySelectorAll('section');

function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== TYPEWRITER EFFECT =====
const typewriterText = document.getElementById('typewriter-text');
const phrases = [
    'Web Developer',
    'Web Designer',
    'Frontend Specialist',
    'Creative Coder'
];

let phraseIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeEffect() {
    if (!typewriterText) return; // Safety check

    const currentPhrase = phrases[phraseIndex];

    if (isTyping) {
        // Typing
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isTyping = false;
            setTimeout(typeEffect, 1500); // Wait before starting to delete
        } else {
            setTimeout(typeEffect, 100); // Typing speed
        }
    } else {
        // Deleting
        typewriterText.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;

        if (charIndex === 0) {
            isTyping = true;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
            setTimeout(typeEffect, 500); // Wait before typing next phrase
        } else {
            setTimeout(typeEffect, 50); // Deleting speed (faster than typing)
        }
    }
}

// ===== SKILLS PROGRESS ANIMATION =====
const skillProgressBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillProgressBars.forEach(progressBar => {
        const progress = progressBar.getAttribute('data-progress');
        progressBar.style.width = `${progress}%`;
    });
}

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps -> ~16ms per frame
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            // Show all if 'all' filter is selected
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 10);
            }
            // Show only matching category
            else if (card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 10);
            }
            // Hide non-matching
            else {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Form validation
        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }


    
        // Simple email validation regex
        const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            // emailInput.focus();
            return;
        }
        // For demo purposes, let's just log it to console
        console.log('Form submitted:', { name, email, subject, message });

        // Show success message (you can enhance this)
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===== LOGO PARTICLES ANIMATION =====
const logoParticles = document.querySelector('.logo-particles');

if (logoParticles) {
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.classList.add('logo-particle');

        // Random position within the logo
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Random size
        const size = Math.random() * 3 + 1;

        // Random animation delay
        const delay = Math.random() * 2;

        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${body.classList.contains('dark-mode') ? 'var(--primary-color-dark)' : 'var(--primary-color-light)'};
            left: ${posX}%;
            top: ${posY}%;
            border-radius: 50%;
            animation: particleAnimation 3s infinite ease-in-out ${delay}s;
        `;

        logoParticles.appendChild(particle);
    }

    // Create CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleAnimation {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
            100% { transform: translateY(0) rotate(360deg); opacity: 0.5; }
        }
    `;
    document.head.appendChild(styleSheet);
}

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If skills section comes into view, animate the skill bars
            if (entry.target.id === 'skills') {
                animateSkills();
            }

            // If about section comes into view, animate the stats
            if (entry.target.id === 'about') {
                animateStats();
            }

            // Add animation class to section
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);

    // Add base class for animations
    section.classList.add('reveal-section');
});

// Add CSS for reveal animations
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const parallaxBg = document.querySelector('.parallax-bg');

if (parallaxBg) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Add floating elements to the parallax background
    for (let i = 0; i < 20; i++) {
        const floatingEl = document.createElement('div');

        // Random properties
        const size = Math.random() * 30 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.1 + 0.05;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        // Create shape - alternate between circles and squares
        floatingEl.classList.add(i % 2 === 0 ? 'floating-circle' : 'floating-square');

        // Apply styles
        floatingEl.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background-color: ${body.classList.contains('dark-mode') ? 'var(--primary-color-dark)' : 'var(--primary-color-light)'};
            opacity: ${opacity};
            border-radius: ${i % 2 === 0 ? '50%' : '5px'};
            animation: float ${duration}s infinite ease-in-out ${delay}s;
        `;

        parallaxBg.appendChild(floatingEl);
    }

    // Add float animation
    const floatAnimation = document.createElement('style');
    floatAnimation.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(15px, 15px) rotate(180deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    document.head.appendChild(floatAnimation);
}

// ===== GLITCH TEXT EFFECT =====
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.setAttribute('data-text', glitchText.textContent);
}

// ===== HANDLE WINDOW RESIZE =====
window.addEventListener('resize', () => {
    // Recalculate nav links on resize
    updateActiveNavLink();
});

// ===== INITIALIZE EVERYTHING ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Preloader animation (can be added if needed)
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // Make sure first filter button is active if it exists
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('active');
    }

    // Set all projects visible initially
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
    });

    // Add initial animations for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-in');
    }

    // Start typewriter effect
    if (typewriterText) {
        setTimeout(typeEffect, 1000);
    }
});



// Initialize EmailJS
(function () {
    emailjs.init("t-4q9QbZEIXjUr_Ch"); // ✅ Your Public Key
})();

// Send Email Function
const sendEmail = (e) => {
    e.preventDefault();
   
    const emailInput = e.target.querySelector('input[name="user_email"]');
    const email = emailInput.value;
    console.log("email->",email);

    // Simple email validation regex
    const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
    }

    emailjs.sendForm(
        'service_90tvv2i',   // ✅ Your Service ID
        'template_k36dmxj',  // ✅ Your Template ID
        e.target             // ✅ The form element
    ).then(
        (result) => {
            console.log('Email sent successfully:', result.text);
            alert('Message sent successfully!');
            e.target.reset(); // Clear the form
        },
        (error) => {
            console.log('Email send failed:', error.text);
            alert('Failed to send message. Please try again!');
        }
    );
};

function my_email_copy() {
    navigator.clipboard.writeText("dodiyavishvajeeet@gmail.com");
     alert("Copy Email");
}
  
