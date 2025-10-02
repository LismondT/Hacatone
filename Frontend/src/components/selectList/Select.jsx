import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

const Select = ({
  label = "Выберите опцию",
  value = "",
  onChange,
  options = [],
  placeholder = "Выберите...",
  error = null,
  required = false,
  disabled = false,
  icon = null,
  searchable = false,
  width = "auto" // Новая пропса для управления шириной
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Рассчитываем ширину выпадающего списка
  useEffect(() => {
    if (isOpen && dropdownRef.current && selectRef.current) {
      const triggerWidth = selectRef.current.offsetWidth;
      const dropdown = dropdownRef.current;
      
      // Устанавливаем минимальную ширину равной ширине триггера
      dropdown.style.minWidth = `${triggerWidth}px`;
      
      // Находим самую широкую опцию
      const options = dropdown.querySelectorAll('.select-option');
      let maxWidth = triggerWidth;
      
      options.forEach(option => {
        const optionWidth = option.scrollWidth;
        if (optionWidth > maxWidth) {
          maxWidth = optionWidth;
        }
      });
      
      // Устанавливаем ширину выпадающего списка
      dropdown.style.width = `${maxWidth + 32}px`; // +32px для padding и бордеров
    }
  }, [isOpen, options]);

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };

  return (
    <div 
      className={`select-container ${isOpen ? 'open' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
      ref={selectRef}
      style={{ width }}
    >
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className="select-wrapper">
        <div 
          className="select-trigger"
          onClick={handleToggle}
        >
          {icon && <span className="select-icon">{icon}</span>}
          
          <span className="select-value">
            {selectedOption ? (
              <div className="selected-option">
                {selectedOption.icon && <span className="option-icon">{selectedOption.icon}</span>}
                <span className="option-label">{selectedOption.label}</span>
              </div>
            ) : (
              <span className="select-placeholder">{placeholder}</span>
            )}
          </span>
          
          <span className={`select-arrow ${isOpen ? 'open' : ''}`}>
            ▼
          </span>
        </div>

        {isOpen && (
          <div 
            className="select-dropdown"
            ref={dropdownRef}
          >
            
            <div className="select-options">
              {filteredOptions.length === 0 ? (
                <div className="no-options">Ничего не найдено</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`select-option ${value === option.value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                    onClick={() => !option.disabled && handleSelect(option)}
                    title={option.label} // Добавляем title для длинных текстов
                  >
                    {option.icon && <span className="option-icon">{option.icon}</span>}
                    <span className="option-label">{option.label}</span>
                    {option.description && (
                      <span className="option-description">{option.description}</span>
                    )}
                    {value === option.value && (
                      <span className="check-mark">✓</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Select;