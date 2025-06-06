export const ResertPassword = () => {


    return (
        <>
            {/* // New password first step */}
            <div>

                <div className='d-flex justify-content-center'>
                    <div className='card register-card mt-5'>
                        <div className="card-body">
                            <h2 className="card-title text-center">New password </h2>
                            <h6 className="card-subtitle mb-2 register-card-subtitle text-end me-4 pe-2 mb-3">Enter the email address associated <br />
                                with your PlayerLink account. </h6>
                            <div>
                                <form>
                                    <div className="mx-4">
                                        <div>
                                            <label htmlFor="basic-url" className="form-label mb-0 mt-2">Email</label>

                                        </div>
                                        <input type="email" name="email" placeholder="email" value="" className='w-100 border-0 rounded-2 btn-register-card-border' />
                                        <br />
                                        <br />
                                        <input type="submit" value="Continue" className='w-100 rounded-2 mt-5 text-white bg-black btn-register-card-border' />
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
                    <div className='card register-card mt-5'>
                        <div className="card-body">
                            <h2 className="card-title text-center">New password</h2>
                            <br />

                            <form >
                                <div className="mx-4">
                                    <div>
                                        <label htmlFor="basic-url" className="form-label mb-0 mt-2">New password</label>

                                    </div>
                                    <input type="password" name="password" placeholder="password" value="" className='w-100 border-0 rounded-2 btn-register-card-border' />
                                    <div>
                                        <label htmlFor="basic-url" className="form-label mt-3 mb-0">Repeat password</label>
                                    </div>
                                    <div>
                                        <input type="password" name="password" placeholder="password" value="" className="w-100 rounded-2 btn-register-card-border" />
                                        <div className="form-text register-password-subtitle" id="basic-addon4">*Password must have at least 8 characters.</div>
                                    </div>
                                    <input type="submit" value="Continue" className='w-100 rounded-2 mt-5 text-white bg-black btn-register-card-border' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}