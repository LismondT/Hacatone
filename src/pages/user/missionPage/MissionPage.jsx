import "./MissionPage.css";
import { missionsService } from "../../../api/services/missionsService";
import { branchService } from "../../../api/services/branchService";
import { useState, useEffect } from "react";
import MissionCard from "../../../components/missionCard/missionCard";

// import { useParams, Link } from "react-router-dom";

export default function MissionPage() {
    const [missions, setMissions] = useState([]);
    const [branch, setBranch] = useState([]);

  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const allMissions = await missionsService.getMissions();
      
      if (allMissions.length === 0) return;
      
      const branchId = allMissions[0].branchId;
      
      // Параллельная загрузка данных
      const [missionsData, branchData] = await Promise.all([
        missionsService.getMissionsByBranch(branchId),
        branchService.getBranchById(branchId)
      ]);
      
      setMissions(missionsData.missions);
      setBranch(branchData);
      
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  fetchData();
  }, []); 


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
          <h2>📖 Ветка: {branch.branchName}</h2>
          <ul>
            {missions.map((mission) => (
            <MissionCard
            id = {mission.id}
            title = {mission.title}
            desc = {mission.description}
            expirience = {mission.expirience}
            energy = {mission.energy}
            hasArtefactReward = {mission.hasArtefactReward}
            artefactName = {mission.artefactName}
            skills = {mission.skills}
            isOnline = {mission.isOnline}
            needRank = {mission.needRank}
            />
            ))}

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
