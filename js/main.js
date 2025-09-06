// Language Toggle Functionality
let currentLang = 'en';

const translations = {
    quotes: {
        en: [
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.", author: "Mattie Stepanek" }
        ],
        am: [
            { text: "የወደፊቱ ጊዜ በሕልማቸው ውበት ለሚያምኑ ሰዎች ነው።", author: "ኤሌኖር ሩዝቬልት" },
            { text: "ትምህርት ዓለምን ለመለወጥ መጠቀም የሚችሉት በጣም ኃይለኛ መሣሪያ ነው።", author: "ኔልሰን ማንዴላ" },
            { text: "ታላቅ ሥራ ለመሥራት ብቸኛው መንገድ የሚሠሩትን መውደድ ነው።", author: "ስቲቭ ጆብስ" },
            { text: "አንድነት ጥንካሬ ነው... የቡድን ሥራ እና ትብብር ሲኖር ድንቅ ነገሮች ሊሳኩ ይችላሉ።", author: "ማቲ ስቴፓኔክ" }
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'am' : 'en';
            updateLanguage();
            updateQuote();
        });
    }

    // Update language on page load
    updateLanguage();
    updateQuote();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-card').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
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

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'var(--white)';
                navbar.style.boxShadow = 'var(--shadow)';
            }
        }
    });
});

// Update Language Function
function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-am]');
    const langBtn = document.querySelector('.lang-text');
    
    elements.forEach(el => {
        if (currentLang === 'en') {
            el.textContent = el.getAttribute('data-en');
            if (langBtn) langBtn.textContent = 'EN';
            document.documentElement.lang = 'en';
        } else {
            el.textContent = el.getAttribute('data-am');
            if (langBtn) langBtn.textContent = 'አማ';
            document.documentElement.lang = 'am';
            // Add Amharic font class
            el.classList.add('amharic');
        }
    });
}

// Update Quote Function
function updateQuote() {
    const quoteElement = document.getElementById('weeklyQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (quoteElement && authorElement) {
        const quotes = translations.quotes[currentLang];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        quoteElement.textContent = randomQuote.text;
        authorElement.textContent = `— ${randomQuote.author}`;
        
        if (currentLang === 'am') {
            quoteElement.classList.add('amharic');
            authorElement.classList.add('amharic');
        } else {
            quoteElement.classList.remove('amharic');
            authorElement.classList.remove('amharic');
        }
    }
}

// Form Validation (for contact and join pages)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');
        
        // Simple validation
        let isValid = true;
        
        if (name && name.value.trim() === '') {
            showError(name, currentLang === 'en' ? 'Name is required' : 'ስም ያስፈልጋል');
            isValid = false;
        }
        
        if (email && !isValidEmail(email.value)) {
            showError(email, currentLang === 'en' ? 'Valid email is required' : 'ትክክለኛ ኢሜል ያስፈልጋል');
            isValid = false;
        }
        
        if (message && message.value.trim() === '') {
            showError(message, currentLang === 'en' ? 'Message is required' : 'መልእክት ያስፈልጋል');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccess(currentLang === 'en' ? 'Form submitted successfully!' : 'ቅጹ በተሳካ ሁኔታ ተልኳል!');
            form.reset();
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(input, message) {
    const formControl = input.parentElement;
    const errorDisplay = formControl.querySelector('.error-message') || document.createElement('small');
    errorDisplay.className = 'error-message';
    errorDisplay.textContent = message;
    errorDisplay.style.color = 'red';
    if (!formControl.querySelector('.error-message')) {
        formControl.appendChild(errorDisplay);
    }
    input.style.borderColor = 'red';
}

// Show success message
function showSuccess(message) {
    const successAlert = document.createElement('div');
    successAlert.className = 'success-alert';
    successAlert.textContent = message;
    successAlert.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(successAlert);
    
    setTimeout(() => {
        successAlert.remove();
    }, 3000);
}

// Image Gallery Lightbox (for gallery sections)
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
            `;
            
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;
            
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.remove();
                }
            });
        });
    });
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initLightbox);

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Export functions for use in other pages
window.RVC = {
    validateForm,
    updateLanguage,
    initLightbox,
    lazyLoadImages
};