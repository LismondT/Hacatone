import React, { useState } from 'react';
import './TextInput.css';

const TextInput = ({
  label = "Текст",
  placeholder = "Введите текст...",
  value = "",
  onChange,
  type = "text",
  error = null,
  required = false,
  disabled = false,
  icon = null,
  maxLength = null,
  showCharCount = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const charCount = value.length;

  return (
    <div className={`text-input-container ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
      {label && (
        <label className="text-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className={`text-input-wrapper ${isFocused ? 'focused' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        
        <input
          type={type}
          className="text-input"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
        />
        
        {showCharCount && maxLength && (
          <div className="char-count">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextInput;