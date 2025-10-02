import { useEffect, useState } from "react";
import Select from "../../../components/selectList/Select";
import TextInput from "../../../components/textInput/TextInput";
import { missionsService } from "../../../api/services/missionsService";
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

  // загрузка существующих миссий из сервиса
  useEffect(() => {
    const loadMissions = async () => {
      try {
        const list = await missionsService.getMissions();
        const mapped = list.map((m) => ({
          id: m.id,
          name: m.title || m.name || "",
          description: m.description || "",
          exp: m.expirience ?? "",
          mana: m.energy ?? "",
          rank: m.needRank || "",
          branch: "",
          skills: Array.isArray(m.skills)
            ? m.skills.map(s => `${s.name}${s.skill_exp ? ` +${s.skill_exp}` : ""}`).join(", ")
            : (m.skills || ""),
          artifact: m.artefactName || "",
        }));
        setMissions(mapped);
      } catch (e) {
        // no-op для моков
      }
    };
    loadMissions();
  }, []);

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

  const parseSkillsString = (skillsStr) => {
    if (!skillsStr) return [];
    return skillsStr.split(",").map((token) => {
      const trimmed = token.trim();
      const match = trimmed.match(/^(.*?)(?:\s*\+\s*(\d+))?$/);
      const name = match && match[1] ? match[1].trim() : trimmed;
      const skill_exp = match && match[2] ? Number(match[2]) : undefined;
      return skill_exp != null ? { name, skill_exp } : { name };
    });
  };

  const addMission = async () => {
    if (!form.name || !form.description) return;

    const missionPayload = {
      title: form.name,
      description: form.description,
      expirience: Number(form.exp) || 0,
      energy: Number(form.mana) || 0,
      needRank: form.rank,
      hasArtefactReward: Boolean(form.artifact),
      artefactName: form.artifact || "",
      skills: parseSkillsString(form.skills),
      isOnline: true,
    };

    try {
      const created = await missionsService.createMission(missionPayload);
      const uiItem = {
        id: created.id,
        name: created.title,
        description: created.description,
        exp: created.expirience,
        mana: created.energy,
        rank: created.needRank,
        branch: form.branch,
        skills: form.skills,
        artifact: created.artefactName,
      };
      setMissions([...missions, uiItem]);
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
    } catch (e) {
      // no-op в мок-режиме
    }
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

          <div style={{ gridTemplateColumns: "1fr 1fr" }}>
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
              <p className="item-hr-desc">{mission.description}</p>
              
              <div className="mission-hr-meta">
                {mission.rank && (
                  <p>📊 Ранг: {rankOptions.find(r => r.value === mission.rank)?.label}</p>
                )}
                {mission.branch && (
                  <p>🌿 Ветка: {branchOptions.find(b => b.value === mission.branch)?.label}</p>
                )}
              </div>
              
              <p className="item-hr-price">Опыт: {mission.exp} ⭐ | Мана: {mission.mana} ⚡</p>
              <p className="item-hr-desc">Компетенции: {mission.skills}</p>
              {mission.artifact && <p className="item-hr-desc">🎁 Артефакт: {mission.artifact}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}