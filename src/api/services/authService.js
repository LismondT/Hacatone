import { CURRENT_MODE, API_MODE, AUTH_TOKEN_KEY, USER_DATA_KEY, API_BASE_URL } from '../config';

// Реальный сервис для работы с бэкендом
const realAuthService = {
  login: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const data = await response.json();
      
      // Сохраняем токен
      localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
      
      // Получаем данные пользователя
      const userResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        return {
          token: data.accessToken,
          user: userData
        };
      }

      return {
        token: data.accessToken,
        user: null
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  logout: async () => {
    try {
      // Удаляем токен из бэкенда (если есть endpoint для logout)
      await fetch(`${API_BASE_URL}/auth/signout`, { 
        method: 'POST',
        credentials: 'include' // Важно для работы с cookies
      });
    } catch (error) {
      console.log('Logout API error:', error);
    }
    
    // Очищаем localStorage
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  checkAuth: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!token) {
      return null;
    }

    try {
      // Проверяем токен и получаем данные пользователя
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        return userData;
      } else {
        // Если токен невалидный, очищаем localStorage
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        return null;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  },

  // Новый метод для получения профиля
  getProfile: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    return await response.json();
  }
};

// Моковый сервис (оставляем для разработки)
const mockAuthService = {
  login: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = {
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      surname: "Иванович",
      email: "ivan@example.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      exp: 1500,
      energy: 85,
      rankName: "Специалист",
      phone: "+7 (999) 123-45-67",
      direction: "Frontend разработка"
    };

    const mockToken = `mock_token_${Date.now()}`;
    
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));

    return {
      token: mockToken,
      user: mockUser
    };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  checkAuth: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);
    
    if (!token || !userData) {
      return null;
    }

    return JSON.parse(userData);
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }
};

export const authService = CURRENT_MODE === API_MODE.MOCK 
  ? mockAuthService 
  : realAuthService;