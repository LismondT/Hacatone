// Сервис для работы с пользователями

import { API_MODE, CURRENT_MODE } from "../config";

// Данные для теста
const mockUsers = [
	{
		id: 0,
		email: 'example@gmail.com',
		password: 'password',
		first_name: 'first name',
		name: 'name',
		patronymic: '',
		birth_date: '',
		sex: '',
		country: '',
		region: '',
		place: '',
		photo: '',
		resume: '',
		energy: 0,
		expirience: 0,
		rank_id: 0,
		direction: '',
		role: ''
	},
	{
		id: 1,
		email: 'example@gmail.com',
		password: 'admin123',
		first_name: 'first name',
		name: 'admin',
		patronymic: '',
		birth_date: '',
		sex: '',
		country: '',
		region: '',
		place: '',
		photo: '',
		resume: '',
		energy: 0,
		expirience: 0,
		rank_id: 0,
		direction: '',
		role: ''
	}
];

// Сервис с запросами на rest api
const realUserService = {
	getUsers: async () => {
		return mockUsers;
	},

	getUserById: async (id) => {
		const user = mockUsers.find(u => u.id === id);
		if (!user) throw new Error('Пользователь не найден');
		return user;
	},
};

// Сервис для теста
const mockUserService = {
	getUsers: async () => {
		return mockUsers;
	},

	getUserById: async (id) => {
		const user = mockUsers.find(u => u.id === id);
		if (!user) throw new Error('Пользователь не найден');
		return user;
	},
};

export const userService = CURRENT_MODE === API_MODE.MOCK
	? mockUserService
	: realUserService;