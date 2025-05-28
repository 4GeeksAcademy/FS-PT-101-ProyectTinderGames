import { useState } from "react"
import userServices from "../services/userServices"
import { useNavigate } from "react-router-dom"

export const Register_page = () =>{

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })

    const handleSubmit = e => {
        e.preventDefault()
        userServices.register(formData)
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    return <form onSubmit={handleSubmit}>
        <input placeholder="email" type="email" value={formData.email} name="email" onChange={handleChange}/>
        <input placeholder="password" type="password" value={formData.password} name="password" onChange={handleChange}/>
        <input type="submit" />
        <p className="small text-white mt-2">
            Already have an account?{' '}
            <span
                className="text-blue-400 hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
            >
                Login
            </span>
        </p>
    </form>
}