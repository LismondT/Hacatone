import "./missionsList.css";

export default function MissionsListPage() {
  return (
    <div className="missions-page">
      <div className="stars"></div>
      
      <div className="missions-container">
        {/* Заголовок */}
        <h1 className="missions-title">🚀 Список миссий</h1>

        {/* Карточки миссий */}
        <div className="missions-grid">
          <div className="mission-card">
            <h2 className="mission-title">📑 Сбор документов</h2>
            <p className="mission-desc">Необходимо собрать все требуемые документы для начала отбора.</p>

            <div className="mission-info">
              <p>🎖️ Награда: +200 XP</p>
              <p>🔮 Мана: +50</p>
              <p>⭐ Доступно с ранга: Новичок</p>
              <p>📈 Компетенции: Внимательность +10</p>
            </div>

            <div className="mission-bonus">
              <span>🎁 Артефакт: Печать допуска</span>
            </div>

            <button className="mission-btn">Перейти к выполнению</button>
          </div>

          <div className="mission-card">
            <h2 className="mission-title">📝 Заполнение резюме</h2>
            <p className="mission-desc">Создайте и загрузите резюме для участия в конкурсе.</p>

            <div className="mission-info">
              <p>🎖️ Награда: +300 XP</p>
              <p>🔮 Мана: +70</p>
              <p>⭐ Доступно с ранга: Новичок</p>
              <p>📈 Компетенции: Самопрезентация +15</p>
            </div>

            <button className="mission-btn">Перейти к выполнению</button>
          </div>

          <div className="mission-card">
            <h2 className="mission-title">💼 Прохождение бизнес-симуляций</h2>
            <p className="mission-desc">Примите участие в онлайн-бизнес-симуляции и продемонстрируйте свои навыки.</p>

            <div className="mission-info">
              <p>🎖️ Награда: +500 XP</p>
              <p>🔮 Мана: +120</p>
              <p>⭐ Доступно с ранга: Кандидат</p>
              <p>📈 Компетенции: Лидерство +20, Аналитика +15</p>
            </div>

            <div className="mission-bonus yellow">
              <span>🎁 Артефакт: Симулятор успеха</span>
            </div>

            <button className="mission-btn">Перейти к выполнению</button>
          </div>
        </div>
      </div>
    </div>
  );
}
