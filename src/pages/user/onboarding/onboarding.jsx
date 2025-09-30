import "./onboarding.css";

export default function OnboardingPage() {
  return (
    <div className="onboarding-guide">
      <h1 className="guide-title">🚀 Онбординг: твоя карта галактики</h1>
      <p className="guide-subtitle">
        Ознакомься с разделами платформы и начни своё путешествие
      </p>

      <div className="guide-grid">
        {/* Профиль */}
        <div className="guide-card">
          <h2>👤 Профиль</h2>
          <ul>
            <li>Ранг и уровень развития</li>
            <li>Опыт (XP) и энергия ⚡</li>
            <li>Навыки и компетенции</li>
            <li>Бортовой журнал и рейтинги</li>
          </ul>
          <button className="guide-btn">Перейти в Профиль</button>
        </div>

        {/* Магазин */}
        <div className="guide-card">
          <h2>🛒 Магазин</h2>
          <ul>
            <li>Обмен энергии ⚡ на мерч</li>
            <li>Футболки, кружки, рюкзаки</li>
            <li>Редкие артефакты</li>
            <li>Обновляемый ассортимент</li>
          </ul>
          <button className="guide-btn">Перейти в Магазин</button>
        </div>

        {/* Артефакты */}
        <div className="guide-card">
          <h2>🎖️ Артефакты</h2>
          <ul>
            <li>Уникальные космические реликвии</li>
            <li>Описание, редкость, изображение</li>
            <li>Коллекция в инвентаре</li>
            <li>Создание новых HR</li>
          </ul>
          <button className="guide-btn">Перейти в Артефакты</button>
        </div>

        {/* Миссии */}
        <div className="guide-card">
          <h2>🚀 Миссии</h2>
          <ul>
            <li>Задания разных категорий</li>
            <li>Награды: XP, энергия, артефакты</li>
            <li>Прокачка компетенций</li>
            <li>Ветки развития</li>
          </ul>
          <button className="guide-btn">Перейти в Миссии</button>
        </div>
      </div>
    </div>
  );
}
