import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useState } from 'react';
import userServices from '../../services/userServices';

export const SignIn = ({ onSwitch }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errorLogin, setErrorLogin] = useState(""); //estado para el error de email/contraseña no válido
    const [showPassword, setShowPassword] = useState(false); // estado pra enseñar/esconder contraseña

    const handleSubmit = async e => {
        e.preventDefault()
        setErrorLogin(""); //quita errores previos

        try {
            const data = await userServices.login(formData)
            localStorage.setItem('token', data.token)
            if (data.success) {
                navigate('/private/profile')
            } else {
                setErrorLogin("Incorrect email or password")
            }
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (

        <div className='d-flex justify-content-center'>
            <div className='card sign-in-card mt-5'>
                <div className="card-body">
                    <div className="d-flex">
                        <button type="button" className="btn-close btn-close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <h2 className="card-title text-center">Sign In</h2>
                    <h6 className="card-subtitle mb-2 sign-in-card-subtitle text-end me-4 pe-2 mb-3">Need an account
                        <button type="button" onClick={onSwitch} className="btn btn-link sign-in-card-subtitle ps-1">Register</button>
                    </h6>

                    <form onSubmit={handleSubmit}>
                        <div className="mx-4">
                            <div>
                                <label htmlFor="basic-url" className="form-label mb-0 mt-2">Email</label>

                            </div>
                            <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} className='w-100 border-0 rounded-2 border-1 btn-sign-in-card-border' />
                            <div>
                                <label htmlFor="basic-url" className="form-label mt-3 mb-0">Password</label>
                            </div>
                            <div>
                                <div className="d-flex btn-register-card-border rounded-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-100 border-0 "
                                    />
                                    <span
                                        className="input-group-text border-0 bg-white"
                                        
                                        onClick={() => setShowPassword(prev => !prev)}
                                    >
                                        <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </span>
                                </div>

                                <div className="form-text sign-in-password-subtitle" id="basic-addon4">Forgot your password? It’s ok <Link to="/">click here</Link></div>
                                {errorLogin && <h5 className="text-danger mt-2 sign-in-message-errors">{errorLogin}</h5>}
                            </div>
                            <input type="submit" value="Continue" className='w-100 rounded-2 mt-5 text-white bg-black btn-sign-in-card-border' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}