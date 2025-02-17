// Modal functionality
const shopBtn = document.getElementById('shopBtn');
const aboutBtn = document.getElementById('aboutBtn');
const shopModal = document.getElementById('shopModal');
const aboutModal = document.getElementById('aboutModal');
const closeButtons = document.querySelectorAll('.close-modal');

function openModal(modal) {
    modal.style.display = 'flex';
    // Allow time for display:flex to take effect before adding the show class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }, 300); // Match the transition duration
}

shopBtn.addEventListener('click', () => openModal(shopModal));
aboutBtn.addEventListener('click', () => openModal(aboutModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal);
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Dynamic hero graphics animation
const heroGraphics = document.querySelector('.hero-graphics');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    heroGraphics.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button to show processing
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent!';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// Add CSS class for fade-in animations
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .hidden {
            transition: none;
        }
    }
`;
document.head.appendChild(style);

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Parallax effect for portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');

window.addEventListener('scroll', () => {
    portfolioItems.forEach(item => {
        const speed = 0.2;
        const rect = item.getBoundingClientRect();
        const scrolled = window.scrollY;
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            const translateY = (rect.top - window.innerHeight / 2) * speed;
            item.style.transform = `translateY(${translateY}px)`;
        }
    });
});
