import { useNavigate } from 'react-router-dom';
import './Register.css';
import { useState } from 'react';
import userServices from '../../services/userServices';

export const Register = ({ onSwitch }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    })

    const [errorPassword, setErrorPassword] = useState(""); // error si la contraseña no es la misma
    const [errorEmail, setErrorEmail] = useState(""); // error si el email ya está registrado


    const handleSubmit = e => {
        e.preventDefault()

        if (formData.password !== formData.repeatPassword) { //comprueba que la contraseña sea igual
            setErrorPassword("Passwords do not match")
            return
        }

        userServices.register(formData).then(data => {
            localStorage.setItem('token', data.token)
            if (data.success) {
                navigate('/private')
            }
        })
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (

        <div className='d-flex justify-content-center'>
            <div className='card register-card mt-5'>
                <div className="card-body">
                    <h2 className="card-title text-center">Create an account</h2>
                    <h6 className="card-subtitle mb-2 register-card-subtitle text-end me-4 pe-2 mb-3">If you already have an account
                        <button type="button" onClick={onSwitch} className="btn btn-link register-card-subtitle ps-1">Sign In</button>


                    </h6>

                    <form onSubmit={handleSubmit}>
                        <div className="mx-4">
                            <div>
                                <label htmlFor="basic-url" className="form-label mb-0 mt-2">Email</label>

                            </div>
                            <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} className='w-100 border-0 rounded-2 btn-register-card-border' />
                           
                            <div>
                                <label htmlFor="basic-url" className="form-label mt-3 mb-0">Password</label>
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} className="w-100 rounded-2 btn-register-card-border" />
                                <div className="form-text register-password-subtitle mb-2" id="basic-addon4">*Password must have at least 8 characters.</div>
                            </div>
                            <div>
                                <label htmlFor="basic-url" className="form-label mb-0">Repeat Password</label>
                            </div>
                            <div>
                                <input type="password" name="repeatPassword" placeholder="password" value={formData.repeatPassword} onChange={handleChange} className="w-100 rounded-2 btn-register-card-border" />

                            </div>
                            {errorPassword && <h5 className="text-danger mt-2 register-message-errors">{errorPassword}</h5>}
                            <input type="submit" value="Continue" className='w-100 rounded-2 mt-4 text-white bg-black btn-register-card-border' />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}