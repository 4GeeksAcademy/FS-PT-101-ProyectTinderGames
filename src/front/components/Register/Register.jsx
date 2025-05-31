import { Link, } from 'react-router-dom';
import './Register.css';

export const Register = () => {



    return (



        <div className='d-flex justify-content-center'>



            <div className="card register-card mt-5 ms-2 ">
                <div className="card-body">
                    <h2 className="card-title text-center">Create an account</h2>
                    <h6 className="card-subtitle mb-2 register-card-subtitle text-end me-4 pe-2 mb-3">If you already have an account <Link to="/">Sign-in</Link></h6>

                    <form>
                        <div className="mx-4">
                            <div>
                                <label for="basic-url" className="form-label mb-0 mt-2">Email</label>

                            </div>
                            <input type="email" name="" id="" className='w-100 border-0 rounded-2 border-1 register-card-border' />
                            <div>
                                <label for="basic-url" className="form-label mt-3 mb-0">Password</label>
                            </div>
                            <div>
                                <input type="password" name="" id="" className="w-100 rounded-2 border-1 register-card-border" />
                                <div className="form-text register-password-subtitle" id="basic-addon4">*Password must have at least 8 characters.</div>
                            </div>
                            <input type="submit" value="Continue" className='w-100 rounded-2 border-1 mt-5 text-white bg-black register-card-border' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}