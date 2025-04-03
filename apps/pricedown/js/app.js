// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const productsGrid = document.getElementById('products-grid');

    // Show splash screen for 2 seconds then fade out
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    }, 2000);

    // Fetch and parse CSV data
    let productCounter = 0;
    fetch('/data/sampleshopee.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            
            // Skip header row and process each product
            rows.slice(1).forEach(row => {
                if (!row.trim()) return; // Skip empty rows
                productCounter++;
                
                const values = row.split(',');
                const product = {};
                headers.forEach((header, index) => {
                    product[header.trim()] = values[index]?.trim() || '';
                });
                
                // Create product card
                const card = createProductCard(product);
                productsGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading products:', error));
});

function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Add click event to redirect to offer link
    card.addEventListener('click', () => {
        window.location.href = product['Offer Link'];
    });

    // Remove ₱ symbol and any spaces from price
    const priceValue = product.Price.replace('₱', '').trim();

    // Use the counter to cycle through images 1-10
    const imageIndex = ((productCounter - 1) % 10) + 1;
    const imageFileName = `${imageIndex}.jpeg`;

    // Truncate the item name
    const truncatedName = truncateText(product['Item Name']);

    card.innerHTML = `
        <div class="discount-badge">-${product.Discount}</div>
        <img src="assets/${imageFileName}" alt="${truncatedName}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${truncatedName}</h3>
            <div class="price-container">
                <div class="price-info">
                    <span class="price">₱${priceValue}</span>
                    <span class="commission">Commission: ${product['Commission']}</span>
                </div>
                <span class="arrow">➜</span>
            </div>
        </div>
    `;

    return card;
}
