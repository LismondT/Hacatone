import "./cabinet.css";
import { useAuth } from "../../../components/context/AuthContext";
import { useState, useEffect } from "react";
import {userService} from "../../../api/services/userService";

export default function Cabinet() {
	const { user, refreshProfile } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('week');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      await refreshProfile();
      const data = await userService.getCurrentUser();
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Функции для расчета прогресса (можно вынести в утилиты)
  const calculateLevelProgress = (exp) => {
    const currentLevelExp = 2000; // Базовое значение для уровня
    const progress = Math.min((exp / currentLevelExp) * 100, 100);
    return {
      progress: Math.round(progress),
      current: exp,
      max: currentLevelExp
    };
  };

  const calculateEnergyProgress = (energy) => {
    const maxEnergy = 100;
    const progress = Math.min((energy / maxEnergy) * 100, 100);
    return {
      progress: Math.round(progress),
      current: energy,
      max: maxEnergy
    };
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="stars"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Загрузка данных космонавта...</p>
        </div>
      </div>
    );
  }
	
  const xpProgress = calculateLevelProgress(userData.exp);
  const energyProgress = calculateEnergyProgress(userData.energy);

  return (
    <div className="profile-page">
      {/* Космический фон */}
      <div className="stars"></div>

      <div className="profile-container">
        {/* Профиль */}
        <div className="profile-card fade-in-up">
          <div className="avatar-wrapper">
            <img src={userData.image} alt="Аватар" className="avatar" />
            <div className="status"></div>
          </div>
          <h2 className="username">{userData.firstName} {userData.lastName} {userData.surname}</h2>
          <p className="rank">Ранг: ⭐ {userData.rankName}</p>

          {/* Прогресс бары */}
          <div className="progress-section">
            <div className="progress-block">
              <p className="label">Опыт</p>
              <div className="progress-bar">
                <div className="progress-fill xp" style={{ width: `${xpProgress.progress}%` }}></div>
              </div>
              <p className="small">{xpProgress.current} / {xpProgress.max} XP</p>
            </div>

            <div className="progress-block">
              <p className="label">Энергия</p>
              <div className="progress-bar">
                <div className="progress-fill energy" style={{ width: `${energyProgress.progress}%` }}></div>
              </div>
              <p className="small">{energyProgress.current} / {energyProgress.max} ⚡</p>
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
