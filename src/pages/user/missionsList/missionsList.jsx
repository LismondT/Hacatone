import "./missionsList.css";
import { useState, useEffect } from "react";
import { missionsService } from "../../../api/services/missionsService";
import MissionCard from "../../../components/missionCard/missionCard";
import { authService } from "../../../api/services/authService";
import { useNavigate } from "react-router-dom";

export default function MissionsListPage() {
    const [missions, setMissions] = useState([]);
    const [isHr, setIsHr] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        missionsService.getMissions()
            .then(missionsData => {
                setMissions(missionsData);
            });
        authService.isHr()
					.then(data => {
						setIsHr(data);
					});
    }, []);

    const handleCreateMission = () => {
        navigate("/hr/create-mission");
    };

    return (
        <div className="missions-page">
            <div className="stars"></div>
            
            <div className="missions-container">
                {/* Заголовок */}
                <h1 className="missions-title">🚀 Список миссий</h1>
                
                {/* Кнопка добавления миссии (только для HR) */}
                {isHr && (
                    <button 
                        className="create-mission-btn"
                        onClick={handleCreateMission}
                    >
                        <span className="btn-icon">+</span>
                        Добавить миссию
                    </button>
                )}

                {/* Карточки миссий */}
                <div className="missions-grid">
                    {missions.map((mission) => (
                        <MissionCard
                            key={mission.id}
                            id={mission.id}
                            title={mission.title}
                            desc={mission.description}
                            expirience={mission.expirience}
                            energy={mission.energy}
                            hasArtefactReward={mission.hasArtefactReward}
                            artefactName={mission.artefactName}
                            skills={mission.skills}
                            isOnline={mission.isOnline}
                            needRank={mission.needRank}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}