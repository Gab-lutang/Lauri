// Sample data structure for memories
const memories = [
    {
        id: 1,
        date: '2024-01-01',
        title: 'Our First Meeting',
        description: 'The day our eyes met for the first time ❤️',
        image: '/api/placeholder/400/320',
        tags: ['first meeting', 'special day'],
        notes: []
    },
    {
        id: 2,
        date: '2024-02-14',
        title: 'First Valentine's Day',
        description: 'A magical evening under the stars 🌟',
        image: '/api/placeholder/400/320',
        tags: ['valentine', 'date night'],
        notes: []
    }
];

// State management
const state = {
    currentView: 'timeline',
    currentSlide: 0,
    isModalOpen: false
};

// Initialize the timeline
function initializeTimeline() {
    const timelineEvents = document.getElementById('timeline-events');
    if (!timelineEvents) return; // Guard clause for missing element
    
    timelineEvents.innerHTML = '';
    
    const sortedMemories = [...memories].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedMemories.forEach((memory, index) => {
        const event = createTimelineEvent(memory, index);
        timelineEvents.appendChild(event);
    });

    initializeScrollAnimation();
    createPhotoGrid();
    createSlideshow();
}

// Create timeline event element
function createTimelineEvent(memory, index) {
    const event = document.createElement('div');
    event.className = 'timeline-event';
    event.style.animationDelay = `${index * 0.2}s`;

    const date = new Date(memory.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const img = new Image();
    handleImageError(img);
    img.src = memory.image;
    img.alt = memory.title;
    img.className = 'event-image';
    img.loading = 'lazy';

    event.innerHTML = `
        <div class="event-content" onclick="openMemoryModal(${memory.id})">
            <span class="event-date">${formattedDate}</span>
            <img src="${memory.image}" alt="${memory.title}" class="event-image" loading="lazy">
            <h3 class="event-title">${memory.title}</h3>
            <p class="event-description">${memory.description}</p>
            <div class="event-tags">
                ${memory.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    return event;
}

// Create photo grid
function createPhotoGrid() {
    const gridView = document.getElementById('grid-view');
    if (!gridView) return;

    gridView.innerHTML = memories.map(memory => `
        <div class="photo-card" onclick="openMemoryModal(${memory.id})">
            <img src="${memory.image}" alt="${memory.title}" loading="lazy">
            <div class="photo-info">
                <h3>${memory.title}</h3>
                <p>${formatDate(memory.date)}</p>
            </div>
        </div>
    `).join('');
}

// Create slideshow
function createSlideshow() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    if (!slidesWrapper) return;

    slidesWrapper.innerHTML = memories.map((memory, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${memory.image}" alt="${memory.title}" loading="lazy">
            <div class="slide-info">
                <h3>${memory.title}</h3>
                <p>${memory.description}</p>
            </div>
        </div>
    `).join('');
}

// Scroll animation
function initializeScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('.timeline-event').forEach(event => {
        observer.observe(event);
    });
}

// View switching
function switchView(viewName) {
    const views = ['timeline', 'grid', 'slideshow'];
    views.forEach(view => {
        const element = document.getElementById(`${view}-view`);
        const button = document.querySelector(`[data-view="${view}"]`);
        
        if (view === viewName) {
            element.classList.remove('hidden');
            button.classList.add('active');
            state.currentView = view;
        } else {
            element.classList.add('hidden');
            button.classList.remove('active');
        }
    });
}

// Slideshow controls
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    slides[state.currentSlide].classList.remove('active');
    state.currentSlide = (state.currentSlide + 1) % slides.length;
    slides[state.currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    slides[state.currentSlide].classList.remove('active');
    state.currentSlide = (state.currentSlide - 1 + slides.length) % slides.length;
    slides[state.currentSlide].classList.add('active');
}

// Modal handling with error checking
function openMemoryModal(memoryId) {
    const memory = memories.find(m => m.id === memoryId);
    const modal = document.getElementById('memory-modal');
    
    if (!memory || !modal) return;
    
    try {
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.memory-title');
        const modalDate = modal.querySelector('.memory-date');
        const modalDescription = modal.querySelector('.memory-description');
        const modalTags = modal.querySelector('.memory-tags');

        if (modalImage) modalImage.src = memory.image;
        if (modalTitle) modalTitle.textContent = memory.title;
        if (modalDate) modalDate.textContent = formatDate(memory.date);
        if (modalDescription) modalDescription.textContent = memory.description;
        if (modalTags && memory.tags) {
            modalTags.innerHTML = memory.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }
        
        modal.style.display = 'block';
        state.isModalOpen = true;
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function closeMemoryModal() {
    const modal = document.getElementById('memory-modal');
    modal.style.display = 'none';
    state.isModalOpen = false;
    document.body.style.overflow = 'auto';
}

// Utility function for date formatting
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; // Fallback to original string
    }
}

// Event Listeners with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all views
        initializeTimeline();
        
        // Initialize touch controls
        initializeTouchControls();
        
        // Add event listeners for view switching
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const view = button.dataset.view;
                if (view) switchView(view);
            });
        });

        // Add event listener for add memory button
        const addMemoryBtn = document.getElementById('add-memory-btn');
        if (addMemoryBtn) {
            addMemoryBtn.addEventListener('click', () => {
                alert('Add memory feature coming soon!');
            });
        }

        // Add event listener for modal close
        const closeModalBtn = document.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeMemoryModal);
        }

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Keyboard navigation handler
function handleKeyboardNavigation(e) {
    if (state.isModalOpen && e.key === 'Escape') {
        closeMemoryModal();
        return;
    }

    if (state.currentView === 'slideshow') {
        switch(e.key) {
            case 'ArrowRight':
                nextSlide();
                break;
            case 'ArrowLeft':
                prevSlide();
                break;
        }
    }
}

// Photo grid item creation
function createPhotoCard(memory) {
    return `
        <div class="photo-card" onclick="openMemoryModal(${memory.id})">
            <img src="${memory.image}" alt="${memory.title}" loading="lazy">
            <div class="photo-info">
                <h3>${memory.title}</h3>
                <p>${formatDate(memory.date)}</p>
                <div class="photo-tags">
                    ${memory.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Slide creation
function createSlide(memory, index) {
    return `
        <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${memory.image}" alt="${memory.title}" loading="lazy">
            <div class="slide-info">
                <h3>${memory.title}</h3>
                <p>${memory.description}</p>
                <div class="slide-tags">
                    ${memory.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Replace the direct touch event listeners with a safer initialization
function initializeTouchControls() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;

    let touchStartX = 0;
    let touchEndX = 0;

    slideshowContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slideshowContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide(); // Swipe left
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide(); // Swipe right
        }
    });
}

// Add loading state
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Add error handling for images
function handleImageError(img) {
    img.onerror = () => {
        img.src = 'path/to/fallback-image.jpg'; // Add a fallback image
        img.alt = 'Image not available';
    };
}
  