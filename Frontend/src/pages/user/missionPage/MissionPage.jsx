import "./MissionPage.css";
import { missionsService } from "../../../api/services/missionsService";
import { branchService } from "../../../api/services/branchService";
import { useState, useEffect } from "react";
import MissionCard from "../../../components/missionCard/missionCard";
import { useParams } from "react-router-dom";
import { API_BASE_URL} from "../../../api/config";

// import { useParams, Link } from "react-router-dom";

export default function MissionPage() {
    const missionId = useParams();
    const [missions, setMissions] = useState([]);
    const [branch, setBranch] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

  
  useEffect(() => {
  const fetchData = async () => {
    try {
      // Получаем все миссии
      const allMissions = await missionsService.getMissions();
      console.log('Все миссии:', allMissions);
      
      if (allMissions.length === 0) {
        console.log('Нет миссий');
        return;
      }
      
      const branchId = allMissions[0].branchId;
      console.log('Branch ID:', branchId);
      
      // Параллельная загрузка данных
      const [missionsData, branchData] = await Promise.all([
        missionsService.getMissionsByBranch(branchId),
        branchService.getBranchById(branchId)
      ]);
      
      console.log('Миссии по ветке:', missionsData);
      console.log('Данные ветки:', branchData);
      
      setMissions(missionsData.missions || missionsData);
      setBranch(branchData);
      
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Пожалуйста, выберите файл');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(`${missionId}`, '123'); // пример дополнительных данных

      const response = await fetch(`${API_BASE_URL}/sendMissionResult`, {
        method: 'POST',
        body: formData,
        // headers НЕ нужны для FormData - браузер установит автоматически
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке файла');
      }

      const result = await response.json();
      console.log('Файл успешно загружен:', result);
      alert('Файл успешно отправлен на проверку!');
      
      // Сброс формы
      setFile(null);
      e.target.reset();

    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке файла');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


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
          </ul>
        </div>

        {/* Панель выполнения миссии */}
        <div className="missionPage-detail">
          <h2>⚙️ Выполнение миссии</h2>
          <form onSubmit={handleSubmit}>
            <label>Загрузите файл:</label>
            <input type="file" 
              onChange={handleFileChange}
              disabled={loading}
            />
            <button type="submit" 
            className="missionPage-btn"
            disabled={loading || !file}
            >
              {loading ? 'Отправка...' : 'Отправить на проверку'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
