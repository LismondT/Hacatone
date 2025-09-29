import './missionCard.css';

export default function MissionCard({
  id,
  title,
  desc,
  expirience,
  energy,
  hasArtefactReward,
  artefactName,
  skills
}){
  return(
    <div className="mission-card">
      <h2 className="mission-title">{title}</h2>
      <p className="mission-desc">{desc}</p>

      <div className="mission-info">
        <p className="mission-expirience">🎖️ Награда: +{expirience} XP</p>
        <p className="mission-energy">⚡ Энергия: +{energy}</p>
        <p className="mission-competetions">📈 Компетенции: 
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill} +{skill.skill_exp};
            </span>
          ))}
        </p>
      </div>

      {hasArtefactReward ? <div className="mission-bonus yellow">
        <span>🎁 Артефакт: {artefactName}</span>
      </div>
      : <div />}
      <button className="mission-btn">Перейти к выполнению</button>
    </div> 
  );
}