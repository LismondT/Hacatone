import "./cabinet.css";

export default function Cabinet() {
  return (
    <div className="profile-page">
      {/* Космический фон */}
      <div className="stars"></div>

      <div className="profile-container">
        {/* Профиль */}
        <div className="profile-card fade-in-up">
          <div className="avatar-wrapper">
            <img src="/avatar.png" alt="Аватар" className="avatar" />
            <div className="status"></div>
          </div>
          <h2 className="username">Иван Петров</h2>
          <p className="rank">Ранг: ⭐ Разведчик</p>

          {/* Прогресс бары */}
          <div className="progress-section">
            <div className="progress-block">
              <p className="label">Опыт</p>
              <div className="progress-bar">
                <div className="progress-fill xp" style={{ width: "60%" }}></div>
              </div>
              <p className="small">1200 / 2000 XP</p>
            </div>

            <div className="progress-block">
              <p className="label">Энергия</p>
              <div className="progress-bar">
                <div className="progress-fill energy" style={{ width: "80%" }}></div>
              </div>
              <p className="small">80 / 100 ⚡</p>
            </div>
          </div>
        </div>

        {/* Навыки */}
        <div className="skills-card fade-in-up">
          <h3 className="card-title">Навыки</h3>
          <div className="skills-grid">
            <div className="skill">
              <p>⚔️ Бой</p>
              <div className="skill-bar"><div className="fill red" style={{ width: "66%" }}></div></div>
            </div>
            <div className="skill">
              <p>🧭 Разведка</p>
              <div className="skill-bar"><div className="fill blue" style={{ width: "80%" }}></div></div>
            </div>
            <div className="skill">
              <p>🔧 Инженерия</p>
              <div className="skill-bar"><div className="fill yellow" style={{ width: "50%" }}></div></div>
            </div>
            <div className="skill">
              <p>🪐 Навигация</p>
              <div className="skill-bar"><div className="fill purple" style={{ width: "75%" }}></div></div>
            </div>
          </div>
        </div>

        {/* Бортовой журнал */}
        <div className="journal-card fade-in-up">
          <h3 className="card-title">📒 Бортовой журнал</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="dot indigo"></div>
              <p className="event">Завершена миссия «Исследовать астероид»</p>
              <p className="small">+300 XP, +1 артефакт</p>
            </div>
            <div className="timeline-item">
              <div className="dot green"></div>
              <p className="event">Получено достижение «Энергичный»</p>
              <p className="small">+50 энергии</p>
            </div>
            <div className="timeline-item">
              <div className="dot yellow"></div>
              <p className="event">Повышен ранг до «Разведчик»</p>
              <p className="small">Рейтинг +200</p>
            </div>
          </div>

          {/* ТОПы */}
          <div className="ratings">
            <h4>🏆 Рейтинги</h4>
            <div className="tabs">
              <button className="active">Неделя</button>
              <button>Месяц</button>
              <button>Год</button>
            </div>
            <ul className="rating-list">
              <li className="gold"><span>🥇 Анна Смирнова</span><span>3100</span></li>
              <li className="silver"><span>🥈 Иван Петров</span><span>2500</span></li>
              <li className="bronze"><span>🥉 Алексей Кузнецов</span><span>2200</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
