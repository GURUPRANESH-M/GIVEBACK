// Sample JavaScript for Marketplace Functionality

// DOM elements
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');
const productGrid = document.querySelector('.product-grid');
const loginForm = document.querySelector('#login form');
const signupForm = document.querySelector('#signup form');
const leaderboard = document.querySelector('.leaderboard ul');
const dashboard = {
    itemsSold: document.querySelector('.dashboard-item:nth-child(1) p:nth-child(2)'),
    totalRevenue: document.querySelector('.dashboard-item:nth-child(1) p:nth-child(3)'),
    totalPoints: document.querySelector('.dashboard-item:nth-child(2) p:nth-child(2)'),
    nextReduction: document.querySelector('.dashboard-item:nth-child(2) p:nth-child(3)')
};

// Sample product data (replace with actual data from backend)
const products = [
    { id: 1, name: "Rice Bags", category: "food", price: 50, dateAdded: "2023-10-12" },
    { id: 2, name: "Winter Jackets", category: "clothing", price: 120, dateAdded: "2023-09-05" },
    { id: 3, name: "Medical Gloves", category: "medical", price: 30, dateAdded: "2023-08-22" },
    { id: 4, name: "Laptops", category: "electronics", price: 700, dateAdded: "2023-09-15" }
];

// Sample dashboard data (replace with actual data from backend)
const userDashboard = {
    itemsSold: 150,
    totalRevenue: 3500,
    totalPoints: 1500,
    nextReductionPoints: 200
};

// Function to render products on the page
function renderProducts(productList) {
    productGrid.innerHTML = ''; // Clear previous products
    productList.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
        `;
        productGrid.appendChild(productItem);
    });
}

// Filter products based on category
function filterProducts() {
    const filterValue = filterSelect.value;
    const filteredProducts = filterValue === 'all' ? products : products.filter(product => product.category === filterValue);
    renderProducts(filteredProducts);
}

// Sort products based on price or date
function sortProducts() {
    const sortValue = sortSelect.value;
    let sortedProducts;
    
    if (sortValue === 'price-low') {
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high') {
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (sortValue === 'recent') {
        sortedProducts = [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    renderProducts(sortedProducts);
}

// Event listeners for filter and sort
filterSelect.addEventListener('change', filterProducts);
sortSelect.addEventListener('change', sortProducts);

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    // Add actual authentication logic here
    alert(`Logged in as: ${email}`);
});

// Handle signup form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const companyName = signupForm['company-name'].value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    // Add actual signup logic here
    alert(`Account created for: ${companyName}`);
});

// Function to load leaderboard (dynamically fetch or display)
function loadLeaderboard() {
    // Dummy leaderboard data (replace with backend fetch logic)
    const leaderboardData = [
        { company: 'Company A', points: 1500 },
        { company: 'Company B', points: 1200 },
        { company: 'Company C', points: 800 }
    ];

    leaderboard.innerHTML = '';
    leaderboardData.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.company}: ${entry.points} points`;
        leaderboard.appendChild(listItem);
    });
}

// Function to update the company dashboard
function updateDashboard() {
    dashboard.itemsSold.textContent = `Items Sold: ${userDashboard.itemsSold}`;
    dashboard.totalRevenue.textContent = `Total Revenue: $${userDashboard.totalRevenue}`;
    dashboard.totalPoints.textContent = `Total Points: ${userDashboard.totalPoints}`;
    dashboard.nextReduction.textContent = `Next Tax Reduction: ${userDashboard.nextReductionPoints} points away`;
}

// Initialize page with default product list and leaderboard
renderProducts(products); // Initial product render
loadLeaderboard(); // Initial leaderboard load
updateDashboard(); // Update dashboard with user data
