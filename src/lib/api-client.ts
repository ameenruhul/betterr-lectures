interface LoginDto {
  username: string;
  password: string;
}

interface RegisterDto {
  name: string;
  email: string;
  username: string;
  password: string;
}

const API_BASE_URL = 'http://127.0.0.1:8080';

export const authApi = {
  login: async (credentials: LoginDto) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    if (!data.data?.accessToken) {
      throw new Error('No access token received from server');
    }
    return { token: data.data.accessToken };
  },

  register: async (userData: RegisterDto) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },
};