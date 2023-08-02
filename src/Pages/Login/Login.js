import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../../Helper/Context/contex';
import { loginUser, logout } from '../../Helper/Context';
// import "./Login.css"

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAuthDispatch()
    const userDetails = useAuthState()
    const { RoleID } = userDetails

    const [passwordField, setpasswordField] = useState("password")
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [Validationerror, setValidationerror] = useState("")
    const [loading, setloading] = useState(false)


    React.useEffect(() => {
        logout(dispatch)
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        if (userName !== '' && password !== '') {
            try {
                let response = await loginUser(dispatch, { userName, password, setloading, handleRollIdWiseDashboard });
                if (!response) return;
                // navigate('/dashboard');

            } catch (error) {
                console.log(error);
            }
            setValidationerror("")
        } else {
            setValidationerror("Error")
        }

    }

    const handleRollIdWiseDashboard = (data) => {
        // console.log(data)
        if (data.RoleID == 1) {
            navigate('/department')
        } else if (data.RoleID == 13) {
            navigate('/ReceivedInvoiceStore');
        } else if (data.RoleID == 12) {
            navigate('/productionDepartment');
        } else if (data.RoleID == 14) {
            navigate('/receiveProduct');
        } else {
            navigate('/dashboard');
        }
    }

    const showPassword = () => {
        if (passwordField === "password") {
            setpasswordField("text")
        } else {
            setpasswordField("password")
        }
    }

    return (
        <>
            <div className="main-section" style={{ overflow: 'hidden' }}>
                <div className="p-2 containers">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center align-self-center py-1">
                            <div className="section pb-5 pt-0 text-center">
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <img src='./assets/img/GME LOGO.jpg' style={{ borderRadius: "50%" }} />
                                                    <h4 className="mb-3 pb-4 mb-lg-3 pb-lg-4 mt-2" style={{ color: "#000" }}>Log In</h4>
                                                    <div className="form-groups">
                                                        {/* <span className="input-group-addon"><i className="fa-solid fa-user input-icons"></i></span> */}
                                                        <input type="text"
                                                            className={`form-style ${Validationerror === "" ? "login_input" : "login_input_error"}`}
                                                            placeholder="Username"
                                                            id="username"
                                                            autoComplete="off"
                                                            value={userName}
                                                            onChange={(e) => setuserName(e.target.value)}
                                                        />
                                                        <span className='form'>
                                                            <i className="fa-solid fa-user input-icons "></i>
                                                        </span>
                                                    </div>
                                                    <div className="form-groups mt-3">
                                                        <input type={passwordField}
                                                            name="logpass"
                                                            className={`form-style ${Validationerror === "" ? "login_input" : "login_input_error"}`}
                                                            placeholder="Password"
                                                            id="logpass"
                                                            autoComplete="new-password"
                                                            value={password}
                                                            onChange={(e) => setpassword(e.target.value)}

                                                        />
                                                        <span className="btn-show-pass">
                                                            <i onClick={showPassword} className={passwordField === "text" ? "fa-solid fa-eye cursor-pointer" : "fa-solid fa-eye-slash cursor-pointer"}></i>
                                                        </span>


                                                        <i className="fa-solid fa-lock input-icons"></i>
                                                    </div>
                                                    <p className="mb-0 mt-4 link" style={{ cursor: "pointer" }}>Forgot your password</p>

                                                    <button className="submit-btn mt-4"
                                                        onClick={handleLogin} disabled={loading}>
                                                        {loading && (
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />
                                                        )}
                                                        {loading && <span>Login ... </span>}
                                                        {!loading && <span>Login</span>}
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
