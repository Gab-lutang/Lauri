function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Sample photo data with 14 photos
const photos = [
    {
        src: 'Street_dance.jpg',
        caption: 'Street Dance'
    },
    {
        src: 'Sassy.jpg',
        caption: 'Slay my Queen'
    },
    {
        src: 'Pinakilala.jpg',
        caption: 'Pinakilala'
    },
    {
        src: 'Seminar.jpg',
        caption: 'Grade 11 Seminar'
    },
    {
        src: 'Buwan_ng_wika.jpg',
        caption: 'Buwan ng Wika'
    },
    {
        src: 'OD.jpg',
        caption: 'Secretary kong maganda'
    },
    {
        src: 'exam.jpg',
        caption: 'Exam'
    },
    {
        src: 'Beautiful.jpg',
        caption: 'Random Gorgeous'
    },
    {
        src: 'Baby.jpg',
        caption: 'Pak'
    },
    {
        src: 'Wifey.jpg',
        caption: 'Ganda'
    },
    {
        src: 'Kpop.jpg',
        caption: 'My Kpop Star'
    },
    {
        src: 'Ble.jpg',
        caption: '😝'
    },
    {
        src: 'Slay.jpg',
        caption: 'Slay'
    },
    {
        src: 'Plastic_cover.jpg',
        caption: 'Nuks walang plastic cover'
    },
    {
        src: 'Beautiful2.jpg',
        caption: 'Miming si Ganda'
    },
    {
        src: 'cutie1.jpg',
        caption: 'Baby Cutie'
    },
    {
        src: 'cutie2.jpg',
        caption: 'Arte ng baby'
    },
    {
        src: 'Sheesh.jpg',
        caption: 'Sheesh'
    },
];

// Optimize photo grid creation
function createPhotoGrid() {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;
    
    const fragment = document.createDocumentFragment();
    
    photos.forEach((photo) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.loading = 'lazy';
        
        // Add click handler
        img.onclick = () => openModal(img);
        
        const info = document.createElement('div');
        info.className = 'photo-info';
        info.innerHTML = `<div class="photo-caption">${photo.caption}</div>`;
        
        card.appendChild(img);
        card.appendChild(info);
        fragment.appendChild(card);
    });
    
    grid.innerHTML = '';
    grid.appendChild(fragment);
}

// Toggle between grid and slideshow views
function toggleView(view) {
    const gridView = document.getElementById('photo-grid');
    const slideshowView = document.getElementById('slideshow');
    
    if (view === 'grid') {
        gridView.style.display = 'grid';
        slideshowView.style.display = 'none';
    } else {
        gridView.style.display = 'none';
        slideshowView.style.display = 'block';
        showSlideshow(); // Initialize slideshow when switching to slideshow view
    }
}

// Modal functions
function openModal(img) {
    const modal = document.querySelector('.photo-modal');
    const modalImg = modal.querySelector('.modal-content');
    
    // Show modal
    modal.style.display = 'flex';
    
    // Force reflow
    void modal.offsetWidth;
    
    // Add active class for animation
    modal.classList.add('active');
    
    // Set image source
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    // Animate image
    setTimeout(() => {
        modalImg.classList.add('active');
    }, 10);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.photo-modal');
    const modalImg = modal.querySelector('.modal-content');
    
    // Remove active classes
    modalImg.classList.remove('active');
    modal.classList.remove('active');
    
    // Hide modal after animation
    setTimeout(() => {
        modal.style.display = 'none';
        // Reset image
        modalImg.src = '';
        // Restore body scrolling
        document.body.style.overflow = '';
    }, 300);
}

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    
    const animate = () => {
        current += increment;
        if (current > target) {
            current = target;
        }
        element.textContent = Math.round(current);
        
        if (current < target) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// Update counters function
function updateCounters() {
    const daysTogether = 270; // Fixed number of days
    const photoCount = 14;    // Fixed number of photos
    
    const daysElement = document.getElementById('days-together');
    const photosElement = document.getElementById('photo-count');
    
    if (daysElement && photosElement) {
        animateCounter(daysElement, daysTogether);
        animateCounter(photosElement, photoCount);
    }
}

// Hearts background
function toggleHearts() {
    const container = document.getElementById('hearts-container');
    
    if (container.children.length > 0) {
        // If hearts exist, remove them with fade out
        container.style.opacity = '0';
        setTimeout(() => {
            container.innerHTML = '';
            container.style.opacity = '1';
        }, 500);
    } else {
        // Create new hearts
        createHearts();
        
        // Recreate hearts periodically for continuous effect
        setInterval(() => {
            if (container.children.length > 0) {
                const oldHeart = container.children[0];
                oldHeart.style.opacity = '0';
                setTimeout(() => oldHeart.remove(), 500);
                
                const newHeart = createSingleHeart();
                container.appendChild(newHeart);
            }
        }, 3000);
    }
}

function createHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['🫀', '💝', '💖', '💗', '💓', '💕', '💞', '💘', '💟', '🧸', '🌷'];
    
    // Clear existing hearts
    container.innerHTML = '';
    
    // Create new hearts
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        // Random heart symbol
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random position
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 20 + Math.random() * 20;
        heart.style.fontSize = `${size}px`;
        
        // Random animation delay and duration
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${5 + Math.random() * 5}s`;
        
        container.appendChild(heart);
    }
}

function createSingleHeart() {
    const heartSymbols = ['🫀', '💝', '💖', '💗', '💓', '💕', '💞', '💘', '💟'];
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.fontSize = `${20 + Math.random() * 20}px`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    return heart;
}

// Add smooth page transitions
function addPageTransitions() {
    const content = document.querySelector('.container');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    requestAnimationFrame(() => {
        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    });
}

// Slideshow functionality
class Slideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = photos;
        this.isPlaying = true;
        this.interval = null;
        this.initSlideshow();
    }

    initSlideshow() {
        const container = document.getElementById('slideshow');
        if (!container) return;

        // Create slideshow HTML structure
        container.innerHTML = `
            <div class="slideshow-inner">
                <div class="slides-container"></div>
                <button class="slide-arrow prev">❮</button>
                <button class="slide-arrow next">❯</button>
                <div class="slide-controls">
                    <button class="play-pause">⏸️</button>
                    <div class="slide-dots"></div>
                </div>
            </div>
        `;

        this.createSlides();
        this.addEventListeners();
        this.startSlideshow();
        this.showSlide(0);
    }

    createSlides() {
        const slidesContainer = document.querySelector('.slides-container');
        const dotsContainer = document.querySelector('.slide-dots');

        this.slides.forEach((photo, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <img src="${photo.src}" 
                     alt="${photo.caption}"
                     loading="${index === 0 ? 'eager' : 'lazy'}"
                     class="slide-image">
                <div class="slide-caption">
                    <h3>${photo.caption}</h3>
                </div>
            `;
            slidesContainer.appendChild(slide);

            // Create dot
            const dot = document.createElement('button');
            dot.className = 'slide-dot';
            dot.setAttribute('data-slide', index);
            dotsContainer.appendChild(dot);
        });
    }

    addEventListeners() {
        // Arrow navigation
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());

        // Dot navigation
        document.querySelectorAll('.slide-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                this.showSlide(slideIndex);
            });
        });

        // Play/Pause
        document.querySelector('.play-pause').addEventListener('click', () => this.togglePlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') this.togglePlay();
        });

        // Touch events
        let touchStartX = 0;
        const slidesContainer = document.querySelector('.slides-container');
        
        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        slidesContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
            }
        }, { passive: true });
    }

    showSlide(index) {
        const slideImage = document.querySelector('.slide-image');
        const slideCaption = document.querySelector('.slide-caption');
        
        if (slideImage && slideCaption) {
            // Add fade out effect
            slideImage.style.opacity = 0;
            
            setTimeout(() => {
                slideImage.src = photos[index].src;
                slideCaption.textContent = photos[index].caption;
                // Fade in new slide
                slideImage.style.opacity = 1;
            }, 300); // Wait for fade out before changing image
        }
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }

    togglePlay() {
        const button = document.querySelector('.play-pause');
        this.isPlaying = !this.isPlaying;
        button.textContent = this.isPlaying ? '⏸️' : '▶️';
        
        if (this.isPlaying) {
            this.startSlideshow();
        } else {
            clearInterval(this.interval);
        }
    }

    startSlideshow() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Changed to 5000 milliseconds (5 seconds)
    }
}

// Optimize scroll performance
function optimizeScroll() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Any scroll-based updates go here
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Initialize with performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize counters first
    updateCounters();
    
    // Then initialize other features
    createPhotoGrid();
    optimizeScroll();
    addPageTransitions();
    
    // Initialize slideshow when switching to slideshow view
    document.querySelector('[data-view="slideshow"]').addEventListener('click', () => {
        new Slideshow();
    });
});

// Update counter function
function updateCounters() {
    const daysTogether = 270; // Fixed at 270 days
    const photoCount = 14;    // Fixed at 14 photos
    
    const daysElement = document.getElementById('days-together');
    const photosElement = document.getElementById('photo-count');
    
    if (!daysElement || !photosElement) {
        console.error('Counter elements not found!');
        return;
    }
    
    // Add console logs for debugging
    console.log('Updating counters:', { daysTogether, photoCount });
    
    animateCounter(daysElement, daysTogether);
    animateCounter(photosElement, photoCount);
}

// Add keyboard support for closing modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside the image
document.querySelector('.photo-modal').addEventListener('click', (e) => {
    if (e.target.classList.contains('photo-modal')) {
        closeModal();
    }
});

// Initialize hearts on page load
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
});

let currentSlideIndex = 0;

function showSlideshow() {
    const slideshowContainer = document.getElementById('slideshow');
    slideshowContainer.innerHTML = `
        <div class="slide-container">
            <img src="${photos[currentSlideIndex].src}" alt="${photos[currentSlideIndex].caption}" class="slide-image">
            <div class="slide-caption">${photos[currentSlideIndex].caption}</div>
        </div>
    `;
}

// Set 2 second interval for auto-advance
setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % photos.length;
    showSlideshow();
}, 2000); // 2000 milliseconds = 2 seconds

