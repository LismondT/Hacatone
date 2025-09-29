import "./MissionPage.css";
// import { useParams, Link } from "react-router-dom";

export default function MissionPage() {
  return (
    <div className="mission-page">
      <div className="mission-container">
        {/* Заголовок */}
        <div className="mission-header">
          <h1>🚀 Список миссий</h1>
          <p>Выберите миссию и получите награды</p>
        </div>

        {/* Ветка миссий */}
        <div className="mission-branch">
          <h2>📖 Ветка: Рекрутинг</h2>
          <ul>
            <li className="mission-card">
              <h3>📑 Сбор документов</h3>
              <p>Необходимо собрать все требуемые документы для начала отбора.</p>
              <div className="mission-info">
                <span>🎖️ 200 XP</span>
                <span>🔮 50 маны</span>
                <span>⭐ Доступно: Новичок</span>
                <span>📈 Компетенции: Внимательность +10</span>
              </div>
              <button className="mission-btn">Выполнить</button>
            </li>

            <li className="mission-card">
              <h3>📝 Заполнение резюме</h3>
              <p>Создайте и загрузите резюме для участия в конкурсе.</p>
              <div className="mission-info">
                <span>🎖️ 300 XP</span>
                <span>🔮 70 маны</span>
                <span>⭐ Доступно: Новичок</span>
                <span>📈 Самопрезентация +15</span>
              </div>
              <button className="mission-btn">Выполнить</button>
            </li>

            <li className="mission-card">
              <h3>💼 Бизнес-симуляции</h3>
              <p>Примите участие в онлайн-бизнес-симуляции и продемонстрируйте навыки.</p>
              <div className="mission-info">
                <span>🎖️ 500 XP</span>
                <span>🔮 120 маны</span>
                <span>⭐ Доступно: Кандидат</span>
                <span>📈 Лидерство +20, Аналитика +15</span>
              </div>
              <div className="mission-reward">🎁 Артефакт: Симулятор успеха</div>
              <button className="mission-btn">Выполнить</button>
            </li>
          </ul>
        </div>

        {/* Панель выполнения миссии */}
        <div className="mission-detail">
          <h2>⚙️ Выполнение миссии</h2>
          <form>
            <label>Загрузите файл:</label>
            <input type="file" />
            <button type="submit" className="mission-btn">Отправить на проверку</button>
          </form>
        </div>
      </div>
    </div>
  );
}
