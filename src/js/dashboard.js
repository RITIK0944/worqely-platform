// Dashboard functionality and data management
class DashboardManager {
  constructor() {
    this.currentUser = null;
    this.mockData = this.generateMockData();
    this.init();
  }
  
  init() {
    this.loadUserData();
    this.setupDashboardListeners();
  }
  
  loadUserData() {
    const savedUser = localStorage.getItem('worqely-user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }
  
  setupDashboardListeners() {
    // Dashboard navigation items
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-item')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        if (page) {
          this.switchDashboardPage(page);
        }
      }
    });
  }
  
  switchDashboardPage(page) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    const activeItem = document.querySelector(`[data-page="${page}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
    
    // Here you would typically load different dashboard content
    // For now, we'll just log the page change
    console.log('Switched to dashboard page:', page);
    
    // Update dashboard content based on page
    this.updateDashboardContent(page);
  }
  
  updateDashboardContent(page) {
    const dashboardContent = document.querySelector('.dashboard-content');
    if (!dashboardContent) return;
    
    // Generate content based on page and user type
    let content = '';
    
    if (this.currentUser && this.currentUser.type === 'customer') {
      content = this.getCustomerPageContent(page);
    } else if (this.currentUser && this.currentUser.type === 'worker') {
      content = this.getWorkerPageContent(page);
    } else if (this.currentUser && this.currentUser.type === 'admin') {
      content = this.getAdminPageContent(page);
    }
    
    if (content) {
      dashboardContent.innerHTML = content;
    }
  }
  
  getCustomerPageContent(page) {
    switch (page) {
      case 'find-workers':
        return this.generateFindWorkersContent();
      case 'booking-history':
        return this.generateBookingHistoryContent();
      case 'payments':
        return this.generatePaymentsContent();
      case 'profile':
        return this.generateProfileContent();
      case 'support':
        return this.generateSupportContent();
      default:
        return this.generateCustomerDashboardContent();
    }
  }
  
  getWorkerPageContent(page) {
    switch (page) {
      case 'available-tasks':
        return this.generateAvailableTasksContent();
      case 'work-history':
        return this.generateWorkHistoryContent();
      case 'earnings':
        return this.generateEarningsContent();
      case 'profile':
        return this.generateWorkerProfileContent();
      case 'support':
        return this.generateSupportContent();
      default:
        return this.generateWorkerDashboardContent();
    }
  }
  
  getAdminPageContent(page) {
    switch (page) {
      case 'users':
        return this.generateUsersManagementContent();
      case 'workers':
        return this.generateWorkersManagementContent();
      case 'tasks':
        return this.generateTasksManagementContent();
      case 'analytics':
        return this.generateAnalyticsContent();
      case 'settings':
        return this.generateSettingsContent();
      default:
        return this.generateAdminDashboardContent();
    }
  }
  
  generateCustomerDashboardContent() {
    return `
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.customerStats.jobsCompleted}</div>
            <div class="stat-label" data-translate="jobsCompleted">Jobs Completed</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.customerStats.averageRating}</div>
            <div class="stat-label" data-translate="averageRating">Average Rating</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-value">₹${this.mockData.customerStats.totalSpent.toLocaleString()}</div>
            <div class="stat-label">Total Spent</div>
          </div>
        </div>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3 data-translate="findWorkers">Find Workers</h3>
          <p>Search for skilled workers in your area</p>
          <button class="btn btn-primary" data-translate="search">Search Now</button>
        </div>
        
        <div class="dashboard-card">
          <h3 data-translate="history">Recent Bookings</h3>
          <div class="booking-list">
            ${this.mockData.recentBookings.map(booking => `
              <div class="booking-item">
                <div class="booking-info">
                  <div class="booking-title">${booking.title}</div>
                  <div class="booking-date">${booking.date}</div>
                </div>
                <div class="booking-status ${booking.status}">${booking.status}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  generateWorkerDashboardContent() {
    return `
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-value">₹${this.mockData.workerStats.totalEarnings.toLocaleString()}</div>
            <div class="stat-label">Total Earnings</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.workerStats.jobsCompleted}</div>
            <div class="stat-label" data-translate="jobsCompleted">Jobs Completed</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.workerStats.rating}</div>
            <div class="stat-label" data-translate="averageRating">Average Rating</div>
          </div>
        </div>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>Available Tasks</h3>
          <div class="task-list">
            ${this.mockData.availableTasks.map(task => `
              <div class="task-item">
                <div class="task-info">
                  <div class="task-title">${task.title}</div>
                  <div class="task-location">📍 ${task.location}</div>
                  <div class="task-budget">💰 ₹${task.minBudget} - ₹${task.maxBudget}</div>
                </div>
                <button class="btn btn-primary btn-sm">Apply</button>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Recent Activity</h3>
          <div class="activity-list">
            ${this.mockData.recentActivity.map(activity => `
              <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-info">
                  <div class="activity-title">${activity.title}</div>
                  <div class="activity-date">${activity.date}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  generateAdminDashboardContent() {
    return `
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.adminStats.totalUsers.toLocaleString()}</div>
            <div class="stat-label">Total Users</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔧</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.adminStats.activeWorkers.toLocaleString()}</div>
            <div class="stat-label">Active Workers</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-info">
            <div class="stat-value">${this.mockData.adminStats.totalTasks.toLocaleString()}</div>
            <div class="stat-label">Total Tasks</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-value">₹${this.mockData.adminStats.totalRevenue.toLocaleString()}</div>
            <div class="stat-label">Total Revenue</div>
          </div>
        </div>
      </div>
      
      <div class="admin-sections">
        <div class="admin-card">
          <h3>Recent Users</h3>
          <div class="user-list">
            ${this.mockData.recentUsers.map(user => `
              <div class="user-item">
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                  <div class="user-name">${user.name}</div>
                  <div class="user-type">${user.type}</div>
                </div>
                <div class="user-status ${user.status}">${user.status}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="admin-card">
          <h3>Recent Tasks</h3>
          <div class="task-list">
            ${this.mockData.recentTasks.map(task => `
              <div class="task-item">
                <div class="task-info">
                  <div class="task-title">${task.title}</div>
                  <div class="task-customer">By: ${task.customer}</div>
                </div>
                <div class="task-status ${task.status.replace(' ', '-')}">${task.status}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  generateFindWorkersContent() {
    return `
      <div class="search-workers-section">
        <h2>Find Workers</h2>
        <div class="search-form">
          <div class="form-row">
            <div class="form-group">
              <label>Service Category</label>
              <select class="form-control">
                <option>Select Category</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Construction</option>
                <option>Painting</option>
                <option>Cleaning</option>
                <option>Cooking</option>
              </select>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" class="form-control" placeholder="Enter your location">
            </div>
            <div class="form-group">
              <label>Budget Range</label>
              <select class="form-control">
                <option>₹500 - ₹1,000</option>
                <option>₹1,000 - ₹2,000</option>
                <option>₹2,000 - ₹5,000</option>
                <option>₹5,000+</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary">Search Workers</button>
        </div>
        
        <div class="workers-grid">
          ${this.mockData.availableWorkers.map(worker => `
            <div class="worker-card">
              <div class="worker-avatar">${worker.avatar}</div>
              <div class="worker-info">
                <h4>${worker.name}</h4>
                <p>${worker.category}</p>
                <div class="worker-rating">⭐ ${worker.rating}</div>
                <div class="worker-rate">₹${worker.rate}/hour</div>
              </div>
              <button class="btn btn-primary btn-sm">Contact</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  generateMockData() {
    return {
      customerStats: {
        jobsCompleted: 5,
        averageRating: 4.8,
        totalSpent: 12500
      },
      workerStats: {
        totalEarnings: 25000,
        jobsCompleted: 23,
        rating: 4.9
      },
      adminStats: {
        totalUsers: 1250,
        activeWorkers: 850,
        totalTasks: 2150,
        totalRevenue: 525000
      },
      recentBookings: [
        { title: 'Electrical Repair', date: 'Yesterday', status: 'completed' },
        { title: 'Plumbing Work', date: '3 days ago', status: 'completed' },
        { title: 'House Cleaning', date: '1 week ago', status: 'completed' }
      ],
      availableTasks: [
        { title: 'Electrical Repair Needed', location: 'Sector 15, Gurgaon', minBudget: 800, maxBudget: 1200 },
        { title: 'Home Cleaning', location: 'DLF Phase 2', minBudget: 500, maxBudget: 800 },
        { title: 'Painting Work', location: 'Cyber City', minBudget: 2000, maxBudget: 3000 }
      ],
      recentActivity: [
        { icon: '✅', title: 'Job Completed', date: '2 hours ago' },
        { icon: '💰', title: 'Payment Received', date: '5 hours ago' },
        { icon: '📋', title: 'New Task Applied', date: '1 day ago' }
      ],
      recentUsers: [
        { avatar: '👤', name: 'Rajesh Kumar', type: 'Customer', status: 'active' },
        { avatar: '👤', name: 'Priya Sharma', type: 'Worker', status: 'active' },
        { avatar: '👤', name: 'Amit Patel', type: 'Customer', status: 'active' }
      ],
      recentTasks: [
        { title: 'Electrical Repair', customer: 'Amit Patel', status: 'completed' },
        { title: 'Home Cleaning', customer: 'Sunita Devi', status: 'in progress' },
        { title: 'Painting Work', customer: 'Vikash Singh', status: 'posted' }
      ],
      availableWorkers: [
        { avatar: '👨‍🔧', name: 'Rajesh Kumar', category: 'Electrician', rating: 4.8, rate: 150 },
        { avatar: '👨‍🔧', name: 'Suresh Pal', category: 'Plumber', rating: 4.6, rate: 120 },
        { avatar: '👩‍🎨', name: 'Priya Sharma', category: 'Painter', rating: 4.9, rate: 100 },
        { avatar: '👩‍🍳', name: 'Meera Gupta', category: 'Cook', rating: 4.7, rate: 80 }
      ]
    };
  }
  
  // Utility methods for dashboard functionality
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }
  
  formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }
  
  formatTime(date) {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
}

// Create global dashboard manager instance
const dashboardManager = new DashboardManager();

// Export for use in other scripts
window.dashboardManager = dashboardManager;