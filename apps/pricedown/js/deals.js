// Function to truncate text
function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

// Function to determine product category based on name
function getProductCategory(name) {
    name = name.toLowerCase();
    if (name.includes('art') || name.includes('color') || name.includes('draw') || name.includes('paint')) {
        return 'Art Supplies';
    } else if (name.includes('calculator') || name.includes('scientific')) {
        return 'Electronics';
    } else if (name.includes('pencil') || name.includes('pen') || name.includes('marker')) {
        return 'Writing Tools';
    }
    return 'School Supplies';
}

// Function to create a product card
function createProductCard(product, index, usePlaceholder = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Add click event to redirect to offer link
    card.addEventListener('click', () => {
        window.location.href = product['Offer Link'];
    });

    // Remove ₱ symbol and any spaces from price
    const priceValue = product.Price.replace('₱', '').trim();

    // Determine image file name based on tab
    const imageFileName = usePlaceholder ? `suki${index + 1}.jpeg` : `${(index % 10) + 1}.jpeg`;

    // Truncate the item name
    const truncatedName = truncateText(product['Item Name']);

    const category = getProductCategory(product['Item Name']);
    
    card.innerHTML = `
        <div class="discount-badge">${product.Discount.replace('-', '')} OFF</div>
        <div class="category-tag">${category}</div>
        <img src="../assets/${imageFileName}" alt="${truncatedName}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${truncatedName}</h3>
            <div class="price-container">
                <span class="price">₱${priceValue}</span>
                <span class="arrow">➜</span>
            </div>
        </div>
    `;

    return card;
}

// Function to load products from CSV
async function loadProducts(csvFile, usePlaceholder = false) {
    try {
        const response = await fetch(csvFile);
        if (!response.ok) {
            throw new Error('Failed to fetch CSV data');
        }
        const data = await response.text();
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        
        return rows.slice(1)
            .filter(row => row.trim())
            .map((row, index) => {
                const values = row.split(',');
                const product = {};
                headers.forEach((header, i) => {
                    product[header.trim()] = values[i]?.trim() || '';
                });
                return product;
            });
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

// Load products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const productsGrid = document.getElementById('products-grid');
    const pageTitle = document.getElementById('page-title');
    const tabs = document.querySelectorAll('.tab-btn');
    let currentTab = 'all';
    let loadingSpinner = null;

    async function displayProducts(tab) {
        // Show loading state
        productsGrid.innerHTML = '<div class="loading-spinner">Loading Student Deals</div>';
        loadingSpinner = productsGrid.querySelector('.loading-spinner');

        // Update UI
        tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        pageTitle.innerHTML = tab === 'all' ? 'Current Deals! Discounted Price' : '<span style="color: #F6E408; text-shadow: 2px 2px 0 #FF0000; font-size: 1.8rem; font-weight: 800;">SUKI!</span> This week\'s bestsellers';

        // Load appropriate CSV file
        const csvFile = tab === 'all' ? '../data/sampleshopee.csv' : '../data/suki.csv';
        const products = await loadProducts(csvFile, tab === 'suki');

        // Clear loading spinner
        if (loadingSpinner) {
            loadingSpinner.remove();
        }

        // Clear and populate grid
        productsGrid.innerHTML = '';
        products.forEach((product, index) => {
            const card = createProductCard(product, index, tab === 'suki');
            productsGrid.appendChild(card);
        });
    }

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const newTab = tab.dataset.tab;
            if (newTab !== currentTab) {
                currentTab = newTab;
                displayProducts(currentTab);
            }
        });
    });

    // Initial load
    await displayProducts('all');
});


