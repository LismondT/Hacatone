// Сервис для работы с авторизацией

import { CURRENT_MODE, API_MODE, AUTH_TOKEN_KEY, USER_DATA_KEY } from '../config';
import { userService } from './userService';

// Реальный сервис
const realAuthService = {
  login: async (userLogin, userPassword) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: userLogin, password: userPassword }),
    });

    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }

    const data = await response.json();
    
    // Сохраняем токен и данные пользователя
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    
    return data;
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
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

    const response = await fetch('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      return null;
    }

    return JSON.parse(localStorage.getItem(USER_DATA_KEY));
  }
};

// Моковый сервис
const mockAuthService = {
  login: async (userLogin, userPassword) => {
    await new Promise(resolve => setTimeout(resolve, 50));

    const user = await (await userService.getUsers()).find(
			u => u.name === userLogin && u.password === userPassword
		);

    if (!user) {
      throw new Error('Неверный логин или пароль');
    }

    const mockToken = `mock_token_${user.id}_${Date.now()}`;
    
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

    return {
      token: mockToken,
      user: user
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
  }
};

export const authService = CURRENT_MODE === API_MODE.MOCK 
  ? mockAuthService 
  : realAuthService;