const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('gym_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('gym_token', response.token);
    return response;
  }

  async register(email: string, name: string, password: string) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('gym_token', response.token);
    return response;
  }

  async getExercises() {
    return this.request('/exercises');
  }

  async createExercise(exercise: any) {
    return this.request('/exercises', {
      method: 'POST',
      body: JSON.stringify(exercise),
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('gym_token');
  }
}

export const apiService = new ApiService();
