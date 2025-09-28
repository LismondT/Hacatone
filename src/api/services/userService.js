// Сервис для работы с пользователями

const mockUsers = [];

const realUserService = {

};

const mockUserService = {
	getUsers: async () => {
		return mockUsers;
	},
	getUserById: async (id) => {
		const user = mockUsers.find(u => u.id === id);
		if (!user) throw new Error('Пользователь не найден');
		return user;
	}
};