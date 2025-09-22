// Main application logic
class WorkelyApp {
  constructor() {
    this.currentPage = 'homepage';
    this.currentUser = null;
    this.isLoading = false;
    
    this.init();
  }
  
  init() {
    // Initialize language system
    initializeLanguage();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Hide loading screen after a short delay
    setTimeout(() => {
      this.hideLoading();
    }, 1000);
    
    // Show homepage initially
    this.showPage('homepage');
  }
  
  setupEventListeners() {
    // Language selector
    this.setupLanguageSelector();
    
    // Navigation buttons
    this.setupNavigationButtons();
    
    // Auth form handlers
    this.setupAuthForms();
    
    // Dashboard navigation
    this.setupDashboardNavigation();
    
    // Smooth scrolling for anchor links
    this.setupSmoothScrolling();
    
    // Handle back to home links
    this.setupBackToHomeLinks();
  }
  
  setupLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (languageBtn && languageDropdown) {
      // Toggle dropdown
      languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = languageDropdown.style.display === 'block';
        languageDropdown.style.display = isVisible ? 'none' : 'block';
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        languageDropdown.style.display = 'none';
      });
      
      // Handle language selection
      languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          const lang = e.target.getAttribute('data-lang');
          setLanguage(lang);
        });
      });
    }
  }
  
  setupNavigationButtons() {
    // Customer login button
    const customerLoginBtn = document.getElementById('customer-login-btn');
    if (customerLoginBtn) {
      customerLoginBtn.addEventListener('click', () => {
        this.showPage('customer-login');
      });
    }
    
    // Worker login button
    const workerLoginBtn = document.getElementById('worker-login-btn');
    if (workerLoginBtn) {
      workerLoginBtn.addEventListener('click', () => {
        this.showPage('worker-login');
      });
    }
    
    // Admin login button
    const adminLoginBtn = document.getElementById('admin-login-btn');
    if (adminLoginBtn) {
      adminLoginBtn.addEventListener('click', () => {
        this.showPage('admin-login');
      });
    }
    
    // Find workers buttons
    const findWorkersButtons = document.querySelectorAll('#find-workers-btn');
    findWorkersButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.showPage('customer-login');
      });
    });
    
    // Become worker buttons
    const becomeWorkerButtons = document.querySelectorAll('#become-worker-btn');
    becomeWorkerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.showPage('worker-login');
      });
    });
  }
  
  setupAuthForms() {
    // Customer login form
    const customerLoginForm = document.getElementById('customer-login-form');
    if (customerLoginForm) {
      customerLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin('customer');
      });
    }
    
    // Customer signup form
    const customerSignupForm = document.getElementById('customer-signup-form');
    if (customerSignupForm) {
      customerSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignup('customer');
      });
    }
    
    // Worker login form
    const workerLoginForm = document.getElementById('worker-login-form');
    if (workerLoginForm) {
      workerLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin('worker');
      });
    }
    
    // Worker signup form
    const workerSignupForm = document.getElementById('worker-signup-form');
    if (workerSignupForm) {
      workerSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignup('worker');
      });
    }
    
    // Admin login form
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin('admin');
      });
    }
    
    // Toggle between login and signup
    this.setupAuthToggleLinks();
  }
  
  setupAuthToggleLinks() {
    // Customer auth toggles
    const customerSignupLink = document.getElementById('customer-signup-link');
    if (customerSignupLink) {
      customerSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('customer-signup');
      });
    }
    
    const customerLoginLink = document.getElementById('customer-login-link');
    if (customerLoginLink) {
      customerLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('customer-login');
      });
    }
    
    // Worker auth toggles
    const workerSignupLink = document.getElementById('worker-signup-link');
    if (workerSignupLink) {
      workerSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('worker-signup');
      });
    }
    
    const workerLoginLink = document.getElementById('worker-login-link');
    if (workerLoginLink) {
      workerLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('worker-login');
      });
    }
  }
  
  setupBackToHomeLinks() {
    const backToHomeLinks = document.querySelectorAll('#back-to-home, #back-to-home-signup, #back-to-home-worker, #back-to-home-worker-signup, #back-to-home-admin');
    backToHomeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('homepage');
      });
    });
  }
  
  setupDashboardNavigation() {
    // Logout buttons
    const logoutButtons = document.querySelectorAll('#customer-logout, #worker-logout, #admin-logout');
    logoutButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleLogout();
      });
    });
    
    // Availability toggle for workers
    const availabilitySwitch = document.getElementById('availability-switch');
    if (availabilitySwitch) {
      availabilitySwitch.addEventListener('change', (e) => {
        this.handleAvailabilityToggle(e.target.checked);
      });
    }
  }
  
  setupSmoothScrolling() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }
    
    // Update current page
    this.currentPage = pageId;
    
    // Show/hide header and footer based on page
    this.updateHeaderFooterVisibility(pageId);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
  
  updateHeaderFooterVisibility(pageId) {
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    
    const isDashboard = pageId.includes('dashboard') || pageId === 'admin-panel';
    const isAuth = pageId.includes('login') || pageId.includes('signup');
    
    if (header) {
      header.style.display = (isDashboard || isAuth) ? 'none' : 'block';
    }
    
    if (footer) {
      footer.style.display = (isDashboard || isAuth) ? 'none' : 'block';
    }
  }
  
  showLoading() {
    this.isLoading = true;
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
    }
  }
  
  hideLoading() {
    this.isLoading = false;
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }
  
  handleLogin(userType) {
    this.showLoading();
    
    // Simulate login process
    setTimeout(() => {
      // Create mock user
      this.currentUser = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: userType === 'customer' ? 'John Doe' : userType === 'worker' ? 'Rajesh Kumar' : 'Admin User',
        email: `${userType}@example.com`,
        mobile: '+91 9876543210',
        type: userType,
        aadhaarNumber: '1234 5678 9012'
      };
      
      // Store user in localStorage
      localStorage.setItem('worqely-user', JSON.stringify(this.currentUser));
      
      // Navigate to appropriate dashboard
      if (userType === 'customer') {
        this.showPage('customer-dashboard');
        this.updateCustomerDashboard();
      } else if (userType === 'worker') {
        this.showPage('worker-dashboard');
        this.updateWorkerDashboard();
      } else if (userType === 'admin') {
        this.showPage('admin-panel');
      }
      
      this.hideLoading();
    }, 1500);
  }
  
  handleSignup(userType) {
    this.showLoading();
    
    // Simulate signup process
    setTimeout(() => {
      // Create mock user
      this.currentUser = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: userType === 'customer' ? 'New Customer' : 'New Worker',
        email: `new${userType}@example.com`,
        mobile: '+91 9876543210',
        type: userType,
        aadhaarNumber: '1234 5678 9012'
      };
      
      // Store user in localStorage
      localStorage.setItem('worqely-user', JSON.stringify(this.currentUser));
      
      // Navigate to appropriate dashboard
      if (userType === 'customer') {
        this.showPage('customer-dashboard');
        this.updateCustomerDashboard();
      } else if (userType === 'worker') {
        this.showPage('worker-dashboard');
        this.updateWorkerDashboard();
      }
      
      this.hideLoading();
    }, 1500);
  }
  
  handleLogout() {
    this.currentUser = null;
    localStorage.removeItem('worqely-user');
    this.showPage('homepage');
  }
  
  handleAvailabilityToggle(isAvailable) {
    const toggleText = document.querySelector('.toggle-text');
    if (toggleText) {
      toggleText.textContent = isAvailable ? 'Available' : 'Offline';
    }
    
    // Here you would typically send this to your backend
    console.log('Availability changed to:', isAvailable ? 'Available' : 'Offline');
  }
  
  updateCustomerDashboard() {
    const customerNameElement = document.getElementById('customer-name');
    if (customerNameElement && this.currentUser) {
      customerNameElement.textContent = this.currentUser.fullName;
    }
  }
  
  updateWorkerDashboard() {
    const workerNameElement = document.getElementById('worker-name');
    if (workerNameElement && this.currentUser) {
      workerNameElement.textContent = this.currentUser.fullName;
    }
  }
  
  // Check for existing user session on page load
  checkExistingSession() {
    const savedUser = localStorage.getItem('worqely-user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        
        // Navigate to appropriate dashboard
        if (this.currentUser.type === 'customer') {
          this.showPage('customer-dashboard');
          this.updateCustomerDashboard();
        } else if (this.currentUser.type === 'worker') {
          this.showPage('worker-dashboard');
          this.updateWorkerDashboard();
        } else if (this.currentUser.type === 'admin') {
          this.showPage('admin-panel');
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('worqely-user');
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new WorkelyApp();
  
  // Check for existing session
  app.checkExistingSession();
  
  // Make app globally available for debugging
  window.worqelyApp = app;
});