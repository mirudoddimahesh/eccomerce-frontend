const BASE_URL = "http://localhost:5000";

// Helper for fetch requests
async function fetchAPI(url, method='GET', data=null) {
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (data) options.body = JSON.stringify(data);
    const res = await fetch(url, options);
    return res.json();
}

// Get products with optional filters
async function getProducts(filters={}) {
    const params = new URLSearchParams(filters);
    const data = await fetchAPI(`${BASE_URL}/products?${params.toString()}`);
    return data;
}

// Add to cart
async function addToCart(userId, productId) {
    return fetchAPI(`${BASE_URL}/cart`, 'POST', { userId, productId, quantity:1 });
}

// Get cart items
async function getCart(userId) {
    return fetchAPI(`${BASE_URL}/cart/${userId}`);
}

// Remove cart item
async function removeCartItem(cartId) {
    return fetchAPI(`${BASE_URL}/cart/${cartId}`, 'DELETE');
}

// Login
async function loginUser(email, password) {
    return fetchAPI(`${BASE_URL}/auth/login`, 'POST', { email, password });
}

// Create account
async function createAccount(firstName, lastName, email, password) {
    return fetchAPI(`${BASE_URL}/auth/create-account`, 'POST', { firstName, lastName, email, password });
}

// Place order
async function placeOrder(userId, items, totalPrice) {
    return fetchAPI(`${BASE_URL}/orders`, 'POST', { userId, items, totalPrice });
}

// Get ordered items
async function getOrders(userId) {
    return fetchAPI(`${BASE_URL}/orders/${userId}`);
}
