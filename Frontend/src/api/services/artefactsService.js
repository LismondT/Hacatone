
const mockArtefacts = [
	{
	id: 1,
	name: "Сердце Нейтронной Звезды",
	description: "Сфера невероятной плотности, излучающая тихое гудение и слабый свет. Нарушает законы гравитации вокруг себя.",
	image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
	rare: {
		name: "Легендарный",
		image: "legendary.png",
		description: "Артефакты невероятной мощи и редкости"
	},
	lore: "Образовался из ядра массивной звезды, которая не смогла стать черной дырой. Всего одна чайная ложка его вещества весила бы миллиарды тонн."
	},
	{
		id: 2,
		name: "Плащ Гелиосферы",
		description: "Мерцающий плащ, сотканный из частиц солнечного ветра. Создает невидимый щит, отражающий космическую радиацию.",
		image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Эпический",
			image: "epic.png",
			description: "Мощные и ценные артефакты"
		},
		lore: "Создан на границе гелиосферы, где солнечный ветер встречается с межзвездной средой. Эта область защищает всю нашу систему от галактических лучей."
	},
	{
		id: 3,
		name: "Осколок Пояса Койпера",
		description: "Ледяной осколок, который никогда не тает. Оставляет за собой след из искрящейся космической пыли.",
		image: "https://images.unsplash.com/photo-1515705576963-95cad62945b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Редкий",
			image: "rare.png",
			description: "Необычные артефакты, которые сложно найти"
		},
		lore: "Прибыл из региона за орбитой Нептуна, где обитают триллионы ледяных тел, оставшихся после формирования Солнечной системы, таких как Плутон."
	},
	{
		id: 4,
		name: "Зеркало Эха Реликтового Излучения",
		description: "Поверхность этого зеркала мерцает древним светом. Позволяет заглянуть в прошлое Вселенной.",
		image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Легендарный",
			image: "legendary.png",
			description: "Артефакты невероятной мощи и редкости"
		},
		lore: "В его отражении виден свет, оставшийся от Большого Взрыва. Это реликтовое излучение остыло за 13.8 миллиардов лет и сейчас пронизывает всю Вселенную."
	},
	{
		id: 5,
		name: "Ключ Титана",
		description: "Ключ, выточенный из органического камня. Позволяет открывать проходы в мирах с метановыми реками и льдами.",
		image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Эпический",
			image: "epic.png",
			description: "Мощные и ценные артефакты"
		},
		lore: "Создан по образу спутника Сатурна - Титана. Это единственное, кроме Земли, тело в Солнечной системе, где доказано существование жидкости на поверхности (озера из метана и этана)."
	},
	{
		id: 6,
		name: "Песочные Часы Галилея",
		description: "Миниатюрные песочные часы, внутри которых вместо песка движутся крошечные светящиеся спутники.",
		image: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Редкий",
			image: "rare.png",
			description: "Необычные артефакты, которые сложно найти"
		},
		lore: "Вдохновлены спутниками Юпитера — Ио, Европой, Ганимедом и Каллисто, которые в 1610 году первыми доказали, что не все celestial bodies вращаются вокруг Земли."
	},
	{
		id: 7,
		name: "Ядро Венеры",
		description: "Раскаленный кристалл, медленно вращающийся в подвеске. От него исходит сухое, обжигающее тепло.",
		image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Эпический",
			image: "epic.png",
			description: "Мощные и ценные артефакты"
		},
		lore: "Венера, 'сестра' Земли, вращается в обратную сторону, и ее сутки длятся дольше года. Ее ядро, в отличие от земного, не генерирует магнитное поле."
	},
	{
		id: 8,
		name: "Сфера Оорта",
		description: "Прозрачная сфера с миллиардами мерцающих пылинок внутри, расположенных на огромном расстоянии друг от друга.",
		image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
		rare: {
			name: "Легендарный",
			image: "legendary.png",
			description: "Артефакты невероятной мощи и редкости"
		},
		lore: "Гипотетическая область на краю Солнечной системы, источник долгопериодических комет. Простирается так далеко, что гравитация Солнца там слабее гравитации ближайших звезд."
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