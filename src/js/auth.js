// Authentication and user management utilities
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }
  
  init() {
    this.loadUserFromStorage();
  }
  
  // Load user from localStorage
  loadUserFromStorage() {
    const savedUser = localStorage.getItem('worqely-user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        return this.currentUser;
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('worqely-user');
        return null;
      }
    }
    return null;
  }
  
  // Save user to localStorage
  saveUserToStorage(user) {
    try {
      localStorage.setItem('worqely-user', JSON.stringify(user));
      this.currentUser = user;
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  }
  
  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Validate mobile number (Indian format)
  validateMobile(mobile) {
    const mobileRegex = /^[+]?[0-9]{10,13}$/;
    return mobileRegex.test(mobile.replace(/\s+/g, ''));
  }
  
  // Validate password strength
  validatePassword(password) {
    // At least 6 characters
    if (password.length < 6) {
      return {
        valid: false,
        message: 'Password must be at least 6 characters long'
      };
    }
    
    return {
      valid: true,
      message: 'Password is valid'
    };
  }
  
  // Validate Aadhaar number format
  validateAadhaar(aadhaar) {
    const aadhaarRegex = /^[0-9]{12}$/;
    const cleanAadhaar = aadhaar.replace(/\s+/g, '');
    return aadhaarRegex.test(cleanAadhaar);
  }
  
  // Simulate login API call
  async simulateLogin(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          fullName: this.getRandomName(),
          email: credentials.email,
          mobile: '+91 9876543210',
          type: credentials.userType,
          aadhaarNumber: '1234 5678 9012',
          profilePhoto: null,
          address: {
            street: '123 Main Street',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India',
            pincode: '110001'
          },
          dateOfBirth: '1990-01-01',
          signupMethod: 'self'
        };
        
        // Add user type specific fields
        if (credentials.userType === 'worker') {
          user.workCategory = 'electrical';
          user.experience = '5 years';
          user.shiftType = 'full-time';
          user.isPremium = false;
          user.totalEarnings = 25000;
          user.rating = 4.8;
          user.completedJobs = 23;
          user.availability = 'available';
          user.hourlyRate = 150;
          user.skills = ['Electrical Wiring', 'Appliance Repair', 'Circuit Installation'];
          user.isOnline = true;
        }
        
        resolve(user);
      }, 1000);
    });
  }
  
  // Simulate signup API call
  async simulateSignup(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate required fields
        if (!userData.fullName || !userData.email || !userData.mobile) {
          reject(new Error('Please fill in all required fields'));
          return;
        }
        
        if (!this.validateEmail(userData.email)) {
          reject(new Error('Please enter a valid email address'));
          return;
        }
        
        if (!this.validateMobile(userData.mobile)) {
          reject(new Error('Please enter a valid mobile number'));
          return;
        }
        
        const passwordValidation = this.validatePassword(userData.password);
        if (!passwordValidation.valid) {
          reject(new Error(passwordValidation.message));
          return;
        }
        
        // Create new user
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          fullName: userData.fullName,
          email: userData.email,
          mobile: userData.mobile,
          type: userData.userType,
          aadhaarNumber: userData.aadhaarNumber || '',
          profilePhoto: null,
          address: userData.address || {
            street: '',
            city: '',
            state: '',
            country: 'India',
            pincode: ''
          },
          dateOfBirth: userData.dateOfBirth || '',
          signupMethod: 'self'
        };
        
        // Add user type specific fields
        if (userData.userType === 'worker') {
          user.workCategory = userData.workCategory || '';
          user.experience = userData.experience || '';
          user.shiftType = userData.shiftType || 'full-time';
          user.isPremium = false;
          user.totalEarnings = 0;
          user.rating = 0;
          user.completedJobs = 0;
          user.availability = 'available';
          user.hourlyRate = userData.hourlyRate || 100;
          user.skills = userData.skills || [];
          user.isOnline = true;
        }
        
        resolve(user);
      }, 1000);
    });
  }
  
  // Get random name for demo purposes
  getRandomName() {
    const names = [
      'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sunita Devi',
      'Vikash Singh', 'Meera Gupta', 'Ravi Verma', 'Anita Yadav',
      'Suresh Chand', 'Kavita Jain', 'Ramesh Pal', 'Sita Ram',
      'Mukesh Agarwal', 'Geeta Kumari', 'Dinesh Rao', 'Mamta Soni'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  // Login user
  async login(credentials) {
    try {
      const user = await this.simulateLogin(credentials);
      this.saveUserToStorage(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  // Signup user
  async signup(userData) {
    try {
      const user = await this.simulateSignup(userData);
      this.saveUserToStorage(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  // Logout user
  logout() {
    this.currentUser = null;
    localStorage.removeItem('worqely-user');
    return true;
  }
  
  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }
  
  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }
  
  // Update user profile
  updateProfile(updates) {
    if (!this.currentUser) return false;
    
    this.currentUser = { ...this.currentUser, ...updates };
    this.saveUserToStorage(this.currentUser);
    return true;
  }
  
  // Change password
  async changePassword(currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const passwordValidation = this.validatePassword(newPassword);
        if (!passwordValidation.valid) {
          reject(new Error(passwordValidation.message));
          return;
        }
        
        // In a real app, you would verify the current password
        resolve(true);
      }, 500);
    });
  }
  
  // Reset password
  async resetPassword(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.validateEmail(email)) {
          reject(new Error('Please enter a valid email address'));
          return;
        }
        
        // Simulate sending reset email
        resolve(true);
      }, 1000);
    });
  }
  
  // Verify OTP
  async verifyOTP(mobile, otp) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate OTP verification
        if (otp === '123456') {
          resolve(true);
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 1000);
    });
  }
  
  // Send OTP
  async sendOTP(mobile) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.validateMobile(mobile)) {
          reject(new Error('Please enter a valid mobile number'));
          return;
        }
        
        // Simulate sending OTP
        console.log('OTP sent to:', mobile, '- OTP: 123456');
        resolve(true);
      }, 1000);
    });
  }
}

// Create global auth manager instance
const authManager = new AuthManager();

// Export for use in other scripts
window.authManager = authManager;