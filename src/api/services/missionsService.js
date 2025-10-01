const mockMissions = [
	{
	id: 1,
	title: "Пост с фото",
	description: "В ветке блогерства есть несколько заданий, первое из них заключается в посте с фото для рекламы Alabuga!",
	expirience: 50,
	energy: 20,
	hasArtefactReward: false,
	artefactName: "",
	skills: [
		{
		name: "Аналитика",
		skill_exp: 15
		},
		{
		name: "Вера в дело",
		skill_exp: 10
		},
	],
	needRank: "Разведчик",
	isOnline: true,
  branchId: 1
	},
  {
	id: 2,
	title: "Сторис с хэштегом",
	description: "Сделайте в соц-сетях сторис с хэштегом алабуги!",
	expirience: 50,
	energy: 20,
	hasArtefactReward: false,
	artefactName: "",
	skills: [
		{
		name: "Аналитика",
		skill_exp: 15
		},
		{
		name: "Вера в дело",
		skill_exp: 10
		},
	],
	needRank: "Разведчик",
	isOnline: true,
  branchId: 1
	},
  {
	id: 3,
	title: "Съёмка видеоблога про компанию",
	description: "Сделайте великолепный видеоблог про лучший университет России!",
	expirience: 50,
	energy: 20,
	hasArtefactReward: false,
	artefactName: "",
	skills: [
		{
		name: "Аналитика",
		skill_exp: 15
		},
		{
		name: "Вера в дело",
		skill_exp: 10
		},
	],
	needRank: "Разведчик",
	isOnline: true,
  branchId: 1
	},
	{
	id: 4,
	title: "Съёмка видеоблога про компанию",
	description: "Сделайте великолепный видеоблог про лучший университет России!",
	expirience: 50,
	energy: 20,
	hasArtefactReward: false,
	artefactName: "",
	skills: [
		{
		name: "Аналитика",
		skill_exp: 15
		},
		{
		name: "Вера в дело",
		skill_exp: 10
		},
	],
	needRank: "Разведчик",
	isOnline: true,
  branchId: 2	
	}
];

const mockMissionService = {
  getMissions: async () => {
    return mockMissions;
  },

	getMissionById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
		
		const mission = mockMissions.find(a => a.id === String(id));
    if (!mission) {
      throw new Error('Миссия не найдена');
    }
    
    return mission;
  },

  getMissionsByBranch: async (branchId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let branchMissions = mockMissions.filter(mission => mission.branchId === branchId);
    
    return {
      missions: branchMissions,
      total: branchMissions.length,
      branchId
    };
  },

  createMission: async (missionData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newMission = {
      id: Math.max(...mockMissions.map(a => a.id)) + 1,
      ...missionData
    };
    
    console.log('Создан новый артефакт:', newMission);
    
    return newMission;
  },

	updateMission: async (id, missionData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
		
		const missionIndex = mockMissions.findIndex(a => a.id === String(id));
    if (missionIndex === -1) {
      throw new Error('Миссия не найдена');
    }
    
    const updatedMission = {
      ...mockMissions[missionIndex],
      ...missionData
    };
    
    console.log('Обновлена миссия:', updatedMission);
    
    return updatedMission;
  },

	deleteMission: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
		
		const missionIndex = mockMissions.findIndex(a => a.id === String(id));
    if (missionIndex === -1) {
      throw new Error('Миссия не найдена');
    }
    
    console.log('Удалена миссия с ID:', id);
    
    return { success: true, message: 'Миссия успешно удалена' };
  }
};

export const missionsService = mockMissionService;