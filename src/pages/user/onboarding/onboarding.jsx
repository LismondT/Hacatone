import "./onboarding.css";

export default function OnboardingPage() {
  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <h1>🚀 Добро пожаловать в Алабуга.Space</h1>
        <p>Пройди онбординг и узнай обо всех возможностях платформы</p>
      </div>

      <div className="onboarding-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "40%" }}></div>
        </div>
        <p>Шаг 2 из 5</p>
      </div>

      <div className="onboarding-grid">
        <div className="onboarding-card">
          <h2>👨‍🚀 Профиль</h2>
          <p>Здесь ты увидишь свой ранг, опыт, энергию и навыки.</p>
        </div>

        <div className="onboarding-card">
          <h2>🛰️ Миссии</h2>
          <p>Выполняй задания, получай опыт и открывай новые уровни.</p>
        </div>

        <div className="onboarding-card">
          <h2>🎖️ Артефакты</h2>
          <p>Коллекционируй уникальные награды за выполнение миссий.</p>
        </div>

        <div className="onboarding-card">
          <h2>🛒 Магазин</h2>
          <p>Обменивай энергию на фирменный мерч и бонусы.</p>
        </div>
      </div>

      <div className="onboarding-lore">
        <p>✨ Факт: На крыше офиса Алабуги стоит настоящий «Буран».</p>
      </div>

      <button className="onboarding-finish">Завершить онбординг</button>
    </div>
  );
}
