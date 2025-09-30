import React, { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FiUsers, FiSettings, FiTarget, FiAward } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./hrMenu.css";

export default function HrMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Словарь функций HR
  const hrFunctions = [
    { label: "Управление миссиями", icon: <FiTarget />, path: "/missions" },
    { label: "Кандидаты", icon: <FiUsers />, path: "/candidates" },
    { label: "Оценки и компетенции", icon: <FiAward />, path: "/competencies" },
    { label: "Настройки", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <div className="hr-menu-container">
      <button
        className={`hr-menu-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <CgMenu className="menu-icon" />
      </button>

      {open && (
        <div className="hr-menu-dropdown">
          {hrFunctions.map((item, index) => (
            <button
              key={index}
              className="hr-menu-item"
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
            >
              <span className="item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
