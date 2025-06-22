import './ProfileConditions.css';
import React, { useState } from "react";

export const ProfileConditions = ({ onAccept }) => {

  const [accepted, setAccepted] = useState(false);

  // Función para manejar el checkbox
  const handleCheckbox = (e) => {
    setAccepted(e.target.checked);
  };

  // Función para el botón Guardar que solo funciona si está aceptado
  const handleSave = () => {
    if (accepted && onAccept) {
      onAccept();  // Avisa de que se aceptaron los T&C
      const modal = window.bootstrap.Modal.getInstance(document.getElementById("ProfileConditionsModal"));
      modal.hide(); // cierra el modal porque si se aceptó
    }
  };


  return (

    <>
      {/* <!-- Button trigger modal --> */}
   <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ProfileConditionsModal">
        T&C
      </button> 

      {/* <!-- Modal --> */}
      <div className="modal fade" id="ProfileConditionsModal" tabIndex="-1" aria-labelledby="ProfileConditionsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content profile-conditions-border ">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ProfileConditionsModalLabel">Profile requeriments</h1>
              <button type="button" className="btn-close profile-conditions-close-modal me-1" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ms-2 ">
              contenido modal 

            </div>
            <div className="modal-footer">
              {/* Checkbox para aceptar */}
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptprofile-conditionsCheckbox"
                  checked={accepted}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="acceptprofile-conditionsCheckbox">
                  I have complete the info required
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn profile-conditions-decline-btn" data-bs-dismiss="modal">Decline</button>
              <button
                type="button"
                className="btn profile-conditions-accept-btn"
                disabled={!accepted}
                data-bs-dismiss={accepted ? "modal" : undefined}
                onClick={handleSave}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}