import "./missionsList.css";
import { useState, useEffect } from "react";
import { missionsService } from "../../../api/services/missionsService";
import MissionCard from "../../../components/missionCard/missionCard";

export default function MissionsListPage() {
    const [missions, setMissions] = useState([]);
  
    useEffect(() => {
      missionsService.getMissions()
      .then(missionsData => {
          setMissions(missionsData);
        });
    }, []);


  return (
    <div className="missions-page">
      <div className="stars"></div>
      
      <div className="missions-container">
        {/* Заголовок */}
        <h1 className="missions-title">🚀 Список миссий</h1>

        {/* Карточки миссий */}
        <div className="missions-grid">
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
        </div>
      </div>
    </div>
  );
}
