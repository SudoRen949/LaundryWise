import { Link } from "react-router-dom";
import { useState } from "react";

import AccessHTTP from "../../access/AccessHTTP"
import Navbar from "../../objects/Navbar"
import Motto from "../../objects/Motto"

function RegisterPage() 
{
	const [passwordType1,setPasswordType1] = useState(false)
	const [passwordType2,setPasswordType2] = useState(false)
	const [error,setError] = useState("")
	const [submitting,setSubmitting] = useState(false)
	const [finished,setFinished] = useState(false)
	const de = (e) => { return document.getElementById(e) }
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setSubmitting(true)
			const response = await AccessHTTP("post","/register",{
				name: de("myName").value,
				email: de("myEmail").value,
				role: de("myRole").value.toLowerCase(),
				password: de("myPassword").value,
				password_confirmation: de("myConfirmPassword").value,
			})
			if (typeof response.data.error !== "undefined") {
				setError(Object.values(response.data.error).join(" "))
				return
			}
			setSubmitting(false)
			setError("")
			setFinished(true)
		} catch (e) {
			console.error(e)
			setSubmitting(false)
			setError((window.navigator.onLine)?"Unable to register account. Reason: Server error.":"Unable to register account. Reason: No internet connection.")
		}
	}
	return (
		<div className="container-fluid">
			<Navbar/>
			<div className="container mt-5">
				<div className="row row-cols-1 row-cols-lg-2">
					<div className="col d-none d-lg-block">
						<Motto/>
					</div>
					<div className="col p-2">
						<div className={"shadow card rounded-5 d-block mb-5 "+((!finished)?"d-block":"d-none")} style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",border:0}} id="regFormContainer">
							<form className="card-body" onSubmit={handleSubmit}>
								<h3 className="card-title text-center text-white mt-3" style={{textShadow:"2px 2px 10px black"}}>Sign up</h3>
								<div className="input-group mt-5 border border-2 rounded-5 border-dark">
									<input id="myName" type="text" className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Name"required></input>
									<span className="input-group-text bg-transparent" style={{border:"none"}}><i className="bi bi-person fs-4"></i></span>
								</div>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myEmail" type="email" className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Email"required></input>
									<span className="input-group-text bg-transparent" style={{border:"none"}}><i className="bi bi-envelope fs-4"></i></span>
								</div>
								<select id="myRole" className="form-select mt-3 border border-2 rounded-5 border-dark fs-5 bg-transparent" required>
									<option value="" selected disabled>-- Select Role --</option>
									<option>Owner</option>
									<option>Customer</option>
								</select>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myPassword" type={(!passwordType1)?"password":"text"} className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Password" required></input>
									<button id="passwordEyeButton1" type="button" className="input-group-text bg-transparent" style={{border:"none"}} onClick={()=>{setPasswordType1(!passwordType1)}}>
										<i className={"bi fs-4 "+((!passwordType1)?"bi-eye":"bi-eye-slash")}></i>
									</button>
								</div>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myConfirmPassword" type={(!passwordType2)?"password":"text"} className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Confirm password" required></input>
									<button id="passwordEyeButton2" type="button" className="input-group-text bg-transparent" style={{border:"none"}} onClick={()=>{setPasswordType2(!passwordType2)}}>
										<i className={"bi fs-4 "+((!passwordType2)?"bi-eye":"bi-eye-slash")}></i>
									</button>
								</div>
								<h5 className={"text-danger text-center mt-2 fs-5 "+((!error.length)?"d-none":"d-block")}>{error}</h5>
								<p className="lead m-0 mt-3 text-white fs-4" style={{textShadow:"2px 2px 1px black"}}>
									<b><i>By creating an account, you agree to our&nbsp;<Link to="/tos" className="nav-link" style={{color:"rgb(50,100,140)",textShadow:"none"}}>terms of service</Link></i></b>
								</p>
								<button id="submitButton" className="btn bg-white w-100 mt-3 rounded-5 fs-5 shadow fw-bold" style={{color:"rgb(50,100,140)"}}>
									Submit{(submitting)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}
								</button>
								<div className="d-flex align-items-center justify-content-center text-white pt-3 mb-5 fs-5" style={{textShadow:"2px 2px 2px black"}}>
									Already have an account?
									&nbsp;<Link to="/login" className="nav-link fw-bold" style={{color:"rgb(50,100,140)",textShadow:"none"}}>Log in</Link>
								</div>
							</form>
						</div>
						<div className={"container rounded-4 pb-5 "+((finished)?"d-block":"d-none")} id="regFormCompleteMessage" style={{backgroundColor:"rgba(255,255,255,.35)",textShadow:"2px 2px 3px black",backdropFilter:"blur(10px)"}}>
							<div className="text-center pt-5 pb-2" style={{color:"rgb(0,255,0)"}}><h1><i className="bi bi-check2-circle"></i></h1></div>
							<h2 className="text-white mb-3 text-center">Congratulations!</h2>
							<p className="text-white text-center ps-3 pe-3 fw-bold">Your account has been successfully created. You can now use your email to log in.</p>
							<Link to="/login" className="btn text-center w-100 mt-3 mb-4 bg-white rounded-5 fs-5 fw-bold" style={{color:"rgb(50,100,140)",textShadow:"none"}}>Log in</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage;