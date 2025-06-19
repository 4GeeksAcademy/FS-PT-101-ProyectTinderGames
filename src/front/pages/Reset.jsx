import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { emailServices } from "../services/emailServices.js"

export const Reset = () => {
	const { store, dispatch } = useGlobalReducer()
	//utilizamos useLocation para poder manejar valores grandes ya que useParams no permite este tipo de valores 
	const location = useLocation();
	//almacenamos en variable queryParams la busqueda realizada que se encuentra en el url
	const queryParams = new URLSearchParams(location.search);
	//extraemos el token del queryPArams
	const token = queryParams.get('token');
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState("");
	const [user, setUser] = useState()
	const navigate = useNavigate()
	const [success, setSuccess] = useState('')
	const [showPassword, setShowPassword] = useState(false); // estado pra enseñar/esconder contraseña
	const [errorPassword, setErrorPassword] = useState(""); // estado para error si la contraseña no es la misma

	useEffect(() => {
		if (token) {
			//creamos funcion async para que el correcto uso del useEffect 
			const fetchData = async () => {

				//verificamos que el token sea correcto y podemos saber que usuario es el que esta accediendo con la identidad del token
				const resp = await emailServices.checkAuth(token);
				setUser(prev => prev = resp.user)
			}
			fetchData()
		}
		else {
			alert('The reset link has expired. Please request a new password reset')
		}
	}, [token]);


	const handleSubmit = async (e) => {
		e.preventDefault();

		// comprueba que la contraseña sea mas de 8 caracteres
		if (password.length < 8) {
			setErrorPassword("Password must have at least 8 characters");
			return;
		}


		//comprueba que las contraseñas coinciden
		if (password !== repeatPassword) {
			setErrorPassword("Passwords do not match");
			return;
		}
		setErrorPassword("");

		//pasamos a la actions.updatePassword el password y el token
		console.log({ "password": password, "token": token })
		const resp = await emailServices.updatePassword(password, token)
		if (resp.success) {
			setSuccess(true)
			setTimeout(() => {
				navigate('/');
			}, 3000)
		}
		else {
			setSuccess(false)
		}
	}

	return (

		<>
		
			<div>
				<div className='d-flex justify-content-center'>
					<div className='card reset-card mt-5'>
						<div className="card-body">
							<h2 className="card-title text-center">Password Change Request</h2>
							<br />

							<form onSubmit={handleSubmit} >
								<div className="mx-4">

									<h5 htmlFor="basic-url" className="form-label mb-2 mt-2">Enter your new password {user && user?.email} </h5>
									<div>
										{/* New Password */}
										<label htmlFor="basic-url" className="form-label mb-0 mt-2">New password</label>
									</div>
									<div className="d-flex btn-reset-card-border rounded-2">

										<input
											type={showPassword ? "text" : "password"}
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											placeholder="Enter new password"
											className="w-100 border-0"
										/>
										<span
											className="input-group-text border-0 bg-white"

											onClick={() => setShowPassword(prev => !prev)}
										>
											<i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
										</span>
									</div>

									{/* Confirm Password */}
									<div>
										<label htmlFor="basic-url" className="form-label mt-3 mb-0">Confirm New Password</label>
									</div>
									<div className="d-flex btn-reset-card-border rounded-2">

										<input
											type="password"
											onChange={(e) => setRepeatPassword(e.target.value)}
											value={repeatPassword}
											placeholder="Repeat new password"
											className="w-100 border-0"
										/>

									</div>

									{/* Passwrod error message */}
									{errorPassword && <h5 className="text-danger mt-2 reset-message-errors">{errorPassword}</h5>}

									{
										success !== '' ?
											success ?
												<h6 className="text-danger mt-3 reset-message-errors">
													Success! Your password has been updated.
												</h6>
												:
												<h6 className="text-danger mt-3 reset-message-errors">
													There was an error. Try it again!
												</h6>
											:
											''
									}

									<input type="submit" value="Continue" className='w-100 rounded-2 mt-5 text-white bg-black btn-reset-card-border' />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div >
		</>
	);
};