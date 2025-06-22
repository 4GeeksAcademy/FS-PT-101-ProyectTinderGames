import './ProfileConditions.css';
import React, { useState } from "react";

export const ProfileConditions = ({ onAccept }) => {
    const [accepted, setAccepted] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorAge, setErrorAge] = useState('');


    const handleCheckbox = (e) => {
        setAccepted(e.target.checked);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value.trim()) setErrorName('');  // limpio error si ya hay texto
    }

    const handleAgeChange = (e) => {
        setAge(e.target.value);
        if (Number(e.target.value) >= 18) setErrorAge('');  // limpio error si edad válida
    
    }

    const handleSave = () => {
        if (!name.trim()) {
            setErrorName("Please enter your name");
            return;
        }
        if (Number(age) < 18) {
            setErrorAge("You must be +18");
            return;
        }
        setErrorName(''); // limpio error si pasa validación
        setErrorAge(''); // limpio error si pasa validación

        if (accepted && onAccept) {
            onAccept({ name, age });
            const modal = window.bootstrap.Modal.getInstance(document.getElementById("ProfileConditionsModal"));
            modal.hide();

            //Limpiar campos después de cerrar modal
            setName('');
            setAge('');
            setAccepted(false);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ProfileConditionsModal">
                T&C
            </button>

            <div className="modal fade" id="ProfileConditionsModal" tabIndex="-1" aria-labelledby="ProfileConditionsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content profile-conditions-border">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ProfileConditionsModalLabel">Profile requirements</h1>
                            <button type="button" className="btn-close profile-conditions-close-modal me-1" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ms-2">
                            <p>To access PlayerLink, please enter your name and age. Then, confirm that the information is complete to continue.</p>
                            <form>
                                <h6>Name:</h6>
                                <input className='border-2 rounded profile-conditions-input' type="text" value={name} placeholder="Name" onChange={handleNameChange} />
                                {errorName && <h6 className='ms-1 mt-1 text-danger'>{errorName}</h6>}

                                <h6 className='mt-3'>Age:</h6>
                                <input className='border-2 rounded profile-conditions-input' type="number" value={age} placeholder="Age" onChange={handleAgeChange} />
                                {errorAge && <h6 className='ms-1 mt-1 text-danger'>{errorAge}</h6>}

                            </form>

                        </div>
                        <div className="modal-footer">
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="acceptprofile-conditionsCheckbox"
                                    checked={accepted}
                                    onChange={handleCheckbox}
                                />
                                <label className="form-check-label " htmlFor="acceptprofile-conditionsCheckbox">
                                    I have completed the required info
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn profile-conditions-decline-btn" data-bs-dismiss="modal">Decline</button>
                            <button
                                type="button"
                                className="btn profile-conditions-accept-btn"
                                disabled={!accepted}
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
};
