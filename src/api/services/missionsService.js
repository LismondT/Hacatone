
const mockMissions = [
	{
		id: "1",
		title: "Загрузка резюме",
		description: "Загрузите своё резюме для начала работы с Alabuga на сайт",
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
		isOnline: true
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

  // getArtefactsByRarity: async (rare_name) => {
  //   await new Promise(resolve => setTimeout(resolve, 400));
    
  //   const rarityArtefacts = mockMissions.filter(mission => 
  //     mission.rare.name === rare_name
  //   );
    
  //   return {
  //     artefacts: rarityArtefacts,
  //     total: rarityArtefacts.length,
  //     rare_name
  //   };
  // },

	createMission: async (missionData) => {
		await new Promise(resolve => setTimeout(resolve, 800));
		
		const nextId = (Math.max(0, ...mockMissions.map(a => Number(a.id))) + 1).toString();
		const newMission = {
			id: nextId,
			...missionData
		};
		
		mockMissions.push(newMission);
		console.log('Создана новая миссия:', newMission);
		
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