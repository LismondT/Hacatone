import "./shop.css";
import ShopCard from "../../../components/shopCard/ShopCard";
import { productService } from "../../../api/services/productsService";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsData = productService.getProducts()
    .then(data => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="shop-container">
    <div className="stars"></div>

      <div className="shop-content">
        {/* Заголовок */}
        <div className="shop-header">
          <h1>🛒 Магазин Alabuga</h1>
          <p>Обменивайте энергию ⚡ на уникальный мерч</p>
        </div>

        {/* Счётчик энергии */}
        <div className="energy-box">
          <p className="energy-label">Ваша энергия:</p>
          <p className="energy-value">80 ⚡</p>
        </div>

        {/* Список товаров */}
        <div className="shop-grid">
          {/* Карточка товара */}
          {products.map((item) =>(
            <ShopCard 
              id = {item.id}
              image = {item.image}
              name = {item.name}
              desc={item.description}
              price={item.price}
              count={item.max_count_buy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
