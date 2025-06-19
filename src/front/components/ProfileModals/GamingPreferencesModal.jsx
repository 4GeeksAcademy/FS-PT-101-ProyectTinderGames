import React from "react";
import "./ProfileModals.css";

const options = [
  "Tryhard", "Chill", "Adventurer", "Pro", "Competitive", "Creative",
  "MOBA", "PMA", "Designer", "Conversational", "Strategic", "Emotional",
  "Excited", "Horror", "Online Cooperative", "Co-op Campaign", "Survival",
  "Construction", "God mode"
];

export const GamingPreferencesModal = ({ selected, setSelected, onSave, onCancel }) => {
  const toggleOption = (option) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else if (prev.length < 6) {
        return [...prev, option];
      }
      return prev;
    });
  };

  return (
    <div className="abmodal">
      <div className="abmodal-content">
        <h3>Select up to 5 Gaming Preferences</h3>
        <div className="abcheckbox-grid">
          {options.map((option) => (
            <label key={option} className="abcheckbox-label">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
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

