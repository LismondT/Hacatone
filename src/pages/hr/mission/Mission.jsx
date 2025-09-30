import { useState } from "react";
import Select from "../../../components/selectList/Select";
import TextInput from "../../../components/textInput/TextInput";
import "./Mission.css";

export default function MissionsPage() {
  const [missions, setMissions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    exp: "",
    mana: "",
    rank: "",
    branch: "",
    skills: "",
    artifact: "",
  });

  // Опции для рангов
  const rankOptions = [
    { value: "junior", label: "Junior HR", icon: "👶", description: "Начинающий специалист" },
    { value: "middle", label: "Middle HR", icon: "💼", description: "Опытный специалист" },
    { value: "senior", label: "Senior HR", icon: "🎯", description: "Старший специалист" },
    { value: "lead", label: "Lead HR", icon: "👑", description: "Руководитель отдела" },
    { value: "director", label: "HR Director", icon: "🚀", description: "Директор по персоналу" }
  ];

  // Опции для веток развития
  const branchOptions = [
    { value: "recruitment", label: "Рекрутинг", icon: "🔍", description: "Поиск и найм" },
    { value: "learning", label: "Обучение", icon: "📚", description: "Развитие сотрудников" },
    { value: "culture", label: "Корпоративная культура", icon: "🌟", description: "HR бренд и ценности" },
    { value: "analytics", label: "HR Analytics", icon: "📊", description: "Аналитика и метрики" },
    { value: "compensation", label: "Comp & Ben", icon: "💰", description: "Компенсации и льготы" }
  ];

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const addMission = () => {
    if (!form.name || !form.description) return;
    
    setMissions([...missions, { ...form, id: Date.now() }]);
    setForm({
      name: "",
      description: "",
      exp: "",
      mana: "",
      rank: "",
      branch: "",
      skills: "",
      artifact: "",
    });
  };

  return (
    <div className="mission-hr-container">
      <div className="mission-hr-content">
        <div className="mission-hr-header">
          <h1>🎯 Управление миссиями</h1>
          <p>Создавайте и назначайте HR-миссии</p>
        </div>

        <div className="energy-box" style={{ flexDirection: "column", gap: "16px" }}>
          <TextInput
            label="Название миссии"
            placeholder="Введите название миссии..."
            value={form.name}
            onChange={(value) => handleChange("name", value)}
            required={true}
            icon="🎯"
          />

          <TextInput
            label="Описание"
            placeholder="Опишите миссию..."
            value={form.description}
            onChange={(value) => handleChange("description", value)}
            required={true}
            icon="📝"
          />

          <div style={{ gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Select
              label="Требуемый ранг"
              value={form.rank}
              onChange={(value) => handleChange("rank", value)}
              options={rankOptions}
              placeholder="Выберите ранг..."
              icon="📊"
              searchable={true}
            />

            <Select
              label="Ветка развития"
              value={form.branch}
              onChange={(value) => handleChange("branch", value)}
              options={branchOptions}
              placeholder="Выберите ветку..."
              icon="🌿"
              searchable={true}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <TextInput
              label="Опыт"
              placeholder="100"
              value={form.exp}
              onChange={(value) => handleChange("exp", value)}
              icon="⭐"
              type="number"
            />

            <TextInput
              label="Мана"
              placeholder="50"
              value={form.mana}
              onChange={(value) => handleChange("mana", value)}
              icon="⚡"
              type="number"
            />
          </div>

          <TextInput
            label="Компетенции"
            placeholder="коммуникация +5, рекрутинг +3..."
            value={form.skills}
            onChange={(value) => handleChange("skills", value)}
            icon="🎓"
          />

          <TextInput
            label="Артефакт"
            placeholder="Особая награда..."
            value={form.artifact}
            onChange={(value) => handleChange("artifact", value)}
            icon="🎁"
          />

          <button className="buy-btn" onClick={addMission}>
            Добавить миссию
          </button>
        </div>

        {/* Список миссий */}
        <div className="mission-hr-grid">
          {missions.map((mission, index) => (
            <div key={index} className="mission-hr-card">
              <h3>{mission.name}</h3>
              <p className="item-desc">{mission.description}</p>
              
              <div className="mission-hr-meta">
                {mission.rank && (
                  <p>📊 Ранг: {rankOptions.find(r => r.value === mission.rank)?.label}</p>
                )}
                {mission.branch && (
                  <p>🌿 Ветка: {branchOptions.find(b => b.value === mission.branch)?.label}</p>
                )}
              </div>
              
              <p className="item-price">Опыт: {mission.exp} ⭐ | Мана: {mission.mana} ⚡</p>
              <p className="item-desc">Компетенции: {mission.skills}</p>
              {mission.artifact && <p className="item-desc">🎁 Артефакт: {mission.artifact}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}