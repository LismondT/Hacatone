import { CURRENT_MODE, API_MODE, API_BASE_URL, AUTH_TOKEN_KEY } from "../config";

// Реальный сервис для работы с бэкендом
const realUserService = {
  getUsers: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  },

  getUserById: async (id) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('User not found');
    }

    return await response.json();
  },

  // Получение профиля текущего пользователя
  getCurrentUser: async () => {
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
      throw new Error('Failed to get user profile');
    }

    return await response.json();
  },

  updateProfile: async (userData) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  }
};

// Моковый сервис
const mockUsers = [
  {
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
  }
];

const mockUserService = {
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers;
  },

  getUserById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Пользователь не найден');
    return user;
  },

  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : mockUsers[0];
  },

  updateProfile: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log('Updated user data:', userData);
    return { ...mockUsers[0], ...userData };
  }
};

export const userService = CURRENT_MODE === API_MODE.MOCK 
  ? mockUserService 
  : realUserService;