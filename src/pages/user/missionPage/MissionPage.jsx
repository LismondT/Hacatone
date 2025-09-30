import "./MissionPage.css";
// import { useParams, Link } from "react-router-dom";

export default function MissionPage() {
  return (
    <div className="missionPage-page">
      <div className="missionPage-container">
        {/* Заголовок */}
        <div className="missionPage-header">
          <h1>🚀 Список миссий</h1>
          <p>Выберите миссию и получите награды</p>
        </div>

        {/* Ветка миссий */}
        <div className="missionPage-branch">
          <h2>📖 Ветка: Рекрутинг</h2>
          <ul>
            <li className="missionPage-card">
              <h3>📑 Сбор документов</h3>
              <p>Необходимо собрать все требуемые документы для начала отбора.</p>
              <div className="missionPage-info">
                <span>🎖️ 200 XP</span>
                <span>🔮 50 маны</span>
                <span>⭐ Доступно: Новичок</span>
                <span>📈 Компетенции: Внимательность +10</span>
              </div>
              <button className="missionPage-btn">Выполнить</button>
            </li>

            <li className="missionPage-card">
              <h3>📝 Заполнение резюме</h3>
              <p>Создайте и загрузите резюме для участия в конкурсе.</p>
              <div className="missionPage-info">
                <span>🎖️ 300 XP</span>
                <span>🔮 70 маны</span>
                <span>⭐ Доступно: Новичок</span>
                <span>📈 Самопрезентация +15</span>
              </div>
              <button className="missionPage-btn">Выполнить</button>
            </li>

            <li className="missionPage-card">
              <h3>💼 Бизнес-симуляции</h3>
              <p>Примите участие в онлайн-бизнес-симуляции и продемонстрируйте навыки.</p>
              <div className="missionPage-info">
                <span>🎖️ 500 XP</span>
                <span>🔮 120 маны</span>
                <span>⭐ Доступно: Кандидат</span>
                <span>📈 Лидерство +20, Аналитика +15</span>
              </div>
              <div className="missionPage-reward">🎁 Артефакт: Симулятор успеха</div>
              <button className="missionPage-btn">Выполнить</button>
            </li>
          </ul>
        </div>

        {/* Панель выполнения миссии */}
        <div className="missionPage-detail">
          <h2>⚙️ Выполнение миссии</h2>
          <form>
            <label>Загрузите файл:</label>
            <input type="file" />
            <button type="submit" className="missionPage-btn">Отправить на проверку</button>
          </form>
        </div>
      </div>
    </div>
  );
}
