// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Implement filtering logic here
            const filterType = this.getAttribute('data-filter');
            filterProducts(filterType);
        });
    });

    // Price sorting functionality
    const priceDropdown = document.getElementById('price-dropdown');
    priceDropdown.addEventListener('change', function() {
        const sortType = this.value;
        sortProducts(sortType);
    });

    // Product filtering function
    function filterProducts(type) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            switch(type) {
                case 'favorite':
                    product.style.display = product.querySelector('.favorite-tag') ? 'block' : 'none';
                    break;
                case 'discount':
                    product.style.display = product.querySelector('.discount-tag') ? 'block' : 'none';
                    break;
                default:
                    product.style.display = 'block';
            }
        });
    }

    // Product sorting function
    function sortProducts(type) {
        const grid = document.querySelector('.product-grid');
        const products = Array.from(document.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('₫', '').replace(',', ''));
            const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('₫', '').replace(',', ''));
            
            return type === 'asc' ? priceA - priceB : priceB - priceA;
        });

        // Clear and repopulate grid
        grid.innerHTML = '';
        products.forEach(product => grid.appendChild(product));
    }

    // Infinite scroll or load more functionality
    let page = 1;
    const loadMoreButton = document.getElementById('load-more');
    
    loadMoreButton.addEventListener('click', function() {
        page++;
        fetchProducts(page);
    });

    // Fetch more products (simulated)
    function fetchProducts(page) {
        // In a real application, this would be an AJAX call to your backend
        console.log(`Fetching products for page ${page}`);
        // Simulate loading products
        // You would replace this with actual API call
        const mockProducts = [
            // Add mock product data here
        ];

        const grid = document.querySelector('.product-grid');
        mockProducts.forEach(product => {
            const productElement = createProductElement(product);
            grid.appendChild(productElement);
        });
    }

    // Create product element dynamically
    function createProductElement(productData) {
        // Implementation to create product card dynamically
        // This would construct a new .product-card element based on the data
    }
});