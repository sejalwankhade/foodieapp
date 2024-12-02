let userData = {};

function toggleAuth(type) {
  const modal = document.getElementById('auth-modal');
  const title = document.getElementById('auth-title');
  const toggleText = document.getElementById('toggle-auth-text');

  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';

  if (type === 'signup') {
    title.innerText = 'Sign Up';
    toggleText.innerHTML = 'Already have an account? <a href="#" onclick="switchAuth(\'login\')">Login</a>';
  } else {
    title.innerText = 'Login';
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" onclick="switchAuth(\'signup\')">Sign Up</a>';
  }
}

function switchAuth(type) {
  toggleAuth(type);
}

function handleAuth(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Store the data
  userData = { username, email, password };
  localStorage.setItem('userData', JSON.stringify(userData));

  alert('Authentication successful!');
  toggleAuth();
  displayUserProfile();
}

function displayUserProfile() {
  if (localStorage.getItem('userData')) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    document.getElementById('user-name').innerText = userData.username;
    document.getElementById('user-email').innerText = userData.email;
  }
}

function logout() {
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}

function applyFilters() {
  // Filter the restaurant list based on cuisine and rating
  const cuisine = document.getElementById('cuisine-filter').value;
  const rating = document.getElementById('rating-filter').value;

  // For now, simulate the restaurant data
  const filteredRestaurants = [
    { name: 'Restaurant 1', cuisine: 'Indian', rating: 4 },
    { name: 'Restaurant 2', cuisine: 'Italian', rating: 3 },
    // More data...
  ];

  const filteredList = filteredRestaurants.filter(restaurant => {
    return (!cuisine || restaurant.cuisine === cuisine) && 
           (!rating || restaurant.rating >= rating);
  });

  // Render the filtered restaurants
  const restaurantList = document.querySelector('.restaurant-list');
  restaurantList.innerHTML = filteredList.map(item => `
    <div class="restaurant-card">
      <img src="assets/restaurant.jpg" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.cuisine} - ${item.rating} Stars</p>
    </div>
  `).join('');
}

