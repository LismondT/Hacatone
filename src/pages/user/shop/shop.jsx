import "./shop.css";
import ShopCard from "../../../components/shopCard/ShopCard";

export default function ShopPage() {
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
          <ShopCard />
        </div>
      </div>
    </div>
  );
}
