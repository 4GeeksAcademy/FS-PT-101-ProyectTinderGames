import React, { useState } from 'react';
import './Settings.css';

const SettingsView = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      <div className="settings-section">
        <button className="settings-btn" onClick={() => setShowEmailModal(true)}>Change Email</button>
        <button className="settings-btn" onClick={() => setShowPasswordModal(true)}>Change Password</button>
        <button className="settings-btn" onClick={() => setShow2FAModal(true)}>Enable 2FA</button>
      </div>

      <div className="settings-warning">
        <h3>Delete Account</h3>
        <p>If you delete your account, all your data will be permanently erased after 30 days.</p>
        <div className="warning-buttons">
          <button className="pause-btn" onClick={() => setShowBreakModal(true)}>Take a Break</button>
          <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
        </div>
      </div>

      {/* Modales del diaaabloo */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Change Email</h3>
            <input type="email" placeholder="New Email" />
            <input type="email" placeholder="Confirm New Email" />
            <div className="modal-actions">
              <button onClick={() => setShowEmailModal(false)}>Cancel</button>
              <button className="confirm-btn">Update</button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Change Password</h3>
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
            <div className="modal-actions">
              <button onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="confirm-btn">Update</button>
            </div>
          </div>
        </div>
      )}

      {show2FAModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Enable 2-Factor Authentication</h3>
            <p>Enter your phone or email for verification.</p>
            <input type="text" placeholder="Phone or Email" />
            <div className="modal-actions">
              <button onClick={() => setShow2FAModal(false)}>Cancel</button>
              <button className="confirm-btn">Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* Take a Break modal */}
      {showBreakModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Take a Break</h3>
            <p>Take a break means that you are not completely sure to delete your account. You may re-activate your account by logging in as usual.</p>
            <p>To improve the user experience, please take 1 minute to leave a comment about why you want to take a break.</p>
            <textarea placeholder="Your comment (optional)" rows="4"></textarea>
            <div className="modal-actions">
              <button onClick={() => setShowBreakModal(false)}>Cancel</button>
              <button className="confirm-btn">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box small">
            <h3>Are you sure?</h3>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>No</button>
              <button className="confirm-btn">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
