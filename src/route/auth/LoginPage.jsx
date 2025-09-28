import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import AccessHTTP from "../../access/AccessHTTP"
import Navbar from "../../objects/Navbar"
import Motto from "../../objects/Motto"

function LoginPage()
{
	const navigate = useNavigate()
	const [remember,setRemember] = useState(false)
	const [passwordType,setPasswordType] = useState("password")
	const [error,setError] = useState("")
	const [submitting,setSubmitting] = useState(false)
	const de = (e) => { return document.getElementById(e) }
	const rememberMe = () => {
		const r = document.getElementById("myCheckbox")
		setRemember(r.checked)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		let itsRole = document.getElementById("myRole").value.toLowerCase()
		try {
            const date = new Date()
			setSubmitting(true)
			const response = await AccessHTTP("post","/login",{
				email: document.getElementById("myEmail").value,
				password: document.getElementById("myPassword").value,
				role: itsRole,
                login_dt: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
			})
			if (typeof response.data.id !== "undefined") {
				setSubmitting(false)
				window.localStorage.setItem("id",response.data.id)
				window.localStorage.setItem("user",response.data.name)
				window.localStorage.setItem("email",de("myEmail").value)
				window.localStorage.setItem("contact",response.data.contact)
				window.localStorage.setItem("address",response.data.address)
				if (remember) {
					window.localStorage.setItem("remembered_email",de("myEmail").value)
					window.localStorage.setItem("remembered_role",de("myRole").value)
					window.localStorage.setItem("remembered_password",btoa(de("myPassword").value))
					window.localStorage.setItem("remembered?",true)
				} else {
					window.localStorage.removeItem("remembered_email")
					window.localStorage.removeItem("remembered_role")
					window.localStorage.removeItem("remembered_password")
					window.localStorage.removeItem("remembered?")
				}
				switch (itsRole) {
					case "customer":
							navigate("/dashboard/customer/home")
						break
					case "owner":
							navigate("/dashboard/owner/home")
						break
					default: break
				}
			} else setError(response.data.message)
		} catch (e) {
			console.error(e)
			setSubmitting(false)
			setError((window.navigator.onLine)?"Unable to log you in. Reason: Server error":"Unable to log you in. Reason: No internet connection.")
		}
	}
	useEffect(()=>{
		if (window.localStorage.getItem("remembered_email")) {
			if (window.localStorage.getItem("remembered?") === "true") de("myCheckbox").click()
			de("myEmail").value = window.localStorage.getItem("remembered_email")
			de("myRole").value = window.localStorage.getItem("remembered_role")
			de("myPassword").value = atob(window.localStorage.getItem("remembered_password"))
			de("myCheckbox").checked = window.localStorage.getItem("remembered?")
		}
	},[])
 	return (
		<div className="container-fluid">
			<Navbar/>
			<div className="container mt-5">
				<div className="row row-cols-1 row-cols-lg-2">
					<div className="col d-none d-lg-block">
						<Motto/>
					</div>
					<div className="col p-2">
						<div className="shadow card rounded-5 mb-5" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",border:0}}>
							<form className="card-body" onSubmit={handleSubmit}>
								<h3 className="card-title text-center text-white mt-3" style={{textShadow:"2px 2px 2px black"}}>Log in</h3>
								<div className="input-group mt-5 border border-2 rounded-5 border-dark">
									<input id="myEmail" type="email" className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Email"required></input>
									<span className="input-group-text bg-transparent" style={{border:"none"}}><i className="bi bi-envelope fs-4"></i></span>
								</div>
								<select id="myRole" className="form-select mt-3 border border-2 rounded-5 border-dark fs-5 bg-transparent" required>
									<option value="" selected disabled>-- SELECT ROLE --</option>
									<option>Owner</option>
									<option>Customer</option>
								</select>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myPassword" type={passwordType} className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Password" required></input>
									<button id="passwordEyeButton" type="button" className="input-group-text bg-transparent" style={{border:"none"}} 
									onClick={() => {setPasswordType(de("myPassword").type === "password" ? "text" : "password")}}>
										<i className={(passwordType === "password") ? "bi bi-eye fs-4" : "bi bi-eye-slash fs-4"}></i>
									</button>
								</div>
								<h5 className={"text-danger text-center mt-2 fs-5 "+((!error.length)?"d-none":"d-block")}>{error}</h5>
								<div className="d-flex align-items-center justify-content-between mt-3 ms-1">
									<div className="d-flex align-items-center">
										<input id="myCheckbox" type="checkbox" className="form-check-input border-dark me-2" style={{scale:1.5}} onClick={rememberMe}></input>
										<label htmlFor="myCheckbox" className="form-label text-white fs-5 m-0" style={{textShadow:"2px 2px 2px black"}}>Remember me</label>
									</div>
									<Link className="m-0 text-danger fs-5 nav-link" to="/recover">Forgot password?</Link>
								</div>
								<button type="submit" id="submitButton" className="btn bg-white w-100 mt-3 rounded-5 fs-5 shadow fw-bold" style={{color:"rgb(50,100,140)"}}>
									Submit{(submitting)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}
								</button>
								<div className="d-flex align-items-center justify-content-center text-white pt-3 mb-5 fs-5" style={{textShadow:"2px 2px 2px black"}}>
									Don't have an account?&nbsp;<Link to="/register" className="nav-link fw-bold" style={{color:"rgb(50,100,140)",textShadow:"none"}}>Sign up</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
 	);
}

export default LoginPage;