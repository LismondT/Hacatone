import "./artefact.css";

export default function ArtefactsPage() {
  return (
    <div className="inventory-page">
        {/* фон космический */}
        <div className="stars" />

      <div className="inventory-container">
        {/* Заголовок */}
        <div className="inventory-header">
          <h1 className="inventory-title">🎖️ Инвентарь артефактов</h1>
          <p className="inventory-subtitle">Уникальные награды за миссии</p>
        </div>

        {/* Список артефактов */}
        <div className="artifacts-grid">
          {/* Артефакт 1 */}
          <div className="artifact-card">
            <div className="artifact-image">IMG</div>
            <h3 className="artifact-title">Кристалл Звезды</h3>
            <p className="artifact-desc">Древний артефакт, усиливающий энергию.</p>
            <p className="artifact-rarity epic">Редкость: Эпический</p>
          </div>
        </div>
      </div>
    </div>
  );
}
