import React, { useEffect, useState } from 'react';
import './Settings.css';
import userServices from "../../services/userServices"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx"
import { useNavigate } from 'react-router-dom';


const SettingsView = () => {
  const navigate = useNavigate()
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [email, setEmail] = useState({
    email:'',
    confirmedEmail: ''
  })
  const [password, setPassword] = useState({
    password:'',
    confirmedPassword:''
  })
  const {store, dispatch} = useGlobalReducer();

  useEffect(()=>{
    if (!store.user){
      navigate('/')
    }
  })

  const submitEmailChange = () => {
    console.log(email)
    if (email.email !== email.confirmedEmail){
      return alert('email must be the same')
    }
    userServices.changeUserEmail(store.user?.id, email.email)
    setShowEmailModal(false)
    setEmail(()=>({
      email:"",
      confirmedEmail:""
    }))
    return alert('email changed')
  }

  const submitPasswordChange = () => {
    console.log(password)
    if (password.password !== password.confirmedPassword){
      return alert('password must be the same')
    }
    userServices.changeUserPassword(store.user?.id, password.password)
    setShowPasswordModal(false)
    setPassword(()=>({
      password:"",
      confirmedPassword:""
    }))
    return alert('password changed')
  }

  const handleChange = e => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        })
        setPassword({
          ...password,
          [e.target.name]:e.target.value
        })
    }

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
            <input type="email" placeholder="New Email" name="email" value={email.email} onChange={handleChange}/>
            <input type="email" placeholder="Confirm New Email" name="confirmedEmail"value={email.confirmedEmail} onChange={handleChange}/>
            <div className="modal-actions">
              <button onClick={() => setShowEmailModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={()=> submitEmailChange()}>Update</button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Change Password</h3>
            <input type="password" placeholder="New Password" name="password" value={password.password} onChange={handleChange}/>
            <input type="password" placeholder="Confirm New Password" name="confirmedPassword" value={password.confirmedPassword} onChange={handleChange}/>
            <div className="modal-actions">
              <button onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={()=>submitPasswordChange()}>Update</button>
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
