import React from "react";
import "./ProfileModals.css";

const languages = [
  "English", "Spanish", "French", "German", "Portuguese",
  "Italian", "Japanese", "Korean", "Chinese", "Mandalorian",
  "Thalassian", "Klingon", "Sindarin", "Renegade", "Orcish"
];

export const LanguageModal = ({ selected, setSelected, onSave, onCancel }) => {
  const toggleLanguage = (language) => {
    setSelected((prev) => {
      if (prev.includes(language)) {
        return prev.filter((item) => item !== language);
      } else if (prev.length < 5) {
        return [...prev, language];
      }
      return prev;
    });
  };

  return (
    <div className="abmodal">
      <div className="abmodal-content">
        <h3>Select up to 5 Languages</h3>
        <div className="abcheckbox-grid">
          {languages.map((language) => (
            <label key={language} className="abcheckbox-label">
              <input
                type="checkbox"
                checked={selected.includes(language)}
                onChange={() => toggleLanguage(language)}
              />
              {language}
            </label>
          ))}
        </div>
        <div className="abmodal-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};


