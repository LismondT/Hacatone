import "./artefact.css";
import ArtefactCard from "../../../components/artefactCard/artefactCard";
import {artefactsService} from "../../../api/services/artefactsService";
import { useEffect, useState } from "react";

export default function ArtefactsPage() {
    const [artefacts, setArtefacts] = useState([]);
  
    useEffect(() => {
      artefactsService.getArtefacts()
      .then(artefactData => {
          setArtefacts(artefactData);
        });
    }, []);

  return (
    <div className="inventory-page">
        {/* фон космический */}
        <div className="stars" />

      <div className="inventory-container">
        {/* Заголовок */}
        <div className="inventory-header">
          <h1 className="inventory-title">🎖️ Инвентарь артефактов</h1>
          <p className="inventory-subtitle">Уникальные награды за миссии</p>
        </div>

        {/* Список артефактов */}
        <div className="artifacts-grid">
          {artefacts.map((item) =>(
              <ArtefactCard 
                id = {item.id}
                image = {item.image}
                name = {item.name}
                desc={item.description}
                rare={item.rare.name}
              />
          ))}
        </div>
      </div>
    </div>
  );
}
