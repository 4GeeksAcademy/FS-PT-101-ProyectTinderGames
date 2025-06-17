import { useNavigate } from 'react-router-dom';
import './Register.css';
import { useState } from 'react';
import userServices from '../../services/userServices';
import { Terms } from '../Terms/Terms';

export const Register = ({ onSwitch }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    })

    const [errorPassword, setErrorPassword] = useState(""); // estado para error si la contraseña no es la misma
    const [errorEmailRegistered, setErrorEmailRegistered] = useState(""); // estado para el error de email ya registrado
    const [showTerms, setShowTerms] = useState(false); // estado que muestra el modal de T&C
    const [isTermsAccepted, setIsTermsAccepted] = useState(false); // estado para verificar si se acaptó o no los T&C
    const [showPassword, setShowPassword] = useState(false); // estado para ver/ocultar la contraseña

    const handleSubmit = e => {
        e.preventDefault()
        setErrorPassword(""); // limpia error de contraseña
        setErrorEmailRegistered(""); // limpia error del email


        if (formData.password.length < 8) { //para que salte error si la contraseña no tiene 8 caracteres
            setErrorPassword("Password must have al least 8 characters");
            return;
        }

        if (formData.password !== formData.repeatPassword) { //comprueba que la contraseña sea igual
            setErrorPassword("Passwords do not match")
            return
        }

        // Muestra los T&C si aún no han sido aceptados
        if (!isTermsAccepted) {
            setShowTerms(true);
            const modal = new bootstrap.Modal(document.getElementById('TermsAndConditionsModal'));
            modal.show();
            return;
        }

        userServices.register(formData).then(data => {
            localStorage.setItem('token', data.token)
            if (data.success) {
                navigate('/private');
            } else {
                setErrorEmailRegistered("Email already registered")
            }
        })
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleTermsAccepted = () => {
        setIsTermsAccepted(true)
        // Intenta registrar nuevamente luego de aceptar los T&C
        // handleSubmit(new Event('submit', { cancelable: true }));
        navigate('/private')
    };

    return (

        <div className='d-flex justify-content-center'>

            {/* MODAL TÉRMINOS */}
            <Terms onAccept={() => setIsTermsAccepted(true)} />

            <div className='card register-card mt-5'>
                <div className="card-body">
                    <div className="d-flex mb-1">
                        <button type="button" className="btn-close btn-close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <h2 className="card-title text-center">Create an account</h2>
                    <h6 className="card-subtitle mb-2 register-card-subtitle text-end me-4 pe-2 mb-3">Already have an account?
                        <button type="button" onClick={onSwitch} className="btn btn-link register-card-subtitle ps-1">Sign In</button>


                    </h6>

                    <form onSubmit={handleSubmit}>
                        <div className="mx-4">
                            <div>
                                <label htmlFor="basic-url" className="form-label mb-0 mt-2">Email</label>
                            </div>

                            <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} className='w-100 border-0 rounded-2 btn-register-card-border' />

                            {errorEmailRegistered && <h5 className="text-danger mt-2 register-message-errors">{errorEmailRegistered}</h5>}
                            <div>
                                <label htmlFor="basic-url" className="form-label mt-2 mb-0">Password</label>
                            </div>
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
                            <div>
                                <label htmlFor="basic-url" className="form-label mb-0 mt-2">Repeat Password</label>
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

            {/* Solo renderiza Terms si showTerms es true */}
            {showTerms && <Terms onAccept={handleTermsAccepted} />}
        </div>
    )
}