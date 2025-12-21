// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const cartCount = document.querySelector('.cart-count');
const viewAllBtn = document.querySelector('.view-all');
const ctaButton = document.querySelector('.cta-button');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        document.body.style.overflow = 'auto';
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality (demo)
function addToCart() {
    let count = parseInt(cartCount.textContent) || 0;
    count++;
    cartCount.textContent = count;
    cartCount.style.display = 'flex';
    
    // Add animation
    cartCount.style.animation = 'bounce 0.5s';
    setTimeout(() => {
        cartCount.style.animation = '';
    }, 500);
}

// View All Categories button
viewAllBtn.addEventListener('click', () => {
    // In a real app, this would navigate to a categories page
    alert('Navigating to all categories...');
});

// CTA Button hover effect
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        const icon = ctaButton.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(5px)';
        }
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        const icon = ctaButton.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(0)';
        }
    });
}

// Sticky header on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add animation to category cards on scroll
const categoryCards = document.querySelectorAll('.category-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

categoryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        }
    });
}

// Add to cart buttons functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart();
        
        // Button animation
        button.textContent = 'Added to Cart!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = 'Add to Cart <i class="fas fa-shopping-cart"></i>';
            button.style.backgroundColor = '';
        }, 2000);
    });
});

// Initialize cart count
function initCart() {
    const count = localStorage.getItem('cartCount');
    if (count) {
        cartCount.textContent = count;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Save cart count to localStorage
function saveCartCount(count) {
    localStorage.setItem('cartCount', count);
}

// Initialize the page
function init() {
    initCart();
    
    // Add smooth fade-in animation to sections on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add animation to hero content
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
}

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const img = card.querySelector('img');
    const quickView = card.querySelector('.quick-view');
    
    if (img && quickView) {
        card.addEventListener('mouseenter', () => {
            quickView.style.opacity = '1';
            quickView.style.visibility = 'visible';
        });
        
        card.addEventListener('mouseleave', () => {
            quickView.style.opacity = '0';
            quickView.style.visibility = 'hidden';
        });
    }
});
