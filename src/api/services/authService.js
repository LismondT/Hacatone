import { CURRENT_MODE, API_MODE, AUTH_TOKEN_KEY, USER_DATA_KEY, API_BASE_URL } from '../config';

const realAuthService = {
  login: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
        },
        credentials: 'include',
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
        },
        credentials: 'include',
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
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    return await response.json();
  },

	isHr: async () => {
	}
};

const mockUsers = [
	{
		id: 1,
		firstName: "Иван",
		lastName: "Иванов",
		surname: "Иванович",
		email: "user@example.com",
		password: "user",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
		exp: 1500,
		energy: 85,
		rankName: "Специалист",
		phone: "+7 (999) 123-45-67",
		direction: "Frontend разработка",
		isHr: false
	},
	{
		id: 2,
		firstName: "Петр",
		lastName: "Петров",
		surname: "Петрович",
		email: "admin@example.com",
		password: "admin",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
		exp: 0,
		energy: 0,
		rankName: "HR",
		phone: "+7 (999) 123-45-67",
		direction: "HR",
		isHr: true
	}
];

// Моковый сервис (оставляем для разработки)
const mockAuthService = {
  login: async (email, password) => {
		const user = mockUsers.find(u => u.email === email && u.password === password);

		if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const mockToken = `mock_token_${Date.now()}`;
    
		const { password: _, ...userWithoutPassword } = user;

    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userWithoutPassword));

    return {
      token: mockToken,
      user: userWithoutPassword
    };
  },

  logout: async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  checkAuth: async () => {    
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);
    
    if (!token || !userData) {
      return null;
    }

    return JSON.parse(userData);
  },

  getProfile: async () => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },

	isHr: async () => {
		const userData = localStorage.getItem(USER_DATA_KEY);
		return JSON.parse(userData).isHr;
	}
};

export const authService = CURRENT_MODE === API_MODE.MOCK 
  ? mockAuthService 
  : realAuthService;