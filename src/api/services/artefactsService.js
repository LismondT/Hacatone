
const mockArtefacts = [
	{
		id: 1,
		name: 'Меч Вечного Пламени',
		description: 'Древний меч, лезвие которого пылает неугасимым огнем',
		rare: {
			name: 'Легендарный',
			image: 'sword_of_eternal_flame.png',
			description: 'Артефакты невероятной мощи и редкости'
		},
		lore: 'Выкован древними магами в эпоху Войны Драконов',
	},
	{
		id: 2,
		name: 'Щит Непробиваемой Воли',
		description: 'Щит, способный отразить любую магическую атаку',
		rare: {
			name: 'Эпический',
			image: 'shield_of_unbreakable_will.png',
			description: 'Мощные артефакты с уникальными свойствами'
		},
		lore: 'Принадлежал первому королю Северных земель',
	},
	{
		id: 3,
		name: 'Амулет Лунного Света',
		description: 'Амулет, светящийся в темноте и дающий ночное зрение',
		rare: {
			name: 'Редкий',
			image: 'amulet_of_moonlight.png',
			description: 'Ценные артефакты с особыми способностями'
		},
		lore: 'Создан эльфами Лунного леса много веков назад',
	},
	{
		id: 4,
		name: 'Посох Грозового Шёпота',
		description: 'Посох, способный призывать молнии и управлять погодой',
		rare: {
			name: 'Легендарный',
			image: 'staff_of_storm_whisper.png',
			description: 'Артефакты невероятной мощи и редкости'
		},
		lore: 'Когда-то принадлежал архимагу Академии Стихий',
	},
	{
		id: 5,
		name: 'Кольцо Забытого Времени',
		description: 'Кольцо, замедляющее время вокруг владельца',
		rare: {
			name: 'Мифический',
			image: 'ring_of_forgotten_time.png',
			description: 'Легендарные артефакты, существование которых ставится под сомнение'
		},
		lore: 'Создано древней цивилизацией, владевшей временной магией',
	},
	{
		id: 6,
		name: 'Плащ Теневого Охотника',
		description: 'Плащ, делающий владельца невидимым в тени',
		rare: {
			name: 'Эпический',
			image: 'cloak_of_shadow_hunter.png',
			description: 'Мощные артефакты с уникальными свойствами'
		},
		lore: 'Использовался гильдией убийц Тёмного Братства',
	},
	{
		id: 7,
		name: 'Сапоги Странника Пустоты',
		description: 'Сапоги, позволяющие телепортироваться на короткие расстояния',
		rare: {
			name: 'Редкий',
			image: 'boots_of_void_walker.png',
			description: 'Ценные артефакты с особыми способностями'
		},
		lore: 'Созданы загадочными магами из измерения Пустоты',
	},
	{
		id: 8,
		name: 'Перчатки Каменной Кожи',
		description: 'Перчатки, превращающие кожу в камень при ударе',
		rare: {
			name: 'Необычный',
			image: 'gloves_of_stone_skin.png',
			description: 'Артефакты с полезными, но ограниченными свойствами'
		},
		lore: 'Выкованы гномами Глубинных гор',
	},
	{
		id: 9,
		name: 'Лук Лесного Стража',
		description: 'Лук, стрелы которого никогда не промахиваются',
		rare: {
			name: 'Эпический',
			image: 'bow_of_forest_guardian.png',
			description: 'Мощные артефакты с уникальными свойствами'
		},
		lore: 'Принадлежал первому стражу Великого Леса',
	},
	{
		id: 10,
		name: 'Свиток Древнего Знания',
		description: 'Свиток, содержащий заклинания забытых эпох',
		rare: {
			name: 'Легендарный',
			image: 'scroll_of_ancient_knowledge.png',
			description: 'Артефакты невероятной мощи и редкости'
		},
		lore: 'Написан самим основателем Магического ордена',
	}
];

const mockArtefactsService = {
  getArtefacts: async () => {
    return mockArtefacts;
  },

  getArtefactById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const artefact = mockArtefacts.find(a => a.id === parseInt(id));
    if (!artefact) {
      throw new Error('Артефакт не найден');
    }
    
    return artefact;
  },

  getArtefactsByRarity: async (rare_name) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const rarityArtefacts = mockArtefacts.filter(artefact => 
      artefact.rare.name === rare_name
    );
    
    return {
      artefacts: rarityArtefacts,
      total: rarityArtefacts.length,
      rare_name
    };
  },

  createArtefact: async (artefactData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newArtefact = {
      id: Math.max(...mockArtefacts.map(a => a.id)) + 1,
      ...artefactData
    };
    
    console.log('Создан новый артефакт:', newArtefact);
    
    return newArtefact;
  },

  updateArtefact: async (id, artefactData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const artefactIndex = mockArtefacts.findIndex(a => a.id === parseInt(id));
    if (artefactIndex === -1) {
      throw new Error('Артефакт не найден');
    }
    
    const updatedArtefact = {
      ...mockArtefacts[artefactIndex],
      ...artefactData
    };
    
    console.log('Обновлен артефакт:', updatedArtefact);
    
    return updatedArtefact;
  },

  deleteArtefact: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const artefactIndex = mockArtefacts.findIndex(a => a.id === parseInt(id));
    if (artefactIndex === -1) {
      throw new Error('Артефакт не найден');
    }
    
    console.log('Удален артефакт с ID:', id);
    
    return { success: true, message: 'Артефакт успешно удален' };
  }
};

export const artefactsService = mockArtefactsService;