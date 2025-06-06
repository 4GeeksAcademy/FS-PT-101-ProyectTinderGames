import './ResetPassword.css';

export const ResetPassword = () => {


    return (
        <>
            {/* // New password first step */}
            <div>

                <div className='d-flex justify-content-center'>
                    <div className='card reset-card mt-5'>
                        <div className="card-body">
                            <h2 className="card-title text-center">Recover password </h2>
                          
                            <h6 className="card-subtitle mb-2 reset-card-subtitle text-end me-4 pe-2 mb-3">Enter your PlayerLink account email</h6>
                              <br />
                            <div>
                                <form>
                                    <div className="mx-4">
                                        <div>
                                            <label htmlFor="basic-url" className="form-label mb-0 mt-2">Email</label>
                                        </div>
                                        <input type="email" name="email" placeholder="email address" value="" className='w-100 border-0 rounded-2 btn-reset-card-border' />
                                        <br />
                                        <br />
                                        <br />
                                        <input type="submit" value="Continue" className='w-100 rounded-2 mt-5 text-white bg-black btn-reset-card-border' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
 // New password second step */}

            <div>
                <div className='d-flex justify-content-center'>
                    <div className='card reset-card mt-5'>
                        <div className="card-body">
                            <h2 className="card-title text-center">New password</h2>
                            <br />
                            <form >
                                <div className="mx-4">
                                    <div>
                                        <label htmlFor="basic-url" className="form-label mb-0 mt-2">New password</label>
                                    </div>
                                    <input type="password" name="password" placeholder="Enter new password" value="" className='w-100 border-0 rounded-2 btn-reset-card-border' />
                                    <div>
                                        <label htmlFor="basic-url" className="form-label mt-3 mb-0">Confirm New Password</label>
                                    </div>
                                    <div>
                                        <input type="password" name="password" placeholder=" repeat password" value="" className="w-100 rounded-2 btn-reset-card-border" />
                                        <div className="form-text reset-password-subtitle" id="basic-addon4">*Password must have at least 8 characters.</div>
                                    </div>
                                    <input type="submit" value="Continue" className='w-100 rounded-2 mt-5 text-white bg-black btn-reset-card-border' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}