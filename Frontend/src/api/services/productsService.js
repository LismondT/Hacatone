

const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    description: 'Новый iPhone 15 Pro с титановым корпусом и мощным процессором A17 Pro',
    price: 99990,
    max_count_buy: 2,
    rank_id: 5,
    category: 'smartphones',
    in_stock: true,
    discount: 0
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    description: 'Ультратонкий ноутбук с чипом Apple M2 и дисплеем Liquid Retina',
    price: 129990,
    max_count_buy: 1,
    rank_id: 5,
    category: 'laptops',
    in_stock: true,
    discount: 5000
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    description: 'Флагманский смартфон Samsung с искусственным интеллектом',
    price: 79990,
    max_count_buy: 3,
    rank_id: 4,
    category: 'smartphones',
    in_stock: true,
    discount: 0
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    description: 'Беспроводные наушники с шумоподавлением и премиальным звуком',
    price: 29990,
    max_count_buy: 5,
    rank_id: 4,
    category: 'headphones',
    in_stock: false,
    discount: 3000
  },
  {
    id: 5,
    name: 'iPad Air',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    description: 'Универсальный планшет с чипом M1 и поддержкой Apple Pencil',
    price: 59990,
    max_count_buy: 2,
    rank_id: 4,
    category: 'tablets',
    in_stock: true,
    discount: 0
  },
  {
    id: 6,
    name: 'Apple Watch Series 9',
    image: 'https://images.unsplash.com/photo-1579586337278-3f436c25d4a1?w=400',
    description: 'Умные часы с расширенными функциями здоровья и фитнеса',
    price: 39990,
    max_count_buy: 3,
    rank_id: 4,
    category: 'wearables',
    in_stock: true,
    discount: 2000
  },
  {
    id: 7,
    name: 'PlayStation 5',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    description: 'Игровая консоль нового поколения с 4K графикой',
    price: 49990,
    max_count_buy: 1,
    rank_id: 5,
    category: 'gaming',
    in_stock: false,
    discount: 0
  },
  {
    id: 8,
    name: 'Dyson V15 Detect',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    description: 'Мощный пылесос с лазерной подсветкой и системой фильтрации',
    price: 54990,
    max_count_buy: 2,
    rank_id: 3,
    category: 'home',
    in_stock: true,
    discount: 7000
  }
];

const mockProductsService = {
  getProducts: async () => {
    return mockProducts;
  },

  getProductById: async (id) => {    
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Товар не найден');
    }
    
    return product;
  },

  createProduct: async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProduct = {
      id: Math.max(...mockProducts.map(p => p.id)) + 1,
      ...productData
    };
    
		mockProducts.push(newProduct);

    // В реальности здесь был бы вызов API
    console.log('Создан новый товар:', newProduct);
    
    return newProduct;
  },

  updateProduct: async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const productIndex = mockProducts.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error('Товар не найден');
    }
    
    const updatedProduct = {
      ...mockProducts[productIndex],
      ...productData
    };
    
    console.log('Обновлен товар:', updatedProduct);
    
    return updatedProduct;
  },

  deleteProduct: async (id) => {
    
    const productIndex = mockProducts.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error('Товар не найден');
    }

    console.log('Удален товар с ID:', id);
    
    return { success: true, message: 'Товар успешно удален' };
  }
};

// class productsRepository{

//   async getProducts(){
//     return mockProducts;
//   };

//   async getProductById(id){    
//     const product = mockProducts.find(p => p.id === parseInt(id));
//     if (!product) {
//       throw new Error('Товар не найден');
//     }
    
//     return product;
//   };
// }

export const productService = mockProductsService;



