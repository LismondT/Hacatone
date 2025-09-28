import "./shop.css";

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
          <div className="shop-card">
            <div className="item-img">IMG</div>
            <h3>Футболка Alabuga</h3>
            <p className="item-desc">Официальный мерч с логотипом</p>
            <p className="item-price">50 ⚡</p>
            <button className="buy-btn">Купить</button>
          </div>

          <div className="shop-card">
            <div className="item-img">IMG</div>
            <h3>Кепка Alabuga</h3>
            <p className="item-desc">Стильная бейсболка</p>
            <p className="item-price">30 ⚡</p>
            <button className="buy-btn">Купить</button>
          </div>

          <div className="shop-card">
            <div className="item-img">IMG</div>
            <h3>Термокружка Alabuga</h3>
            <p className="item-desc">Для космических путешествий 🚀</p>
            <p className="item-price">40 ⚡</p>
            <button className="buy-btn">Купить</button>
          </div>

          <div className="shop-card">
            <div className="item-img">IMG</div>
            <h3>Рюкзак Alabuga</h3>
            <p className="item-desc">Удобный и прочный</p>
            <p className="item-price">70 ⚡</p>
            <button className="buy-btn">Купить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
