import './missionCard.css';
import { Link } from "react-router-dom";

function MissionCard({
  id,
  title,
  desc,
  expirience,
  energy,
  hasArtefactReward = false,
  artefactName,
  skills,
  isOnline = true,
  needRank,
	isHr = false
}) {
  return (
    <div className="mission-card">
      <h2 className="mission-title">{title}</h2>
      <p className="mission-desc">{desc}</p>

      <div className="mission-info">
        <p className="mission-expirience">🎖️ Награда: +{expirience} XP</p>
        <p className="mission-energy">⚡ Энергия: +{energy}</p>
        <p className="mission-competetions">
          📈 Компетенции:
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill.name} +{skill.skill_exp};
            </span>
          ))}
        </p>
        <p className="mission-rank">
          📊 Доступно с ранга: <span className="rank-badge">{needRank}</span>
        </p>
      </div>

      {/* статус сразу после ранга */}
      {isOnline ? (
        <div className="status mission-online">
          <span>💻 Онлайн</span>
        </div>
      ) : (
        <div className="status mission-offline">
          <span>💼 Оффлайн</span>
        </div>
      )}

      {hasArtefactReward && (
        <div className="mission-bonus yellow">
          <span>🎁 Артефакт: {artefactName}</span>
        </div>
      )}

			{!isHr && (
					<Link to={`/missionsList/${id}`} className="mission-link">
						<button className="mission-btn">Перейти к выполнению</button>
					</Link>
			)}
			{isHr && (
					<Link to={`/`} className="mission-link">
						<button className="mission-btn">Редактировать</button>
					</Link>
			)}

    </div>
  );
}

export default MissionCard;
