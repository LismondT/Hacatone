
const mockBranchs = [
	{
	id: 1,
  branchName: "Блогерская",
  branchMissions: [
    {
      missionId: 2
    },
    {
      missionId: 1
    },
    {
      missionId: 3
    }
  ]
	}
];

const mockBranchService = {
  getBranchs: async () => {
    return mockBranchs;
  },

  getBranchById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mission = mockBranchs.find(a => a.id === parseInt(id));
    if (!mission) {
      throw new Error('Ветка не найдена');
    }
    
    return mission;
  },

  getMissionsByBranch: async (branchId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const branch = mockBranchs.find(branch => branch.id === branchId);
  
  if (!branch) {
    return {
      missions: [],
      total: 0,
      branchId
    };
  }
  
  return {
    missions: branch.branchMissions,
    total: branch.branchMissions.length,
    branchId
  };
  },

  createBranch: async (branchData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newBranch = {
      id: Math.max(...mockBranchs.map(a => a.id)) + 1,
      ...branchData
    };
    
    console.log('Создан новый артефакт:', newBranch);
    
    return newBranch;
  },

  updateBranch: async (id, branchData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const branchIndex = mockBranchs.findIndex(a => a.id === parseInt(id));
    if (branchIndex === -1) {
      throw new Error('Миссия не найдена');
    }
    
    const updatedBranch = {
      ...mockBranchs[branchIndex],
      ...branchData
    };
    
    console.log('Обновлена миссия:', updatedBranch);
    
    return updatedBranch;
  },

  deleteBranch: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const branchIndex = mockBranchs.findIndex(a => a.id === parseInt(id));
    if (branchIndex === -1) {
      throw new Error('Ветка не найдена');
    }
    
    console.log('Удалена ветка с ID:', id);
    
    return { success: true, message: 'Ветка успешно удалена' };
  }
};

export const branchService = mockBranchService;