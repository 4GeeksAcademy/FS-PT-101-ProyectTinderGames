import './Terms.css';
import React, { useState } from "react";

export const Terms = () => {

    const [accepted, setAccepted] = useState(false);

    // Función para manejar el checkbox
    const handleCheckbox = (e) => {
        setAccepted(e.target.checked);
    };

    // Función para el botón Guardar que solo funciona si está aceptado
    const handleSave = () => {
        if (accepted && onAccept) {
            onAccept();  // Avisamos que se aceptó, para cerrar modal o habilitar registro
        }
    };

    return (

        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#TermsAndConditionsModal">
                T&C
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="TermsAndConditionsModal" tabindex="-1" aria-labelledby="TermsAndConditionsModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 " id="TermsAndConditionsModalLabel">Terms and Conditions</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>
                                Welcome to PlayerLInk, our platform for connecting gamers. By registering, you agree to the following terms and conditions. Please read them carefully before using our services.
                            </p>

                            <h5>1. Service Description</h5>
                            <p>
                                Our platform helps users discover and connect with other gamers based on shared interests, using details such as Steam ID, Discord username, language, zodiac sign, play style, and approximate location.
                            </p>

                            <h5>2. Privacy and Data Protection</h5>
                            <p>
                                All information provided will be handled according to our Privacy Policy. We will never share your Steam or Discord credentials with third parties without your consent.
                            </p>

                            <h5>3. User Conduct</h5>
                            <p>
                                Using the platform to harass, deceive, or harm other users is strictly prohibited. Any toxic, racist, offensive, or fraudulent behavior may result in your account being suspended or permanently banned.
                            </p>

                            <h5>4. Third-Party Integration</h5>
                            <p>
                                By connecting your Steam and Discord accounts, you authorize the app to access basic profile data to enhance the matchmaking experience.
                            </p>

                            <h5>5. Changes to the Service</h5>
                            <p>
                                We reserve the right to modify or discontinue the service at any time, with or without notice.
                            </p>

                            <h5>6. Account Deletion</h5>
                            <p>
                                You may delete your account at any time from your settings. We also reserve the right to suspend your access if you violate these terms.
                            </p>

                            <h5>7. Limitation of Liability</h5>
                            <p>
                                We are not responsible for any interactions that occur outside of the app, nor for disputes between users. Use the service at your own risk.
                            </p>

                            <p className="mt-4">If you have any questions, feel free to contact us at support@playerlink.com.</p>
                        </div>
                        <div class="modal-footer">
                          {/* Checkbox para aceptar */}
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptTermsCheckbox"
                  checked={accepted}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="acceptTermsCheckbox">
                  I have read and accept the Terms and Conditions
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!accepted}
                data-bs-dismiss={accepted ? "modal" : undefined}
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

        </>
    )
}