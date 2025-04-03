// App data with modern colors and gradients
let currentCategory = 'all';
let searchQuery = '';

// Handle app launching with animation
function launchApp(url, appCard) {
    // Prevent double-clicks
    if (appCard.classList.contains('launching')) return;
    
    // Get the app's color for the liquid effect
    const iconContainer = appCard.querySelector('.icon-container');
    const color = window.getComputedStyle(iconContainer).backgroundColor;
    
    // Prepare for animation
    appCard.style.color = color;
    
    // Use requestAnimationFrame to ensure smooth animation
    requestAnimationFrame(() => {
        appCard.classList.add('launching');
        document.body.style.pointerEvents = 'none';
        
        // Navigate after animation (matches our 0.2s design system transition)
        setTimeout(() => {
            // Handle external URLs
            if (url.startsWith('http')) {
                window.open(url, '_blank');
                // Reset the card state for external links
                appCard.classList.remove('launching');
                appCard.style.color = '';
                document.body.style.pointerEvents = '';
            } else {
                window.location.href = url;
            }
        }, 160); // Slightly shorter than animation for smooth transition
    });
}

// Reset animation state when page loads or when navigating back
window.addEventListener('pageshow', (event) => {
    // Remove launching class from all app cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.classList.remove('launching');
        card.style.color = '';
    });
    
    // Re-enable pointer events
    document.body.style.pointerEvents = '';
});

// Also reset on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.app-card').forEach(card => {
        card.classList.remove('launching');
        card.style.color = '';
    });
    document.body.style.pointerEvents = '';
});

// Create a throttled click handler with our design system timing
let isProcessingClick = false;

// Handle click events for app cards
document.addEventListener('click', (e) => {
    const appCard = e.target.closest('.app-card');
    if (!appCard || isProcessingClick) return;
    
    const appName = appCard.querySelector('.app-name').textContent;
    let appUrl;
    
    // Special handling for apps
    if (appName === 'PriceDown') {
        appUrl = 'apps/pricedown/index.html';
    } else if (appName === 'TutorPh') {
        appUrl = 'https://tutorph.netlify.app';
    } else {
        appUrl = `apps/${appName.toLowerCase()}.html`;
    }
    
    // Prevent multiple rapid clicks using design system transition time
    isProcessingClick = true;
    setTimeout(() => isProcessingClick = false, 200);
    
    e.preventDefault();
    launchApp(appUrl, appCard);
});

// App data with descriptions and features
const apps = [
    {
        name: 'TutorPh',
        icon: 'fa-light fa-chalkboard-user',
        category: 'education',
        isNew: true,
        description: 'Connect with expert tutors and enhance your learning experience.',
        features: [
            { icon: 'fa-light fa-users', text: 'Expert tutors' },
            { icon: 'fa-light fa-video', text: 'Live sessions' },
            { icon: 'fa-light fa-calendar-check', text: 'Flexible scheduling' },
            { icon: 'fa-light fa-star', text: 'Quality education' }
        ],
        screenshots: ['dashboard.png', 'session.png', 'schedule.png']
    },
    {
        name: 'Calendar',
        icon: 'fa-light fa-calendar-days',
        category: 'dashboard',
        description: 'Smart calendar for managing your academic schedule and deadlines.',
        features: [
            { icon: 'fa-light fa-calendar-check', text: 'Schedule management' },
            { icon: 'fa-light fa-bell', text: 'Deadline reminders' },
            { icon: 'fa-light fa-share-nodes', text: 'Schedule sharing' },
            { icon: 'fa-light fa-calendar-sync', text: 'Sync with other apps' }
        ],
        screenshots: ['calendar.png', 'schedule.png', 'reminders.png']
    },
    {
        name: 'ArcherEye',
        icon: 'fa-light fa-chart-mixed',
        category: 'analytics',
        isNew: true,
        description: 'Advanced analytics platform for tracking and visualizing student performance metrics in real-time.',
        features: [
            { icon: 'fa-light fa-chart-line', text: 'Real-time performance tracking' },
            { icon: 'fa-light fa-brain-circuit', text: 'AI-powered insights' },
            { icon: 'fa-light fa-chart-scatter', text: 'Custom data visualization' },
            { icon: 'fa-light fa-file-excel', text: 'Export reports to Excel' }
        ],
        screenshots: ['dashboard.png', 'analytics.png', 'reports.png']
    },
    {
        name: 'ClassSniper',
        icon: 'fa-light fa-brackets-curly',
        category: 'development',
        description: 'Smart course registration assistant that helps you get into your desired classes instantly.',
        features: [
            { icon: 'fa-light fa-bell', text: 'Real-time notifications' },
            { icon: 'fa-light fa-robot', text: 'Automated registration' },
            { icon: 'fa-light fa-calendar-check', text: 'Schedule planning' },
            { icon: 'fa-light fa-clock-rotate-left', text: 'Waitlist tracking' }
        ],
        screenshots: ['courses.png', 'registration.png', 'schedule.png']
    },
    {
        name: 'PriceDown',
        icon: 'fa-light fa-peso-sign',
        category: 'dashboard',
        isPopular: true,
        color: '#FFD700',
        solidColor: true,
        description: 'Student exclusive discounts and deals tracker for school supplies and daily essentials.',
        features: [
            { icon: 'fa-light fa-tag', text: 'Student Discounts' },
            { icon: 'fa-light fa-percent', text: 'Daily Deals' },
            { icon: 'fa-light fa-bell', text: 'Price Alerts' },
            { icon: 'fa-light fa-star', text: 'Most Bought Items' }
        ],
        screenshots: ['deals.png', 'discounts.png', 'alerts.png']
    },
    {
        name: 'LoveSalle',
        icon: 'fa-light fa-heart',
        category: 'chat',
        isPopular: true,
        description: 'Campus social network for events, discussions, and connecting with fellow students.',
        features: [
            { icon: 'fa-light fa-calendar-heart', text: 'Event planning' },
            { icon: 'fa-light fa-comments', text: 'Group chats' },
            { icon: 'fa-light fa-user-plus', text: 'Friend finder' },
            { icon: 'fa-light fa-photo-film', text: 'Media sharing' }
        ],
        screenshots: ['events.png', 'messages.png', 'profile.png']
    },
    {
        name: 'Notes',
        icon: 'fa-light fa-note-sticky',
        category: 'documentation',
        description: 'Simple and efficient note-taking app for students.',
        features: [
            { icon: 'fa-light fa-pen', text: 'Quick notes' },
            { icon: 'fa-light fa-folder-tree', text: 'Organization' },
            { icon: 'fa-light fa-cloud', text: 'Cloud sync' },
            { icon: 'fa-light fa-share', text: 'Easy sharing' }
        ],
        screenshots: ['notes.png', 'folders.png', 'sharing.png']
    }
];


// App frame functionality
function showApp(app) {
    const appFrame = document.querySelector('.app-frame');
    const appContent = appFrame.querySelector('.app-content');
    const mainContent = document.querySelector('.content');
    const header = document.querySelector('.app-frame-header');

    // Set iframe source based on app name
    appContent.src = `/${app.name.toLowerCase()}`;

    // Show app frame
    appFrame.style.display = 'block';
    setTimeout(() => {
        appFrame.classList.add('active');
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 200);
    }, 50);

    // Handle escape key
    document.addEventListener('keydown', handleEscape);
}

function hideApp() {
    const appFrame = document.querySelector('.app-frame');
    const appContent = appFrame.querySelector('.app-content');
    const mainContent = document.querySelector('.content');

    appFrame.classList.remove('active');
    mainContent.style.display = 'flex';
    
    setTimeout(() => {
        appFrame.style.display = 'none';
        appContent.src = '';
    }, 200);

    // Remove escape key handler
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(e) {
    if (e.key === 'Escape') {
        hideApp();
    }
}

function initializeAppFrame() {
    const backButton = document.querySelector('.back-to-grid');
    backButton.addEventListener('click', hideApp);
}

// Create app card element
function getGradientForCategory(category) {
    const gradients = {
        analytics: 'linear-gradient(135deg, #56E1E9, #5B58EB)',      // Cyan to Purple
        documentation: 'linear-gradient(135deg, #5B58EB, #BB63FF)',   // Purple to Violet
        development: 'linear-gradient(135deg, #BB63FF, #56E1E9)',     // Violet to Cyan
        dashboard: 'linear-gradient(135deg, #56E1E9, #112C77)',       // Cyan to Navy
        chat: 'linear-gradient(135deg, #5B58EB, #0A2353)',           // Purple to Deep Blue
        blog: 'linear-gradient(135deg, #BB63FF, #112C77)',           // Violet to Navy
        bookmarks: 'linear-gradient(135deg, #56E1E9, #5B58EB)',      // Cyan to Purple
        email: 'linear-gradient(135deg, #5B58EB, #BB63FF)',          // Purple to Violet
        food: 'linear-gradient(135deg, #FF7EB3, #FF96F9)'            // Pink to Magenta
    };
    return gradients[category] || 'linear-gradient(135deg, #112C77, #0A2353)';
}

function filterApps() {
    return apps.filter(app => {
        const matchesCategory = 
            currentCategory === 'all' ||
            (currentCategory === 'new' && app.isNew) ||
            (currentCategory === 'popular' && app.isPopular) ||
            app.category === currentCategory;

        const matchesSearch = 
            searchQuery === '' ||
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });
}

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.setAttribute('data-category', app.category);
    card.setAttribute('data-name', app.name);
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    // Background color is now handled by CSS
    
    const icon = document.createElement('i');
    icon.className = app.icon;
    
    iconContainer.appendChild(icon);
    
    const name = document.createElement('span');
    name.className = 'app-name';
    name.textContent = app.name;
    
    // Badges removed for cleaner look
    
    card.appendChild(iconContainer);
    card.appendChild(name);
    
    // Add click handler for direct app launch
    card.addEventListener('click', () => {
        // Only launch apps that have placeholder pages for now
        const launchableApps = ['lovesalle', 'classsniper', 'parknow'];
        const appNameLower = app.name.toLowerCase();
        
        if (launchableApps.includes(appNameLower)) {
            const appUrl = `apps/${appNameLower}.html`;
            launchApp(appUrl, card);
        }
    });
    
    return card;
}

// Generate app grid
function generateAppGrid() {
    const appGrid = document.querySelector('.app-grid');
    appGrid.innerHTML = '';
    const filteredApps = filterApps();
    filteredApps.forEach(app => {
        appGrid.appendChild(createAppCard(app));
    });
}

function initializeEventListeners() {
    // Category filtering
    const categoryTags = document.querySelectorAll('.category-tag');
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentCategory = tag.getAttribute('data-category');
            generateAppGrid();
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    let debounceTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            searchQuery = e.target.value;
            generateAppGrid();
        }, 300);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    generateAppGrid();
    initializeEventListeners();
    initializeAppFrame();
});
